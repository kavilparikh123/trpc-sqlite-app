import { initTRPC } from '@trpc/server';
import type { Context } from './contex';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
