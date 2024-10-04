import { Form } from 'react-router';
import type * as Route from './+types.login';

import { requireAnonymous, signup } from '#/utils/.server/auth';

export const meta = [
  { title: 'Log In - runde.tips' },
  { name: 'description', value: 'Benutzeranmeldung zur Haus23 Tipprunde' },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  await requireAnonymous(request);
  return null;
};

export const action = async ({ request }: Route.ActionArgs) => {
  return await signup(request);
};

export default function LoginRoute({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <h1 className="text-2xl">Log In</h1>
      <Form className="mt-4 flex flex-col gap-y-4" method="post">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email">E-Mail:</label>
          <input id="email" type="email" name="email" required />
        </div>
        {actionData?.errors && <div>{actionData.errors.email}</div>}
        <button type="submit">Code anfordern</button>
      </Form>
    </div>
  );
}
