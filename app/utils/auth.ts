import { useEffect, useRef } from 'react';
import { useRevalidator, useRouteLoaderData } from 'react-router';

import type { loader } from '#/root';

export function useIsAuthenticated() {
  const data = useRouteLoaderData('root') as Awaited<
    ReturnType<typeof loader>
  >['data'];

  return !!data && !!data.user;
}

export function useAuthBroadcast() {
  const channelRef = useRef<BroadcastChannel>();
  const authenticated = useIsAuthenticated();
  const revalidator = useRevalidator();

  useEffect(() => {
    channelRef.current = new BroadcastChannel('auth');

    function revalidate() {
      if (revalidator.state === 'idle') {
        revalidator.revalidate();
      }
    }
    channelRef.current.addEventListener('message', revalidate);
    return () => {
      channelRef.current?.removeEventListener('message', revalidate);
      channelRef.current?.close();
    };
  }, [revalidator]);

  useEffect(() => {
    channelRef.current?.postMessage(authenticated);
  }, [authenticated]);
}
