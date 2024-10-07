import { Form, Link } from 'react-router';
import type * as Route from './+types.onboarding';

import {
  ensureOnboardingSession,
  login,
  requireAnonymous,
} from '#/utils/.server/auth';

export const meta = [
  { title: 'Log In Code Eingabe - runde.tips' },
  { name: 'description', value: 'Benutzeranmeldung zur Haus23 Tipprunde' },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  await requireAnonymous(request);
  return await ensureOnboardingSession(request);
};

export const action = async ({ request }: Route.ActionArgs) => {
  return await login(request);
};

export default function OnboardingRoute({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const error = actionData?.error || loaderData.error;
  return (
    <div>
      <h1 className="text-2xl">Code Eingabe</h1>
      <Form className="mt-4 flex flex-col gap-y-4" method="post">
        <div className="flex gap-x-2 self-center">
          <label htmlFor="code">Code:</label>
          <input
            className="w-24 self-center text-center"
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
        {error && (
          <div>
            {error} <Link to="/login">Zurück zum Login</Link>
          </div>
        )}
        <button type="submit">Prüfen</button>
      </Form>
    </div>
  );
}
