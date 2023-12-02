import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";
import { ProductColor, ProductSize } from "@prisma/client";

export const cartRouter = createTRPCRouter({
  getItemsCount: publicProcedure.query(async ({ ctx }) => {
    const { db, userId: loggedUserId, guestUserId } = ctx;
    const userId = loggedUserId ?? guestUserId ?? undefined;
    if (typeof userId === "undefined") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No user identifier found",
      });
    }
    const totalCount = await db.shoppingSession.findUnique({
      where: {
        userId,
      },
      select: {
        cartItems: {
          select: {
            quantity: true,
          },
        },
      },
    });
    return totalCount;
  }),
  getByUserId: publicProcedure.query(async ({ ctx }) => {
    const { userId: loggedUserId, guestUserId, db } = ctx;
    const userId = loggedUserId ?? guestUserId ?? undefined;
    if (typeof userId === "undefined") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No user identifier found",
      });
    }
    const shoppingSession = await db.shoppingSession.findUnique({
      where: {
        userId: userId,
      },
      include: {
        cartItems: {
          select: {
            id: true,
            product: {
              select: {
                id: true,
                discount: {
                  select: {
                    active: true,
                    discountPercent: true,
                  },
                },
                images: {
                  select: {
                    color: true,
                    imageURL: true,
                  },
                },
                name: true,
                price: true,
                sizes: true,
                colors: true,
                category: {
                  select: {
                    name: true,
                    slug: true,
                  },
                },
              },
            },
            quantity: true,
            color: true,
            size: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!shoppingSession) {
      const newSession = await db.shoppingSession.create({
        data: {
          total: 0,
          userId,
        },
        include: {
          cartItems: {
            select: {
              id: true,
              product: {
                select: {
                  id: true,
                  discount: {
                    select: {
                      active: true,
                      discountPercent: true,
                    },
                  },
                  images: {
                    select: {
                      color: true,
                      imageURL: true,
                    },
                  },
                  name: true,
                  price: true,
                  sizes: true,
                  colors: true,
                  category: {
                    select: {
                      name: true,
                      slug: true,
                    },
                  },
                },
              },
              quantity: true,
              color: true,
              size: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
      return newSession;
    }

    return shoppingSession;
  }),
  removeItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const { userId: loggedUserId, guestUserId, db } = ctx;
      const userId = loggedUserId ?? guestUserId ?? undefined;
      if (typeof userId === "undefined") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No user identifier found",
        });
      }

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
  addItem: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        quantity: z.number().positive().optional(),
        type: z.enum(["INCREMENT", "DECREMENT"]),
        size: z.nativeEnum(ProductSize),
        color: z.nativeEnum(ProductColor),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId: loggedUserId, guestUserId, db } = ctx;
      const userId = loggedUserId ?? guestUserId ?? undefined;
      if (typeof userId === "undefined") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No user identifier found",
        });
      }
      const { productId, quantity = 1, type, size, color } = input;
      const shoppingSession = await db.shoppingSession.findUnique({
        where: {
          userId,
        },
      });
      if (!shoppingSession) {
        await db.shoppingSession.create({
          data: {
            userId,
            cartItems: {
              create: {
                quantity,
                productId,
                color,
                size,
              },
            },
            total: 0,
          },
        });
      } else {
        const isProductAlreadyInCart = await db.cartItem.findFirst({
          where: {
            productId,
            size,
            color,
          },
        });

        if (!isProductAlreadyInCart) {
          await db.cartItem.create({
            data: {
              quantity,
              productId,
              sessionId: shoppingSession.id,
              color,
              size,
            },
          });
        } else {
          await db.cartItem.update({
            where: {
              id: isProductAlreadyInCart.id,
            },

            data: {
              quantity:
                type === "INCREMENT"
                  ? { increment: quantity }
                  : { decrement: quantity },
            },
          });
        }
      }
    }),
  modifyItem: publicProcedure
    .input(
      z.object({
        id: z.string(),
        size: z.nativeEnum(ProductSize).optional(),
        quantity: z.number().positive().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId: loggedUserId, guestUserId, db } = ctx;
      const userId = loggedUserId ?? guestUserId ?? undefined;
      if (typeof userId === "undefined") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No user identifier found",
        });
      }
      const { size: inputSize, quantity: inputQuantity, id } = input;

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

      if (userId !== cartItem?.shoppingSession.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      if (inputSize) {
        await db.cartItem.update({
          where: {
            id,
          },
          data: {
            size: inputSize,
          },
        });
      }

      if (inputQuantity) {
        await db.cartItem.update({
          where: {
            id,
          },
          data: {
            quantity: inputQuantity,
          },
        });
      }
    }),
});
