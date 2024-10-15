import { requireAdmin } from '#/utils/.server/auth';
import type * as Route from './+types.sync';

export const meta = [
  { title: 'Manager - runde.tips' },
  { name: 'description', value: 'Verwaltung der Haus23 Tipprunde' },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  await requireAdmin(request);
  return null;
};

export default function SyncRoute() {
  return (
    <div>
      <h1 className="text-2xl">Synchronisierung</h1>
    </div>
  );
}
