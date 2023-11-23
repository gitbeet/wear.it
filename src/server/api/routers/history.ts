import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";

export const historyRouter = createTRPCRouter({
  getByUserId: publicProcedure.query(async ({ ctx }) => {
    const { db, userId: loggedUserId, guestUserId } = ctx;
    const userId = loggedUserId ?? guestUserId ?? undefined;
    if (typeof userId === "undefined") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No user identifier found",
      });
    }
    const recentlyViewed = await db.productHistory.findUniqueOrThrow({
      where: {
        userId,
      },
      select: {
        items: {
          select: {
            product: {
              include: {
                images: true,
                discount: {
                  select: {
                    discountPercent: true,
                  },
                },
                category: {
                  select: {
                    name: true,
                    slug: true,
                  },
                },
                colors: true,
                sizes: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return recentlyViewed;
  }),
  addToHistory: publicProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { db, userId: loggedUserId, guestUserId } = ctx;
      const userId = loggedUserId ?? guestUserId ?? undefined;
      if (typeof userId === "undefined") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No user identifier found",
        });
      }
      const { productId } = input;

      const existingHistory = await db.productHistory.findFirst({
        where: {
          userId,
        },
        include: {
          items: {
            select: {
              productId: true,
              id: true,
            },
          },
        },
      });

      if (!existingHistory) {
        const createHistory = await db.productHistory.create({
          data: {
            userId,
            items: {
              create: {
                productId,
              },
            },
          },
        });
        return createHistory;
      }
      const itemIndex = existingHistory.items.find(
        (item) => item.productId === productId,
      );
      if (itemIndex) {
        const dateTime = new Date();

        await db.historyItem.update({
          where: {
            id: itemIndex.id,
          },
          data: {
            createdAt: dateTime,
          },
        });
        return;
      }
      const addProduct = await db.historyItem.create({
        data: {
          productId,
          historyId: existingHistory.id,
        },
      });
      return addProduct;
    }),
});
