import type { Prisma } from "@prisma/client";

export const oversizedSweatshirtReviews: Prisma.UserReviewCreateInput[] = [
  {
    product: {
      connect: {
        id: "5",
      },
    },
    userId: "user_2woYdYmhECzDdFTPSmPzluOkr8x",
    rate: 5,
    comment:
      "Absolutely love this oversized sweatshirt — it's like wearing a warm hug!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
  },
  {
    product: {
      connect: {
        id: "5",
      },
    },
    userId: "user_2wp0YjV6cx4rO8AlWDOzilQA0VX",
    rate: 4,
    comment:
      "Great comfort and fit, though I wish the sleeves were just a bit longer.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },

  {
    product: {
      connect: {
        id: "5",
      },
    },
    userId: "user_2wp2ICHI6CMJYzLuR0kW9rEhGGT",
    rate: 5,
    comment: "My new go-to for lounging — soft, cozy, and super stylish!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    product: {
      connect: {
        id: "5",
      },
    },
    userId: "user_2wp8lIfvYfA0MG0pHVL4U40rRev",
    rate: 2,
    comment:
      "Didn’t meet expectations — the fabric felt thinner than advertised.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
];
