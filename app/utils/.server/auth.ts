import { generateTOTP } from '@epic-web/totp';
import { redirect } from 'react-router';

import { db } from './db';
import { sendMail } from './email';

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

  throw redirect('/onboarding');
}

/**
 * Ensures logged in user is admin
 *
 * @param request Request
 */
export async function requireAdmin(request: Request) {
  throw redirect('/login');
}
