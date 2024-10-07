import { Link, Outlet } from 'react-router';
import { Logo } from '#/components/logo';
import { UserMenu } from '#/components/user-menu';
import { useIsAuthenticated } from '#/utils/auth';

export default function FohLayout() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="relative isolate min-h-svh w-full">
      <header className="flex items-center gap-x-4 border-b py-2 pr-4 pl-2">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex grow justify-between">
          <div className="grow" />
          <div>
            {isAuthenticated ? <UserMenu /> : <Link to="/login">Log In</Link>}
          </div>
        </div>
      </header>
      <main className="mx-auto mt-2 max-w-prose">
        <Outlet />
      </main>
    </div>
  );
}
