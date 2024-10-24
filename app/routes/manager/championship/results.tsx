import { requireAdmin } from '#/utils/.server/auth';
import type * as Route from './+types.results';

export const meta = [
  { title: 'Manager - runde.tips' },
  { name: 'description', value: 'Verwaltung der Haus23 Tipprunde' },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  await requireAdmin(request);
  return null;
};

export const handle = {
  pageTitle: 'Ergebnisse',
};

export default function ResultsRoute() {
  return <div />;
}
