import { generateTOTP, verifyTOTP } from '@epic-web/totp';
import { redirect } from 'react-router';

import { db } from './db';
import { sendMail } from './email';
import { commitAuthSession, getAuthSession } from './sessions';

/**
 * Gets user by email address
 *
 * @param email Known email address
 * @returns Null if email address is unknown
 */
async function getUserByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}

/**
 * Notifies admin about a security breach
 *
 * @param props Subject and email body
 */
async function sendErrorMail(props: { subject: string; text: string }) {
  await sendMail({
    from: 'Tipprunde Security <security@runde.tips>',
    to: 'Micha <micha@haus23.net>',
    category: 'security',
    ...props,
  });
}

/**
 * Sends email with login code to user
 *
 * @param props Username, email-address and the login code
 */
async function sendCodeMail(props: {
  userName: string;
  code: string;
  email: string;
}) {
  const { userName, code, email } = props;
  await sendMail(
    {
      from: 'Tipprunde <hallo@runde.tips>',
      to: `${userName} <${email}>`,
      subject: 'Tipprunde Login Code',
      category: 'totp',
      text: `
      Hallo ${userName}!
      Dein Login-Code ist: ${code}`,
    },
    'Postmark',
  );
}

/**
 * Generates and stores TOTP login code.
 *
 * @param email User email the code will be associated with
 * @returns Code
 */
async function createLoginCode(email: string) {
  const { otp, secret, period, charSet, digits, algorithm } =
    await generateTOTP({
      period: 300,
    });
  const expiresAt = new Date(Date.now() + period * 1000);
  await db.verification.upsert({
    where: { email },
    create: { email, secret, period, algorithm, digits, charSet, expiresAt },
    update: { email, secret, period, algorithm, digits, charSet, expiresAt },
  });
  return otp;
}

/**
 * Verfifies given code for email address
 *
 * @param email Email address code was generated for
 * @param code Code candidate
 * @returns Success or failure with error messages
 */
async function verifyLoginCode(
  email: string,
  code: string,
): Promise<{ success: true } | { success: false; error: string }> {
  const verificationData = await db.verification.findFirst({
    where: { email },
  });
  if (!verificationData) {
    return {
      success: false,
      error: 'Keine Code für diese Email-Adresse vorhanden!',
    };
  }

  if (new Date() > verificationData.expiresAt) {
    return {
      success: false,
      error: 'Code ist abgelaufen. Codes sind nur fünf Minuten gültig.',
    };
  }

  const isValid = await verifyTOTP({ otp: code, ...verificationData });
  if (isValid === null) {
    return { success: false, error: 'Falscher Code.' };
  }
  return { success: true };
}

/**
 * Prepares users onboarding. Expects email in request form data.
 *
 * If no valid email address is in the form data, it returns an error.
 * Otherwise it redirects to the onboarding page.
 *
 * @param request Request object
 */
export async function signup(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get('email'));

  const user = await getUserByEmail(email);
  if (!user) {
    await sendErrorMail({
      subject: 'Signup error with invalid email',
      text: `Invalid email address: ${email}`,
    });
    return {
      errors: { email: 'Unbekannte Email-Adresse. Wende dich an Micha.' },
    };
  }

  const code = await createLoginCode(email);
  await sendCodeMail({ userName: user.name, code, email });

  const session = await getAuthSession(request);
  session.flash('email', email);

  throw redirect('/onboarding', {
    headers: {
      'Set-Cookie': await commitAuthSession(session),
    },
  });
}

/**
 * Ensures that there is an ongoing onboarding session.
 *
 * Prevents the route from being called directly
 *
 * @param request Request object
 */
export async function ensureOnboardingSession(request: Request) {
  const session = await getAuthSession(request);
  const email = session.get('email');

  if (!email) {
    throw redirect('/login');
  }

  const user = await getUserByEmail(email);
  if (!user) throw Error('Netter Versuch!');

  return null;
}

/**
 * Performs user login
 *
 * Expects valid email in session and totp code in request.
 * Returns error for invalid data. Redirects to home otherwise.
 *
 * @param request Request object
 */
export async function login(request: Request) {
  const session = await getAuthSession(request);
  const email = session.get('email');

  if (!email) {
    throw redirect('/login');
  }

  const user = await getUserByEmail(email);
  if (!user) throw Error('Netter Versuch!');

  const formData = await request.formData();
  const code = String(formData.get('code'));

  // Verify code
  const verifyResult = await verifyLoginCode(email, code);
  if (!verifyResult.success) {
    return { errors: { code: verifyResult.error } };
  }

  throw redirect('/', {
    headers: {
      'Set-Cookie': await commitAuthSession(session),
    },
  });
}

/**
 * Ensures logged in user is admin
 *
 * @param request Request
 */
export async function requireAdmin(request: Request) {
  throw redirect('/login');
}
