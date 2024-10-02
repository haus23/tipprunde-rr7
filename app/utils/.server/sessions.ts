import { createCookieSessionStorage } from 'react-router';

type AuthSessionData = {
  sessionId: string;
};

type AuthSessionFlashData = {
  email: string;
};

const authSessionStorage = createCookieSessionStorage<
  AuthSessionData,
  AuthSessionFlashData
>({
  cookie: {
    name: '__auth',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [String(process.env.SESSION_SECRET)],
    secure: process.env.NODE_ENV === 'production',
  },
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
