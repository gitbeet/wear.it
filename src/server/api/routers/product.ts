import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import z from "zod";
import {
  CategoryType,
  Prisma,
  ProductColor,
  ProductSize,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";

// MAPS
const colors: { id: number; color: ProductColor }[] = [
  { id: 1, color: "PURPLE" },
  { id: 2, color: "BLACK" },
  { id: 3, color: "RED" },
  { id: 4, color: "ORANGE" },
  { id: 5, color: "BLUE" },
  { id: 6, color: "WHITE" },
  { id: 7, color: "BROWN" },
  { id: 8, color: "GREEN" },
  { id: 9, color: "PINK" },
  { id: 10, color: "YELLOW" },
  { id: 11, color: "GRAY" },
  { id: 12, color: "BEIGE" },
];

const sizes: { id: number; size: ProductSize }[] = [
  { id: 1, size: "XS" },
  { id: 2, size: "S" },
  { id: 3, size: "M" },
  { id: 4, size: "L" },
  { id: 5, size: "XL" },
  { id: 6, size: "XXL" },
  { id: 7, size: "XXXL" },
];

export const productRouter = createTRPCRouter({
  searchProduct: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { query } = input;
      if (query.length < 1) return;
      const tags = query.split(" ").filter(Boolean);
      const results = await db.product.findMany({
        where: {
          OR: tags.map((tag) => {
            return {
              OR: [
                {
                  name: {
                    contains: tag,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: tag,
                    mode: "insensitive",
                  },
                },
                {
                  category: {
                    name: {
                      contains: tag,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  colors: {
                    some: {
                      name: {
                        contains: tag,
                        mode: "insensitive",
                      },
                    },
                  },
                },
                {
                  sizes: {
                    some: {
                      name: {
                        contains: tag,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              ],
            };
          }),
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
      const { db, userId: loggedUserId, guestUserId } = ctx;
      const userId = loggedUserId ?? guestUserId ?? undefined;
      if (typeof userId === "undefined") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No user identifier found",
        });
      }

      const product = await db.product.findUnique({
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
  getAllSQL: publicProcedure
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
        type = ["MEN", "WOMEN", "KIDS"],
        slug,
        sort = "newest",
        pageSize,
        priceFrom = 0,
        priceTo = 100000,
      } = input;

      // PRICE
      const priceCondition = Prisma.sql`discountedprice >= ${priceFrom} AND discountedprice <= ${priceTo}`;
      // COLLECTION
      const collectionCondition = collectionId
        ? Prisma.sql`AND "collectionId" = ${collectionId}`
        : Prisma.empty;
      // COLOR
      const colorCondition =
        color && color.length > 0
          ? Prisma.sql`AND EXISTS (
            SELECT 1  
            FROM  "_ColorDetailsToProduct" c 
            WHERE c."A" = ANY(${color.map(
              (c) => colors.find((co) => co.color === c)?.id,
            )}) AND C."B" = subquery."id"
              )`
          : Prisma.empty;
      // SIZE
      const sizesCondition =
        size && size.length > 0
          ? Prisma.sql`AND EXISTS (
              SELECT 1  
              FROM  "_ProductToSizeDetails" c 
              WHERE c."B" = ANY(${size.map(
                (s) => sizes.find((si) => si.size === s)?.id,
              )}) AND C."A" = subquery."id"
            )`
          : Prisma.empty;
      // TYPE
      const typeCondition = Prisma.sql`AND ${type}::"CategoryType"[] && subquery."types"`;
      // CATEGORY
      const categoryCondition = slug
        ? Prisma.sql`
        AND (
          subquery."category_slug" = ${slug}
          OR 
          subquery."category_parent_slug" = ${slug}
        )`
        : Prisma.empty;
      // ORDER BY
      const orderByStatement =
        sort === "newest"
          ? Prisma.sql`ORDER BY subquery."createdAt" DESC`
          : sort === "low-to-high"
          ? Prisma.sql`ORDER BY subquery."price" ASC`
          : sort === "high-to-low"
          ? Prisma.sql`ORDER BY subquery."price" ASC`
          : Prisma.empty;
      // SKIP
      const skipStatement = skip ? Prisma.sql`OFFSET ${skip}` : Prisma.empty;
      // LIMIT
      const limitStatement = pageSize
        ? Prisma.sql`LIMIT ${pageSize}`
        : Prisma.empty;
      // QUERY
      const products = await ctx.db.$queryRaw`
          SELECT *
          FROM (
            SELECT
              p.*,
              CASE
                WHEN d."discountPercent" IS NULL THEN p.price
                ELSE p.price * (1 - d."discountPercent" / 100)
              END as discountedprice,  
              (
        SELECT JSON_AGG(json_build_object(
            'id', cd."id",
            'name' , cd."name",
            'color', cd."color"
        ))
        FROM "_ColorDetailsToProduct" cdp
        LEFT JOIN "ColorDetails" cd ON cdp."A" = cd."id"
        WHERE p."id" = cdp."B"
    ) AS colors,
    (
        SELECT JSON_AGG(json_build_object(
            'id', i."id",
            'imageURL', i."imageURL",
            'productId', i."productId",
            'color', i."color"
        ))
        FROM "ProductImage" i
        WHERE p."id" = i."productId"
    ) AS images, 
    (
        SELECT JSON_AGG(json_build_object(
            'id', sd."id",
            'name' , sd."name",
            'size', sd."size"
        ))
        FROM "_ProductToSizeDetails" psd
        LEFT JOIN "SizeDetails" sd ON psd."B" = sd."id"
        WHERE p."id" = psd."A"
    ) AS sizes,   
              json_build_object('name', pc.name, 'slug', pc.slug) AS category,   
              d."discountPercent" as discountPercent
              FROM "Product" p
                LEFT JOIN "Discount" d ON p."discountId" = d."id"
                LEFT JOIN "ProductCategory" pc ON p."categoryId" = pc."id"
                LEFT JOIN "ProductCategory" pc_parent ON pc."parentId" = pc_parent."id"
                GROUP BY p."id" , p."name" , d."discountPercent" , pc."slug" ,  pc_parent."slug"  , pc."name"
          ) AS subquery
                 WHERE ${priceCondition}  ${collectionCondition} ${colorCondition} ${sizesCondition} ${typeCondition} ${categoryCondition} ${orderByStatement} ${skipStatement} ${limitStatement}
       `;

      const totalCount: { count: bigint }[] = await ctx.db.$queryRaw`
   SELECT
    COUNT(*)
      FROM (
        SELECT
          p.*,
          CASE
            WHEN d."discountPercent" IS NULL THEN p.price
            ELSE p.price * (1 - d."discountPercent" / 100)
          END as discountedprice,
          pc."slug" as category_slug,
          pc_parent."slug" as category_parent_slug
        FROM "Product" p
        LEFT JOIN "Discount" d ON p."discountId" = d."id"
          JOIN "ProductCategory" pc ON p."categoryId" = pc."id"
         JOIN "ProductCategory" pc_parent ON pc."parentId" = pc_parent."id"
      ) AS subquery
             WHERE ${priceCondition}  ${collectionCondition} ${colorCondition} ${sizesCondition} ${typeCondition} ${categoryCondition}
   `;

      const formattedTotalCount =
        totalCount[0] && Number(totalCount?.[0].count);

      const minPrice: { min: number }[] = await ctx.db.$queryRaw`
        SELECT
         MIN(subquery."discountedprice")
           FROM (
             SELECT
               p.*,
               CASE
                 WHEN d."discountPercent" IS NULL THEN p.price
                 ELSE p.price * (1 - d."discountPercent" / 100)
               END as discountedprice,
               pc."slug" as category_slug,
               pc_parent."slug" as category_parent_slug
             FROM "Product" p
             LEFT JOIN "Discount" d ON p."discountId" = d."id"
               JOIN "ProductCategory" pc ON p."categoryId" = pc."id"
              JOIN "ProductCategory" pc_parent ON pc."parentId" = pc_parent."id"
           ) AS subquery
                  WHERE discountedprice >= 0 AND discountedprice <= 10000000  ${collectionCondition} ${colorCondition} ${sizesCondition} ${typeCondition} ${categoryCondition}
        `;

      const formattedMinPrice = minPrice[0]?.min;

      const maxPrice: { max: number }[] = await ctx.db.$queryRaw`
      SELECT
       MAX(subquery."discountedprice")
         FROM (
           SELECT
             p.*,
             CASE
               WHEN d."discountPercent" IS NULL THEN p.price
               ELSE p.price * (1 - d."discountPercent" / 100)
             END as discountedprice,
             pc."slug" as category_slug,
             pc_parent."slug" as category_parent_slug
           FROM "Product" p
           LEFT JOIN "Discount" d ON p."discountId" = d."id"
             JOIN "ProductCategory" pc ON p."categoryId" = pc."id"
            JOIN "ProductCategory" pc_parent ON pc."parentId" = pc_parent."id"
         ) AS subquery
                WHERE discountedprice >= 0 AND discountedprice <= 10000000  ${collectionCondition} ${colorCondition} ${sizesCondition} ${typeCondition} ${categoryCondition}
      `;

      const formattedMaxPrice = maxPrice[0]?.max;

      return {
        products,
        totalCount: formattedTotalCount,
        min: formattedMinPrice,
        max: formattedMaxPrice,
      };
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
        category: slug
          ? {
              OR: [
                {
                  parent: {
                    slug,
                  },
                },
                { slug },
              ],
            }
          : undefined,
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
        category: slug
          ? {
              OR: [
                {
                  parent: {
                    slug,
                  },
                },
                { slug },
              ],
            }
          : undefined,
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
