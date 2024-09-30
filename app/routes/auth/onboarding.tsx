import { Form } from 'react-router';

export const meta = [
  { title: 'Log In Code Eingabe - runde.tips' },
  { name: 'description', value: 'Benutzeranmeldung zur Haus23 Tipprunde' },
];

export default function OnboardingRoute() {
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
        <button type="submit">Prüfen</button>
      </Form>
    </div>
  );
}
