import { generateTOTP, verifyTOTP } from '@epic-web/totp';
import { db } from './db';

const MAX_ATTEMPTS = Number(process.env.MAX_ATTEMPTS);

/**
 * Generates and stores TOTP login code.
 *
 * @param email User email the code will be associated with
 * @returns Code
 */
export async function createLoginCode(email: string) {
  const { otp, secret, period, charSet, digits, algorithm } =
    await generateTOTP({
      period: 300,
    });
  const expiresAt = new Date(Date.now() + period * 1000);
  await db.verification.upsert({
    where: { email },
    create: {
      email,
      secret,
      period,
      algorithm,
      digits,
      charSet,
      expiresAt,
      attempts: 0,
    },
    update: {
      email,
      secret,
      period,
      algorithm,
      digits,
      charSet,
      expiresAt,
      attempts: 0,
    },
  });
  return otp;
} /**
 * Verfifies given code for email address
 *
 * @param email Email address code was generated for
 * @param code Code candidate
 * @returns Success or failure with error messages
 */
export async function verifyLoginCode(
  email: string,
  code: string,
): Promise<
  { success: true } | { success: false; retry: boolean; error: string }
> {
  const verificationData = await db.verification.findFirst({
    where: { email },
  });
  if (!verificationData) {
    return {
      success: false,
      retry: false,
      error: 'Keine Code für diese Email-Adresse vorhanden!',
    };
  }

  if (new Date() > verificationData.expiresAt) {
    return {
      success: false,
      retry: false,
      error: 'Code ist abgelaufen. Codes sind nur fünf Minuten gültig.',
    };
  }

  const isValid = await verifyTOTP({ otp: code, ...verificationData });
  if (isValid === null) {
    const attempts = verificationData.attempts + 1;
    const remainingAttempts = MAX_ATTEMPTS - attempts;
    if (attempts < MAX_ATTEMPTS) {
      await db.verification.update({
        where: { id: verificationData.id },
        data: { attempts },
      });
      return {
        success: false,
        retry: true,
        error: `Falscher Code. Noch ${remainingAttempts === 1 ? 'ein letzter Versuch' : `${remainingAttempts} Versuche`} übrig.`,
      };
    }
    return {
      success: false,
      retry: false,
      error: 'Zu viele falsche Versuche.',
    };
  }
  return { success: true };
}
