import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import z from "zod";
import { CategoryType, ProductColor, ProductSize } from "@prisma/client";
export const productRouter = createTRPCRouter({
  getSingleProduct: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const product = await ctx.db.product.findUnique({
        where: {
          id,
        },
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
            },
          },
        },
      });
      return product;
    }),
  getAll: publicProcedure
    .input(
      z.object({
        size: z.nativeEnum(ProductSize).array().optional(),
        color: z.nativeEnum(ProductColor).array().optional(),
        type: z.nativeEnum(CategoryType).optional(),
        slug: z.string().optional(),
        sort: z.enum(["newest", "high-to-low", "low-to-high"]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const {
        color = [],
        size = [],
        type = "MEN",
        slug,
        sort = "newest",
      } = input;

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
        orderBy:
          sort === "newest"
            ? { createdAt: "desc" }
            : sort === "high-to-low"
            ? { price: "desc" }
            : sort === "low-to-high"
            ? { price: "asc" }
            : { name: "asc" },
      });
      return products;
    }),
});
