import { requireAdmin } from '#/utils/.server/auth';
import type * as Route from './+types.clear-legacy-cache';

export const loader = async () => {
  throw new Response('Not found', { status: 404 });
};

export const action = async ({ request }: Route.ActionArgs) => {
  await requireAdmin(request);

  const formData = await request.formData();
  const slug = String(formData.get('slug'));

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: `{"routes":true,"resources":[],"standings":"${slug}"}`,
  };

  const invalidationResults = await fetch(
    'https://backend.runde.tips/api/invalidate-cache',
    options,
  ).then((response) => response.json());

  return invalidationResults;
};
