import type { Prisma } from "@prisma/client";

export const oversizedPulloverHoodieReviews: Prisma.UserReviewCreateInput[] = [
  {
    product: {
      connect: {
        id: "2",
      },
    },
    userId: "user_2wp0ClkKKR5VyTo2tZtkd7k2LDa",
    rate: 5,
    comment: "Super comfy and cozy. Love wearing it around the house!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    product: {
      connect: {
        id: "2",
      },
    },
    userId: "user_2woYdYmhECzDdFTPSmPzluOkr8x",
    rate: 4,
    comment: "Great fit and quality, but wish it had more color options.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    product: {
      connect: {
        id: "2",
      },
    },
    userId: "user_2wp0YjV6cx4rO8AlWDOzilQA0VX",
    rate: 3,
    comment: "Looks good, but the material could be thicker.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
];
