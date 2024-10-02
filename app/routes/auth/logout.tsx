import type { LoaderFunctionArgs } from 'react-router';

import { logout } from '#/utils/.server/auth';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const referer = request.headers.get('Referer');

  // Do not stay in manager area after logout (would be redirected anyway)
  const isManagerRoute =
    referer !== null && new URL(referer).pathname.startsWith('/manager');
  if (isManagerRoute) {
    request.headers.delete('Referer');
  }

  await logout(request, { fallbackUrl: '/' });
};
