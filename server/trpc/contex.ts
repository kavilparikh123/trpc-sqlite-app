import { prisma } from '@/server/db';

export const createContext = () => {
  return { prisma };
};

export type Context = ReturnType<typeof createContext>;
