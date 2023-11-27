import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const orderRouter = createTRPCRouter({
  createOrder: publicProcedure.mutation(async ({ ctx }) => {
    const { db, userId: loggedUserId, guestUserId } = ctx;
    const userId = loggedUserId ?? guestUserId ?? undefined;
    if (typeof userId === "undefined") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No user identifier found",
      });
    }

    const session = await db.shoppingSession.findUnique({
      where: {
        userId,
      },
      include: {
        cartItems: {
          select: {
            color: true,
            productId: true,
            quantity: true,
            size: true,
          },
        },
      },
    });

    if (!session) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Session for given identifier not found",
      });
    }

    console.log(session);

    const [order, deletedSession] = await db.$transaction([
      db.orderDetails.create({
        data: {
          userId,
          total: session.total,
          orderItems: {
            createMany: {
              data: session.cartItems.map(
                ({ productId, color, quantity, size }) => ({
                  productId,
                  quantity,
                  color,
                  size,
                }),
              ),
            },
          },
        },
      }),
      db.shoppingSession.delete({
        where: {
          userId,
        },
      }),
    ]);

    if (!order || !deletedSession) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong!",
      });
    }

    console.log(order);
    console.log(deletedSession);

    return { order, deletedSession };
  }),
});
