import { createCookie, createCookieSessionStorage } from 'react-router';

type AuthSessionData = {
  sessionId: string;
  email: string;
  rememberMe: boolean;
};

type AuthSessionFlashData = {
  error: string;
};

export const authCookie = createCookie('__auth', {
  sameSite: 'lax',
  path: '/',
  httpOnly: true,
  secrets: [String(process.env.SESSION_SECRET)],
  secure: process.env.NODE_ENV === 'production',
});

const authSessionStorage = createCookieSessionStorage<
  AuthSessionData,
  AuthSessionFlashData
>({
  cookie: authCookie,
});
const authSession = {
  commitAuthSession: authSessionStorage.commitSession,
  destroyAuthSession: authSessionStorage.destroySession,
  getAuthSession: (request: Request) =>
    authSessionStorage.getSession(request.headers.get('Cookie')),
};

export const { getAuthSession, commitAuthSession, destroyAuthSession } = {
  ...authSession,
};
