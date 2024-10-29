import { useFetcher } from 'react-router';
import type { FirestoreChampionship } from '#/api/firestore/entity/championship';
import { getEntities } from '#/api/firestore/repository/get-entities';
import { Select, SelectItem } from '#/components/ui/select/select';
import { requireAdmin } from '#/utils/.server/auth';
import { cached } from '#/utils/.server/cache';

import { Button } from '#/components/ui/button/button';
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

  const legacyCache = useFetcher();

  return (
    <div>
      <div className="m-4 rounded border bg-app shadow">
        <h3 className="border-b p-2 font-medium text-lg">Backend-Daten</h3>
        <div className="space-y-2 p-4 text-subtle">
          <p>
            Hiermit werden die Cache-Daten des Legacy-Backends gelöscht. Damit
            kann die zur Zeit noch laufende Tipprunden-Anwendung (Legacy) wieder
            aktuelle Daten anzeigen.
          </p>
          <p>
            Mit einem Release des FOH dieser App als neue Tipprunden-Anwendung
            ist das Legacy-Backend und die Legacy-Tipprunde obsolet.
          </p>
        </div>
        <legacyCache.Form
          className="flex flex-col gap-y-4 p-4"
          method="post"
          action="/actions/sync/clear-legacy-cache"
        >
          <Select
            label="Turnier"
            defaultSelectedKey={championships.at(0)?.id}
            className="w-52"
            name="slug"
          >
            {championships.map((c) => (
              <SelectItem key={c.id} id={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </Select>
          <Button className="justify-center" type="submit">
            Invalidate Cache
          </Button>
        </legacyCache.Form>
      </div>
    </div>
  );
}
