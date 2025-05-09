import type { Prisma } from "@prisma/client";

export const casualWhiteTshirtReviews: Prisma.UserReviewCreateInput[] = [
  {
    product: {
      connect: {
        id: "11",
      },
    },
    userId: "user_2wrOgC3XEkCMixMb6de6e2jpdfa",
    rate: 5,
    comment:
      "Classic and comfortable — fits perfectly and goes with everything.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 76),
  },
  {
    product: {
      connect: {
        id: "11",
      },
    },
    userId: "user_2wrOlOUfjMPPmUIvfhZ6FbQGMhI",
    rate: 4,
    comment: "Nice relaxed fit and holds shape well after washing.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120),
  },
  {
    product: {
      connect: {
        id: "11",
      },
    },
    userId: "user_2wrOrGt4rUphsl7bvIkZFRbrCz9",
    rate: 3,
    comment: "Decent shirt, but attracts lint easily and wrinkles fast.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 23),
  },
];
