import type { Prisma } from "@prisma/client";

export const cozyWoolenWinterHatReviews: Prisma.UserReviewCreateInput[] = [
  {
    product: {
      connect: {
        id: "1",
      },
    },
    userId: "user_2wp2ICHI6CMJYzLuR0kW9rEhGGT",
    rate: 5,
    comment: "Perfect for chilly mornings! Super soft and fits snugly.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120),
  },
  {
    product: {
      connect: {
        id: "1",
      },
    },
    userId: "user_2wp0YjV6cx4rO8AlWDOzilQA0VX",
    rate: 4,
    comment: "Nice quality and keeps my ears warm, but runs a bit small.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 34),
  },
  {
    product: {
      connect: {
        id: "1",
      },
    },
    userId: "user_2woYdYmhECzDdFTPSmPzluOkr8x",
    rate: 5,
    comment: "Stylish and cozy! Got compliments the first day I wore it.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
];
