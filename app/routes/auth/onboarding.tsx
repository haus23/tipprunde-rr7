import {
  type ActionFunctionArgs,
  Form,
  Link,
  type LoaderFunctionArgs,
  useActionData,
} from 'react-router';
import { ensureOnboardingSession, login } from '#/utils/.server/auth';

export const meta = [
  { title: 'Log In Code Eingabe - runde.tips' },
  { name: 'description', value: 'Benutzeranmeldung zur Haus23 Tipprunde' },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await ensureOnboardingSession(request);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return await login(request);
};

export default function OnboardingRoute() {
  const actionData = useActionData() as Awaited<
    ReturnType<typeof action>
  > | null;

  return (
    <div>
      <h1 className="text-2xl">Code Eingabe</h1>
      <Form className="mt-4 flex flex-col gap-y-4" method="post">
        <div className="self-center flex gap-x-2">
          <label htmlFor="code">Code:</label>
          <input
            className="w-24 text-center self-center"
            id="code"
            type="text"
            name="code"
            required
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            pattern="\d{6}"
          />
        </div>
        {actionData?.errors && (
          <div>
            {actionData.errors.code} <Link to="/login">Zurück zum Login</Link>
          </div>
        )}
        <button type="submit">Prüfen</button>
      </Form>
    </div>
  );
}
