import { PrismaClient } from '@prisma/client';
import { singleton } from './singleton';

/**
 * Singleton prisma client instance
 */
export const db = singleton('prisma', () => new PrismaClient());
