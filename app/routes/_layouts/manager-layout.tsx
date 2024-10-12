import { Form, Link, Outlet } from 'react-router';
import { Logo } from '#/components/logo';
import { Button } from '#/components/ui';

export default function FohLayout() {
  return (
    <div className="relative isolate grid min-h-svh w-full grid-cols-[200px_1fr]">
      <header className="flex flex-col border-r py-2 pr-4 pl-2">
        <Link to="/">
          <Logo />
        </Link>
        <Form action="/logout" method="post">
          <Button type="submit">Log Out</Button>
        </Form>
      </header>
      <main className="bg-content pt-2.5 pl-2">
        <Outlet />
      </main>
    </div>
  );
}
