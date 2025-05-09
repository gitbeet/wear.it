import type { Prisma } from "@prisma/client";

export const stylishAutmnWindbreakerReviews: Prisma.UserReviewCreateInput[] = [
  {
    product: {
      connect: {
        id: "7",
      },
    },
    userId: "user_2woYdYmhECzDdFTPSmPzluOkr8x",
    rate: 2,
    comment: "Nice style but feels flimsy. Not great in stronger wind.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
  },
  {
    product: {
      connect: {
        id: "7",
      },
    },
    userId: "user_2wp0YjV6cx4rO8AlWDOzilQA0VX",
    rate: 4,
    comment: "Love the design and fit, but wish it had more pockets.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 121),
  },

  {
    product: {
      connect: {
        id: "7",
      },
    },
    userId: "user_2wp2ICHI6CMJYzLuR0kW9rEhGGT",
    rate: 5,
    comment:
      "My favorite fall jacket now — sleek look and surprisingly water-resistant!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
  },
  {
    product: {
      connect: {
        id: "7",
      },
    },
    userId: "user_2wp8lIfvYfA0MG0pHVL4U40rRev",
    rate: 3,
    comment: "Average quality. The fit is okay, but the material feels cheap.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
  },
];
