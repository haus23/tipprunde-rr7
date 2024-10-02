import type { RouteConfig } from '@react-router/dev/routes';
import { index, layout, route } from '@react-router/dev/routes';

export const routes: RouteConfig = [
  layout('routes/_layouts/foh-layout.tsx', [
    index('routes/foh/tables/_route.tsx'),
    // Auth Routes
    route('login', 'routes/auth/login.tsx'),
    route('onboarding', 'routes/auth/onboarding.tsx'),
    route('logout', 'routes/auth/logout.tsx'),
  ]),
  layout('routes/_layouts/manager-layout.tsx', [
    route('manager', 'routes/manager/dashboard/_route.tsx'),
  ]),
];
