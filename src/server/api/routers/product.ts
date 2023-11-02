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
        slug: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { color = [], size = [], type = "MEN", slug } = input;
      console.log(color);
      const products = await ctx.db.product.findMany({
        where: {
          category: {
            slug,
          },
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
        },
      });
      return products;
    }),
});
