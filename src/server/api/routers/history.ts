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
    const recentlyViewed = await db.productHistory.findUnique({
      where: {
        userId,
      },
      select: {
        items: {
          select: {
            product: {
              include: {
                discount: {
                  select: {
                    active: true,
                    discountPercent: true,
                  },
                },
                category: {
                  select: {
                    name: true,
                    slug: true,
                  },
                },
                images: {
                  select: {
                    imageURL: true,
                    id: true,
                    color: true,
                    productId: true,
                  },
                },
                colors: true,
                sizes: true,
              },
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
    });

    return recentlyViewed;
  }),
  addToHistory: publicProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { productId } = input;
      const { db, userId: loggedUserId, guestUserId } = ctx;
      const userId = loggedUserId ?? guestUserId ?? undefined;

      if (typeof userId === "undefined") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No user identifier found",
        });
      }

      // create history if none found
      const history = await db.productHistory.upsert({
        where: {
          userId,
        },
        create: {
          userId,
        },
        update: {},
      });

      // create/update history item depending on conditions
      const historyItem = await db.historyItem.upsert({
        where: {
          historyId_productId: {
            historyId: history.id,
            productId,
          },
        },
        // create if not existing
        create: {
          historyId: history.id,
          productId,
        },
        // update to appear as last visited
        update: {
          updatedAt: new Date(),
        },
      });

      return historyItem;
    }),
});
