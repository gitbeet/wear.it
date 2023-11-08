import { createTRPCRouter, privateProcedure } from "../trpc";

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
});
