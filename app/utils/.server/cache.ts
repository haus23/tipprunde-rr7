import { cachified, softPurge } from '@epic-web/cachified';
import { singleton } from './singleton';

const cache = singleton('cache', () => new Map());

export function cached<Value>(
  key: string,
  fetcher: () => Promise<Value>,
  ttl?: number,
) {
  return cachified({
    // ttl: 2 * 60 * 1000, // 2 minutes
    ttl: ttl ?? Number.POSITIVE_INFINITY,
    staleWhileRevalidate: 1000, // 1 second
    cache,
    key,
    getFreshValue: fetcher,
  });
}

export async function invalidate(key: string) {
  await softPurge({ cache, key, staleWhileRevalidate: 1000 });
}
