import type { Prisma } from "@prisma/client";

export const thermaFitGlovesReviews: Prisma.UserReviewCreateInput[] = [
  {
    product: {
      connect: {
        id: "8",
      },
    },
    userId: "user_2wp2ICHI6CMJYzLuR0kW9rEhGGT",
    rate: 5,
    comment:
      "Excellent quality! Warm, flexible, and stylish — a winter essential.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    product: {
      connect: {
        id: "8",
      },
    },
    userId: "user_2wp8lIfvYfA0MG0pHVL4U40rRev",
    rate: 5,
    comment:
      "Incredible warmth without the bulk — perfect for cold morning runs!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
  {
    product: {
      connect: {
        id: "8",
      },
    },
    userId: "user_2woYdYmhECzDdFTPSmPzluOkr8x",
    rate: 2,
    comment:
      "Didn’t live up to the hype. They’re fine for mild cold, not for snow.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 74),
  },
  {
    product: {
      connect: {
        id: "8",
      },
    },
    userId: "user_2wp0ClkKKR5VyTo2tZtkd7k2LDa",
    rate: 4,
    comment:
      "Nice snug fit and solid grip, but a little tight around the wrists.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 370),
  },
  {
    product: {
      connect: {
        id: "8",
      },
    },
    userId: "user_2wp0YjV6cx4rO8AlWDOzilQA0VX",
    rate: 3,
    comment: "Decent gloves, but they take forever to dry if they get wet.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 56),
  },
];
