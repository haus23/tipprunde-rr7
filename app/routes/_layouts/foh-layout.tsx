import { Link, Outlet } from 'react-router';
import { Logo } from '#/components/logo';

export default function FohLayout() {
  return (
    <div className="relative isolate min-h-svh w-full">
      <header className="flex items-center gap-x-4 border-b py-2 pr-4 pl-2">
        <Link to="/">
          <Logo />
        </Link>
        <div className="grow flex justify-between">
          <div className="grow" />
          <div>
            <Link to="/manager">Manager</Link>
          </div>
        </div>
      </header>
      <main className="mt-2 max-w-prose mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
