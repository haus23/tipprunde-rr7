import { type ActionFunctionArgs, Form, useActionData } from 'react-router';
import { signup } from '#/utils/.server/auth';

export const meta = [
  { title: 'Log In - runde.tips' },
  { name: 'description', value: 'Benutzeranmeldung zur Haus23 Tipprunde' },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  return await signup(request);
};

export default function LoginRoute() {
  const actionData = useActionData() as Awaited<
    ReturnType<typeof action>
  > | null;

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
