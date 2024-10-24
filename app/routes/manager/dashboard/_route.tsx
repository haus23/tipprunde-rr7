import { requireAdmin } from '#/utils/.server/auth';
import type * as Route from './+types._route.js';

export const meta = [
  { title: 'Manager - runde.tips' },
  { name: 'description', value: 'Verwaltung der Haus23 Tipprunde' },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  await requireAdmin(request);
  return null;
};

export const handle = {
  pageTitle: 'Manager',
};

export default function DashboardRoute() {
  return <div />;
}
