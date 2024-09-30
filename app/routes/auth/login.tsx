import { Form } from 'react-router';

export const meta = [
  { title: 'Log In - runde.tips' },
  { name: 'description', value: 'Benutzeranmeldung zur Haus23 Tipprunde' },
];

export default function LoginRoute() {
  return (
    <div>
      <h1 className="text-2xl">Log In</h1>
      <Form className="mt-4 flex flex-col gap-y-4" method="post">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email">E-Mail:</label>
          <input id="email" type="email" name="email" required />
        </div>
        <button type="submit">Code anfordern</button>
      </Form>
    </div>
  );
}
