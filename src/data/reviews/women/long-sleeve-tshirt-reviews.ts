import type { Prisma } from "@prisma/client";

export const longSleeveTshirtReviews: Prisma.UserReviewCreateInput[] = [
  {
    product: {
      connect: {
        id: "4",
      },
    },
    userId: "user_2woYdYmhECzDdFTPSmPzluOkr8x",
    rate: 5,
    comment:
      "This long sleeve tee is incredibly soft — perfect for layering in fall!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
  },
  {
    product: {
      connect: {
        id: "4",
      },
    },
    userId: "user_2wp0YjV6cx4rO8AlWDOzilQA0VX",
    rate: 4,
    comment:
      "Really comfy and breathable, though the sleeves were slightly tight.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
  },
  {
    product: {
      connect: {
        id: "4",
      },
    },
    userId: "user_2wp2ICHI6CMJYzLuR0kW9rEhGGT",
    rate: 5,
    comment: "Love the relaxed fit and color — a wardrobe staple for sure.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
  },
  {
    product: {
      connect: {
        id: "4",
      },
    },
    userId: "user_2wp8lIfvYfA0MG0pHVL4U40rRev",
    rate: 3,
    comment:
      "It's okay — the fit is good, but the color faded a bit after the first wash.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
];
