import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  data,
} from 'react-router';
import type * as Route from './+types.root';

import { getUser } from './utils/.server/auth';
import { combineHeaders } from './utils/misc';

import './app.css';
import { UIProvider } from './components/ui';
import { useAuthBroadcast } from './utils/auth';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers: authHeaders } = await getUser(request);

  return data({ user }, { headers: combineHeaders(authHeaders) });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-app">
        <UIProvider>{children}</UIProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useAuthBroadcast();

  return <Outlet />;
}
