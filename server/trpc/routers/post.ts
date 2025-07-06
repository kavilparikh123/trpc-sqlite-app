import { z } from 'zod';
import { router, publicProcedure } from '../index';

export const postRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }),

  create: publicProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.post.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(z.object({ id: z.number(), title: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.post.update({
        where: { id: input.id },
        data: { title: input.title, content: input.content },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.post.delete({
        where: { id: input.id },
      });
    }),
});
