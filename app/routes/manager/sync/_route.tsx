import type { FirestoreChampionship } from '#/api/firestore/entity/championship';
import { getEntities } from '#/api/firestore/repository/get-entities';
import { requireAdmin } from '#/utils/.server/auth';
import type * as Route from './+types._route';

export const meta = [
  { title: 'Manager - runde.tips' },
  { name: 'description', value: 'Verwaltung der Haus23 Tipprunde' },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  await requireAdmin(request);

  const championships = await getEntities<FirestoreChampionship>(
    'championships',
    (docs) => docs.orderBy('nr', 'desc'),
  );

  return { championships };
};

export const handle = {
  pageTitle: 'Synchronisierung',
};

export default function SyncRoute({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);
  return <div />;
}
