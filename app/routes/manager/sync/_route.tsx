import type { FirestoreChampionship } from '#/api/firestore/entity/championship';
import { getEntities } from '#/api/firestore/repository/get-entities';
import { Select, SelectItem } from '#/components/ui/select/select';
import { requireAdmin } from '#/utils/.server/auth';
import { cached } from '#/utils/.server/cache';

import type * as Route from './+types._route';

export const meta = [
  { title: 'Synchronisierung - Tipprunde' },
  { name: 'description', value: 'Synchronisierung der Backends' },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  await requireAdmin(request);

  const championships = await cached('manager-championships', () =>
    getEntities<FirestoreChampionship>('championships', (docs) =>
      docs.orderBy('nr', 'desc'),
    ),
  );

  return { championships };
};

export const handle = {
  pageTitle: 'Synchronisierung',
};

export default function SyncRoute({ loaderData }: Route.ComponentProps) {
  const { championships } = loaderData;

  return (
    <div>
      <Select
        label="Turnier"
        defaultSelectedKey={championships.at(0)?.id}
        className="w-52"
      >
        {championships.map((c) => (
          <SelectItem key={c.id} id={c.id}>
            {c.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
