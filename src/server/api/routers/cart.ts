import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure } from "../trpc";
import z from "zod";

export const cartRouter = createTRPCRouter({
  getByUserId: privateProcedure.query(async ({ ctx }) => {
    const { userId, db } = ctx;
    const cart = await db.shoppingSession.findUnique({
      where: {
        userId: userId,
      },
      include: {
        cartItems: {
          select: {
            id: true,
            product: true,
            quantity: true,
          },
        },
      },
    });
    return cart;
  }),
  removeItem: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const { db, userId } = ctx;

      const cartItem = await db.cartItem.findUnique({
        where: {
          id,
        },
        include: {
          shoppingSession: {
            select: {
              userId: true,
            },
          },
        },
      });
      const sessionUserId = cartItem?.shoppingSession.userId;
      if (userId !== sessionUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      await db.cartItem.delete({
        where: {
          id,
        },
      });
    }),
});
