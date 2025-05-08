import type { Prisma } from "@prisma/client";

export const woolSweaterReviews: Prisma.UserReviewCreateInput[] = [
  {
    product: {
      connect: {
        id: "10",
      },
    },
    userId: "user_2woYdYmhECzDdFTPSmPzluOkr8x",
    rate: 5,
    comment:
      "So soft and warm! Perfect for chilly winter days, and it feels very high quality.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 67),
  },
  {
    product: {
      connect: {
        id: "10",
      },
    },
    userId: "user_2wp0YjV6cx4rO8AlWDOzilQA0VX",
    rate: 3,
    comment:
      "Nice sweater, but it shrank a bit after the first wash. Still wearable, just a little tighter.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 33),
  },

  {
    product: {
      connect: {
        id: "10",
      },
    },
    userId: "user_2wp2ICHI6CMJYzLuR0kW9rEhGGT",
    rate: 5,
    comment:
      "Amazing quality! The wool feels luxurious, and it keeps me warm without being too bulky.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    product: {
      connect: {
        id: "10",
      },
    },
    userId: "user_2wp8lIfvYfA0MG0pHVL4U40rRev",
    rate: 4,
    comment:
      "Really comfortable and stylish, but I wish the sleeves were a little longer.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 16),
  },
];
