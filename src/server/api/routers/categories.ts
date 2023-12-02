import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import z from "zod";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.productCategory.findMany({
      where: {
        parent: null,
      },
      orderBy: {
        id: "asc",
      },
      include: {
        children: true,
      },
    });
    return categories;
  }),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const category = await ctx.db.productCategory.findUnique({
        where: {
          slug: input.slug,
        },
        select: {
          name: true,
        },
      });
      return category;
    }),
});
