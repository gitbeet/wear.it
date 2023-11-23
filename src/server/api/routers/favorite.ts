import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import z from "zod";
import { ProductColor } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const favoriteRouter = createTRPCRouter({
  getByUserId: publicProcedure.query(async ({ ctx }) => {
    const { db, userId: loggedUserId, guestUserId } = ctx;
    const userId = loggedUserId ?? guestUserId ?? undefined;
    if (typeof userId === "undefined") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No user identifier found",
      });
    }
    const favorites = await db.favorite.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          select: {
            colors: true,
            name: true,
            category: {
              select: {
                types: true,
                name: true,
                slug: true,
              },
            },
            price: true,
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
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return favorites;
  }),
  favorite: publicProcedure
    .input(
      z.object({ productId: z.string(), color: z.nativeEnum(ProductColor) }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, userId: loggedUserId, guestUserId } = ctx;
      const userId = loggedUserId ?? guestUserId ?? undefined;
      if (typeof userId === "undefined") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No user identifier found",
        });
      }
      const { productId, color } = input;

      const favAlreadyExists = await db.favorite.findFirst({
        where: {
          AND: [{ color }, { userId }, { productId }],
        },
      });

      if (favAlreadyExists) {
        await db.favorite.delete({
          where: {
            id: favAlreadyExists.id,
          },
        });
        return;
      }

      const favorite = await db.favorite.create({
        data: {
          productId,
          userId,
          color,
        },
      });
      return favorite;
    }),
});
