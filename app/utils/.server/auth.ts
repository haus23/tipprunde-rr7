import { redirect } from 'react-router';

import type { User } from '@prisma/client';

import { db } from './db';
import { sendCodeMail, sendErrorMail } from './emails';
import { env } from './env';
import {
  authCookie,
  commitAuthSession,
  destroyAuthSession,
  getAuthSession,
} from './sessions';
import { createLoginCode, verifyLoginCode } from './totp';

const SESSION_EXPIRATION_TIME = env.SESSION_EXPIRATION_TIME;

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
  const rememberMe = String(formData.get('rememberMe')) === 'on';

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

  // Generate Magic Link
  const url = new URL('/magic-link', new URL(request.url).origin);
  url.searchParams.set('code', code);
  const magicLink = url.toString();

  await sendCodeMail({ userName: user.name, code, email, magicLink });

  const session = await getAuthSession(request);
  session.set('email', email);
  session.set('rememberMe', rememberMe);

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
 * @returns Previous onboarding errors
 */
export async function ensureOnboardingSession(request: Request) {
  const session = await getAuthSession(request);
  const email = session.get('email');

  if (!email) {
    throw redirect('/login');
  }

  const user = await getUserByEmail(email);
  if (!user) throw Error('Netter Versuch!');

  return { error: session.get('error') };
}

/**
 * Performs user login
 *
 * Expects valid email in session and totp code in request.
 * Returns error for invalid data. Redirects to home otherwise.
 *
 * @param request Request object
 * @returns Login errors
 */
export async function login(
  request: Request,
  options?: { withMagicLink: boolean },
) {
  const withMagicLink = options?.withMagicLink || false;

  const session = await getAuthSession(request);
  const email = session.get('email');
  const rememberMe = session.get('rememberMe') ?? false;

  if (!email) {
    throw redirect('/login');
  }

  const user = await getUserByEmail(email);
  if (!user) throw Error('Netter Versuch!');

  let code = '';

  if (withMagicLink) {
    const url = new URL(request.url);
    code = decodeURIComponent(url.searchParams.get('code') ?? '');
  } else {
    const formData = await request.formData();
    code = String(formData.get('code'));
  }

  // Verify code
  const verifyResult = await verifyLoginCode(email, code);
  if (!verifyResult.success) {
    if (!verifyResult.retry) {
      throw redirect('/login');
    }
    if (withMagicLink) {
      session.flash('error', verifyResult.error);
      throw redirect('/onboarding', {
        headers: { 'Set-Cookie': await commitAuthSession(session) },
      });
    }
    return { error: verifyResult.error };
  }

  // Create app session
  // Expiration date is always 30 days. With rememberMe set, we will prolong the
  // cookie maxAge date and the expirationDate in the DB
  const expirationDate = new Date(Date.now() + SESSION_EXPIRATION_TIME * 1000);
  const sessionData = await db.session.create({
    select: { id: true },
    data: {
      userId: user.id,
      expires: !rememberMe,
      expirationDate,
    },
  });

  session.set('sessionId', sessionData.id);
  session.unset('rememberMe');
  session.unset('email');

  throw redirect('/', {
    headers: {
      'Set-Cookie': await commitAuthSession(session, {
        ...(rememberMe && { maxAge: SESSION_EXPIRATION_TIME }),
      }),
    },
  });
}

/**
 * Performs user logout
 *
 * @param request Request object
 * @param options FallbackUrl in case we can't get a referer
 * @returns Cookie headers to destroy the auth session (in case of no redirect)
 */
export async function logout(
  request: Request,
  options?: { fallbackUrl: string },
) {
  const session = await getAuthSession(request);
  const sessionId = session.get('sessionId');

  if (sessionId) {
    await db.session.deleteMany({ where: { id: sessionId } });
  }

  const headers = new Headers({
    'Set-Cookie': await destroyAuthSession(session),
  });

  if (options?.fallbackUrl) {
    const redirectUrl = request.headers.get('Referer') || options.fallbackUrl;
    throw redirect(redirectUrl, {
      headers,
    });
  }

  return headers;
}

// Server auth helpers

/**
 * Prolongs an eventually ongoing rememberMe-Session
 *
 * @param request Request object
 * @param responseHeaders Response headers
 */
export async function prolongRememberMeSession(
  request: Request,
  responseHeaders: Headers,
) {
  // Is there an ongoing auth cookie set in the headers
  const cookieBeingSet = await authCookie.parse(
    responseHeaders.get('Set-Cookie'),
  );
  if (cookieBeingSet !== null) return;

  const authSession = await getAuthSession(request);
  const sessionId = authSession.get('sessionId');
  if (!sessionId) return;

  const appSession = await db.session.findUnique({
    where: { id: sessionId, expirationDate: { gt: new Date() } },
  });
  if (!appSession || appSession.expires) return;

  await db.session.update({
    where: { id: appSession.id },
    data: {
      ...appSession,
      updatedAt: new Date(),
      expirationDate: new Date(Date.now() + SESSION_EXPIRATION_TIME * 1000),
    },
  });

  responseHeaders.append(
    'Set-Cookie',
    await commitAuthSession(authSession, { maxAge: SESSION_EXPIRATION_TIME }),
  );
}

/**
 * Validates app session and returns logged-in user or null.
 * In case of invalid sessions all session data will be deleted.
 *
 * @param request Request Object
 * @returns User or null
 */
export async function getUser(request: Request) {
  const authSession = await getAuthSession(request);
  const sessionId = authSession.get('sessionId');

  if (!sessionId) {
    return {
      user: null,
      headers: null,
    };
  }

  const session = await db.session.findFirst({
    where: { id: sessionId },
  });

  let user: User | null = null;

  // Try to load user if session is still valid. This covers the rare case,
  // that the user account is already deleted, but there is still a browser session
  if (session && new Date() < session.expirationDate) {
    user = await db.user.findFirst({ where: { id: session.userId } });
  }

  if (!user) {
    return {
      user: null,
      headers: await logout(request),
    };
  }

  return {
    user,
    headers: null,
  };
}

/**
 * Loads user identified by session from db
 *
 * @param request Request object
 * @returns User or null
 */
async function getOptionalUser(request: Request) {
  const authSession = await getAuthSession(request);
  const sessionId = authSession.get('sessionId');

  if (!sessionId) return null;

  const session = await db.session.findUnique({
    select: { user: true },
    where: { id: sessionId, expirationDate: { gt: new Date() } },
  });

  return session?.user || null;
}

/**
 * Ensures no logged-in user
 *
 * @param request Request object
 */
export async function requireAnonymous(request: Request) {
  const user = await getOptionalUser(request);
  if (user) throw redirect('/');
}

/**
 * Ensures logged-in user is admin
 *
 * @param request Request object
 */
export async function requireAdmin(request: Request) {
  const user = await getOptionalUser(request);
  if (!user?.role.includes('ADMIN')) {
    throw redirect('/login');
  }
}
