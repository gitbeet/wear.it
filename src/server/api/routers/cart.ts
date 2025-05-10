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
      console.log("No session");
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
        // type: z.enum(["INCREMENT", "DECREMENT"]),
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
      console.log("Adding item...");
      const { productId, quantity = 1, size, color } = input;
      // Check if there's a session attached to the current user/guest user
      const shoppingSession = await db.shoppingSession.findUnique({
        where: {
          userId,
        },
      });
      // If there's no such session, create one and add the item with quantity of 1
      if (!shoppingSession) {
        console.log("No session...");
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
        return;
      }
      // If there exist such session
      if (shoppingSession) {
        // Check if the item is already in the cart
        const isProductAlreadyInCart = await db.cartItem.findFirst({
          where: {
            productId,
            size,
            color,
            sessionId: shoppingSession.id,
          },
        });
        // If the item is already in the cart, just return
        if (isProductAlreadyInCart) return;
        // If it's not in the cart, create the cart item and attach it to the session
        console.log("Not in cart.");
        await db.cartItem.create({
          data: {
            quantity,
            productId,
            sessionId: shoppingSession.id,
            color,
            size,
          },
        });
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
