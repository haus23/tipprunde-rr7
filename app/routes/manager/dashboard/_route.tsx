import type { LoaderFunctionArgs } from 'react-router';
import { requireAdmin } from '#/utils/.server/auth';

export const meta = [
  { title: 'Manager - runde.tips' },
  { name: 'description', value: 'Verwaltung der Haus23 Tipprunde' },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAdmin(request);
};

export default function DashboardRoute() {
  return (
    <div>
      <h1 className="text-2xl">Dashboard</h1>
    </div>
  );
}
