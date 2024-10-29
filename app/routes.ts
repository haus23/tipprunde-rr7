import type { RouteConfig } from '@react-router/dev/routes';
import { index, layout, prefix, route } from '@react-router/dev/routes';

export const routes: RouteConfig = [
  layout('routes/_layouts/foh-layout.tsx', [
    index('routes/foh/tables/_route.tsx'),
    // Auth Routes
    route('login', 'routes/auth/login.tsx'),
    route('logout', 'routes/auth/logout.tsx'),
    route('magic-link', 'routes/auth/magic-link.tsx'),
    route('onboarding', 'routes/auth/onboarding.tsx'),
  ]),
  layout('routes/_layouts/manager/_layout.tsx', [
    ...prefix('manager', [
      index('routes/manager/dashboard/_route.tsx'),
      route('sync', 'routes/manager/sync/_route.tsx'),
      // Current championship
      ...prefix(':championshipId', [
        index('routes/manager/championship/_championship.tsx'),
        route('spiele', 'routes/manager/championship/matches.tsx'),
        route('tipps', 'routes/manager/championship/tips.tsx'),
        route('ergebnisse', 'routes/manager/championship/results.tsx'),
        route('zusatzpunkte', 'routes/manager/championship/extrapoints.tsx'),
      ]),
      // Master data
      route('turniere', 'routes/manager/championships/_route.tsx'),
      route('spieler', 'routes/manager/players/_route.tsx'),
      route('teams', 'routes/manager/teams/_route.tsx'),
      route('ligen', 'routes/manager/leagues/_route.tsx'),
      route('regelwerke', 'routes/manager/rulesets/_route.tsx'),
    ]),
    // Actions
    route(
      '/actions/sync/clear-legacy-cache',
      'routes/_actions/sync/clear-legacy-cache.ts',
    ),
  ]),
];
