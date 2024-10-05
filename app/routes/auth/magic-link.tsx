import type * as Route from './+types.magic-link';

import {
  ensureOnboardingSession,
  login,
  requireAnonymous,
} from '#/utils/.server/auth';

export const loader = async ({ request }: Route.LoaderArgs) => {
  await requireAnonymous(request);
  await ensureOnboardingSession(request);
  await login(request, { withMagicLink: true });
};
