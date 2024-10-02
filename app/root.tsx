import {
  Links,
  type LoaderFunctionArgs,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  data,
} from 'react-router';

import { getUser } from './utils/.server/auth';
import { combineHeaders } from './utils/misc';

import './app.css';

export const loader = async ({ request }: LoaderFunctionArgs) => {
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
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
