import { redirect } from 'react-router';
import type * as Route from './+types.magic-link';

import {
  ensureOnboardingSession,
  login,
  requireAnonymous,
} from '#/utils/.server/auth';

export const loader = async ({ request }: Route.LoaderArgs) => {
  await requireAnonymous(request);
  await ensureOnboardingSession(request);
  const error = await login(request);

  // Only possible way to come here: using an outdated link
  // So we treat it as first miss and continue with the onboarding page.
  throw redirect('/onboarding');
};
