import { useMatches } from 'react-router';
import { useChampionships } from '../use-championships';

type RouteHandle = {
  pageTitle: string;
};

function hasPageTitle(handle: unknown): handle is RouteHandle {
  return typeof handle === 'object' && handle !== null && 'pageTitle' in handle;
}

export function usePageTitle() {
  const matches = useMatches();
  const { currentChampionship } = useChampionships();

  const routeHandle = matches.at(-1)?.handle;

  if (hasPageTitle(routeHandle)) {
    return routeHandle.pageTitle;
  }

  return currentChampionship?.name || '';
}
