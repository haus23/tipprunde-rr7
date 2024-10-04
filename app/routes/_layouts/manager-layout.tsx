import { Form, Link, Outlet } from 'react-router';
import { Logo } from '#/components/logo';
import { Button } from '#/components/ui';

export default function FohLayout() {
  return (
    <div className="relative isolate min-h-svh w-full grid grid-cols-[200px_1fr]">
      <header className="flex flex-col border-r py-2 pl-2 pr-4">
        <Link to="/">
          <Logo />
        </Link>
        <Form action="/logout" method="post">
          <Button type="submit">Log Out</Button>
        </Form>
      </header>
      <main className="pl-2 mt-2.5">
        <Outlet />
      </main>
    </div>
  );
}
