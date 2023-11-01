import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import z from "zod";
import { CategoryType, ProductColor, ProductSize } from "@prisma/client";
export const productRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        size: z.nativeEnum(ProductSize).array().optional(),
        color: z.nativeEnum(ProductColor).array().optional(),
        type: z.nativeEnum(CategoryType).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { color = [], size = [], type = "MEN" } = input;
      const products = await ctx.db.product.findMany({
        where: {
          types: {
            hasSome: [type],
          },
          colors:
            color.length > 0
              ? {
                  hasSome: color,
                }
              : undefined,
          sizes:
            size.length > 0
              ? {
                  hasSome: size,
                }
              : undefined,
        },
      });
      return products;
    }),
});
