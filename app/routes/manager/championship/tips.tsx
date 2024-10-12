import { requireAdmin } from '#/utils/.server/auth';
import type * as Route from './+types.tips';

export const meta = [
  { title: 'Manager - runde.tips' },
  { name: 'description', value: 'Verwaltung der Haus23 Tipprunde' },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  await requireAdmin(request);
  return null;
};

export default function TipsRoute() {
  return (
    <div>
      <h1 className="text-2xl">Tipps</h1>
    </div>
  );
}
