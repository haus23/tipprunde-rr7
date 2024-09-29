import type { RouteConfig } from '@react-router/dev/routes';
import { index, route } from '@react-router/dev/routes';

export const routes: RouteConfig = [
  index('routes/foh/tables/_route.tsx'),
  route('manager', 'routes/manager/dashboard/_route.tsx'),
];
