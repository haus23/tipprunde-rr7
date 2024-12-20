import { Outlet } from 'react-router';

import { ManagerHeader } from './manager-header';

export default function ManagerLayout() {
  return (
    <div className="relative isolate flex min-h-svh w-full">
      <ManagerHeader />
      <main className="mt-14 grow bg-app-content pl-2 md:ml-52">
        <Outlet />
      </main>
    </div>
  );
}
