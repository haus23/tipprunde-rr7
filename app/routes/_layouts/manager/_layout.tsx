import { Outlet } from 'react-router';
import { ManagerNav } from './manager-nav';

export default function ManagerLayout() {
  return (
    <div className="relative isolate grid min-h-svh w-full grid-cols-[200px_1fr]">
      <div className="flex flex-col">
        <ManagerNav />
      </div>
      <main className="bg-content pt-2.5 pl-2">
        <Outlet />
      </main>
    </div>
  );
}
