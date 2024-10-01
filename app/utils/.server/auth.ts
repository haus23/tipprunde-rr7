import { redirect } from 'react-router';

import { db } from './db';

/**
 * Validates email address against the user database
 *
 * @param email Email to validate
 * @returns False for unknown email address - otherwise true
 */
async function isKnownEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  return user !== null;
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

  const valid = await isKnownEmail(email);
  if (valid) {
    throw redirect('/onboarding');
  }

  return {
    errors: { email: 'Unbekannte Email-Adresse. Wende dich an Micha.' },
  };
}

/**
 * Ensures logged in user is admin
 *
 * @param request Request
 */
export async function requireAdmin(request: Request) {
  throw redirect('/login');
}
