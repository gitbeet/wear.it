import { createTRPCRouter, privateProcedure } from "../trpc";
import z from "zod";

export const ratingRouter = createTRPCRouter({
  getByUserId: privateProcedure.query(async ({ ctx }) => {
    const { db, userId } = ctx;
    const rating = await db.userRating.findUnique({
      where: {
        userId,
      },
    });

    return rating;
  }),
  rate: privateProcedure
    .input(z.object({ productId: z.string(), rate: z.number().min(1).max(5) }))
    .mutation(async ({ ctx, input }) => {
      const { rate, productId } = input;
      const { db, userId } = ctx;

      const rateProduct = await db.userRating.create({
        data: {
          userId,
          productId,
          rate,
        },
      });

      return rateProduct;
    }),
});
