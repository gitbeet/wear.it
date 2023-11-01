import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.productCategory.findMany({
      where: {
        parent: null,
      },
      orderBy: {
        id: "asc",
      },
    });
    return categories;
  }),
});
