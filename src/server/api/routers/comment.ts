import { clerkClient } from "@clerk/nextjs";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import z from "zod";
import { User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";

const filterUserData = (user: User) => {
  return {
    id: user.id,
    username: user.username ?? "Unknown user",
    profilePicture: user.imageUrl,
  };
};

type Comment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  productId: string;
  userId: string;
};

const addUserDataToComments = async (comments: Comment[]) => {
  const users = (
    await clerkClient.users.getUserList({
      userId: comments.map((comment) => comment.userId),
    })
  ).map(filterUserData);

  return comments.map((comment) => {
    const author = users.find((user) => user.id === comment.userId);
    if (!author) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Author for post not found (addUserDataToPosts)",
      });
    }

    return { comment, author: { ...author, username: author.username } };
  });
};

export const commentRouter = createTRPCRouter({
  getCommentsByProductId: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { productId } = input;
      const comments = await db.userComment.findMany({
        where: {
          productId,
        },
      });
      return addUserDataToComments(comments);
    }),
  deleteComment: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { db, userId } = ctx;
      const { id } = input;

      const comment = await db.userComment.findFirst({
        where: {
          id,
        },
      });

      if (comment?.userId !== userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await db.userComment.delete({
        where: {
          id,
        },
      });
    }),
  createComment: privateProcedure
    .input(z.object({ content: z.string(), productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { db, userId } = ctx;
      const { content, productId } = input;

      const comment = await db.userComment.create({
        data: {
          content,
          userId,
          productId,
        },
      });

      return comment;
    }),
});
