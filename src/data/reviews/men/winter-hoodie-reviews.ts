import type { Prisma } from "@prisma/client";

export const winterHoodieReviews: Prisma.UserReviewCreateInput[] = [
  {
    product: {
      connect: {
        id: "12",
      },
    },
    userId: "user_2wrOgC3XEkCMixMb6de6e2jpdfa",
    rate: 4,
    comment:
      "Solid hoodie. I wear it to the gym and around town — no complaints.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120),
  },
  {
    product: {
      connect: {
        id: "12",
      },
    },
    userId: "user_2wrOlOUfjMPPmUIvfhZ6FbQGMhI",
    rate: 5,
    comment:
      "This hoodie is a beast. Warm, heavy, and perfect for layering over a tee.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    product: {
      connect: {
        id: "12",
      },
    },
    userId: "user_2wrOrGt4rUphsl7bvIkZFRbrCz9",
    rate: 5,
    comment:
      "Exactly what I needed — thick, soft, and the hood actually covers my head.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 43),
  },
];
