import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import z from "zod";
import {
  CategoryType,
  type Prisma,
  ProductColor,
  ProductSize,
} from "@prisma/client";
export const productRouter = createTRPCRouter({
  searchProduct: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { query } = input;
      if (query.length < 1) return;
      const tags = query.split(" ");
      const results = await db.product.findMany({
        where: {
          OR: [
            {
              name: {
                in: tags,
                mode: "insensitive",
              },
            },
            {
              description: {
                in: tags,
                mode: "insensitive",
              },
            },
            {
              category: {
                name: {
                  in: tags,
                  mode: "insensitive",
                },
              },
            },
            {
              colors: {
                some: {
                  name: {
                    in: tags,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              sizes: {
                some: {
                  name: {
                    in: tags,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
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
          colors: true,
          sizes: true,
        },
      });

      return results;
    }),
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
          colors: true,
          sizes: true,
        },
      });
      return product;
    }),
  getAll: publicProcedure
    .input(
      z.object({
        collectionId: z.number().optional(),
        size: z.nativeEnum(ProductSize).array().optional(),
        color: z.nativeEnum(ProductColor).array().optional(),
        type: z.nativeEnum(CategoryType).array().optional(),
        slug: z.string().optional(),
        sort: z.enum(["newest", "high-to-low", "low-to-high"]).optional(),
        skip: z.number().optional(),
        pageSize: z.number().positive().optional(),
        priceFrom: z.number().nonnegative().optional(),
        priceTo: z.number().nonnegative().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const {
        skip,
        collectionId,
        color = [],
        size = [],
        type = ["MEN", "WOMEN"],
        slug,
        sort = "newest",
        pageSize,
        priceFrom = 0,
        priceTo = 100000,
      } = input;

      const where: Prisma.ProductWhereInput = {
        price: {
          gte: priceFrom,
          lte: priceTo,
        },
        collectionId,
        category: {
          slug,
        },
        types: {
          hasSome: type,
        },
        colors:
          color.length > 0
            ? {
                some: {
                  color: {
                    in: color,
                  },
                },
              }
            : undefined,
        sizes:
          size.length > 0
            ? {
                some: {
                  size: {
                    in: size,
                  },
                },
              }
            : undefined,
      };

      const aggregateWhere: Prisma.ProductWhereInput = {
        collectionId,
        category: {
          slug,
        },
        types: {
          hasSome: type,
        },
        colors:
          color.length > 0
            ? {
                some: {
                  color: {
                    in: color,
                  },
                },
              }
            : undefined,
        sizes:
          size.length > 0
            ? {
                some: {
                  size: {
                    in: size,
                  },
                },
              }
            : undefined,
      };

      const [products, totalProducts, minPrice, maxPrice] =
        await ctx.db.$transaction([
          ctx.db.product.findMany({
            where,
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
            take: pageSize,
            skip,
            orderBy:
              sort === "newest"
                ? { createdAt: "desc" }
                : sort === "high-to-low"
                ? { price: "desc" }
                : sort === "low-to-high"
                ? { price: "asc" }
                : { name: "asc" },
          }),
          ctx.db.product.count({ where }),
          ctx.db.product.aggregate({
            where: aggregateWhere,
            _min: {
              price: true,
            },
          }),
          ctx.db.product.aggregate({
            where: aggregateWhere,
            _max: {
              price: true,
            },
          }),
        ]);

      return { products, totalProducts, minPrice, maxPrice };
    }),
});
