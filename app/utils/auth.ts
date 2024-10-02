import { useRouteLoaderData } from 'react-router';

import type { loader } from '#/root';

export function useIsAuthenticated() {
  const data = useRouteLoaderData('root') as Awaited<
    ReturnType<typeof loader>
  >['data'];

  return !!data && !!data.user;
}
