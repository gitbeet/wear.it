import { clerkClient } from "@clerk/nextjs";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import z from "zod";
import type { User } from "@clerk/nextjs/dist/types/server";
import type { UserReview } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const filterUserData = (user: User) => {
  return {
    id: user.id,
    username: user.username ?? "Unknown user",
    profilePicture: user.imageUrl,
  };
};

const addUserDataToComments = async (reviews: UserReview[]) => {
  const users = (
    await clerkClient.users.getUserList({
      userId: reviews.map((review) => review.userId),
    })
  ).map(filterUserData);

  return reviews.map((review) => {
    const author = users.find((user) => user.id === review.userId);
    if (!author) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Author for post not found (addUserDataToPosts)",
      });
    }

    return { review, author: { ...author, username: author.username } };
  });
};

export const reviewRouter = createTRPCRouter({
  getReviewsByProductId: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { productId } = input;
      const comments = await db.userReview.findMany({
        where: {
          productId,
        },
      });
      return addUserDataToComments(comments);
    }),
  deleteReview: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { db, userId } = ctx;
      const { id } = input;

      const comment = await db.userReview.findFirst({
        where: {
          id,
        },
      });

      if (comment?.userId !== userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await db.userReview.delete({
        where: {
          id,
        },
      });
    }),
  createReview: privateProcedure
    .input(
      z.object({
        rate: z.number(),
        comment: z.string(),
        productId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, userId } = ctx;
      const { comment, productId, rate } = input;

      const review = await db.userReview.create({
        data: {
          rate,
          comment,
          userId,
          productId,
        },
      });

      return review;
    }),
});
