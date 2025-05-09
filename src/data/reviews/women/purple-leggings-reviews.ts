import type { Prisma } from "@prisma/client";

export const purpleLeggingsReviews: Prisma.UserReviewCreateInput[] = [
  {
    product: {
      connect: {
        id: "6",
      },
    },
    userId: "user_2wp2ICHI6CMJYzLuR0kW9rEhGGT",
    rate: 5,
    comment:
      "Super flattering and the color is gorgeous — perfect for workouts or casual wear!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120),
  },
  {
    product: {
      connect: {
        id: "6",
      },
    },
    userId: "user_2wp0YjV6cx4rO8AlWDOzilQA0VX",
    rate: 4,
    comment:
      "Soft and comfortable for everyday wear, but they attract lint easily.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
  {
    product: {
      connect: {
        id: "6",
      },
    },
    userId: "user_2woYdYmhECzDdFTPSmPzluOkr8x",
    rate: 5,
    comment:
      "Perfect fit, super comfy, and the purple really stands out — love them!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
  },
];
