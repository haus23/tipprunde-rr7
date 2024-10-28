import type { FirestoreChampionship } from '#/api/firestore/entity/championship';
import { getEntities } from '#/api/firestore/repository/get-entities';
import { requireAdmin } from '#/utils/.server/auth';
import type * as Route from './+types._route';

export const meta = [
  { title: 'Synchronisierung - Tipprunde' },
  { name: 'description', value: 'Synchronisierung der Backends' },
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
  return <div />;
}
