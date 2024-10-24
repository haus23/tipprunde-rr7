import type { Championship } from '@prisma/client';

export function useChampionships(): {
  currentChampionship: Championship | null;
} {
  return { currentChampionship: null };
}
