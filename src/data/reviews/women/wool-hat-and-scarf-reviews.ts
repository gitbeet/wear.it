import type { Prisma } from "@prisma/client";

export const woolHatAndScarfReviews: Prisma.UserReviewCreateInput[] = [
  {
    product: {
      connect: {
        id: "9",
      },
    },
    userId: "user_2wp2ICHI6CMJYzLuR0kW9rEhGGT",
    rate: 5,
    comment: "Super warm and stylish — the perfect winter accessory combo!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22),
  },
  {
    product: {
      connect: {
        id: "9",
      },
    },
    userId: "user_2wp8lIfvYfA0MG0pHVL4U40rRev",
    rate: 3,
    comment: "Nice design, but the wool feels a little scratchy on the neck.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
  {
    product: {
      connect: {
        id: "9",
      },
    },
    userId: "user_2woYdYmhECzDdFTPSmPzluOkr8x",
    rate: 5,
    comment:
      "Exactly what I needed for winter. Great quality and super cute together.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    product: {
      connect: {
        id: "9",
      },
    },
    userId: "user_2wp0ClkKKR5VyTo2tZtkd7k2LDa",
    rate: 4,
    comment: "Love the look and feel, but I wish the scarf were a bit longer.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120),
  },
  {
    product: {
      connect: {
        id: "9",
      },
    },
    userId: "user_2wp0YjV6cx4rO8AlWDOzilQA0VX",
    rate: 4,
    comment:
      "Very warm and well-made, but the colors were slightly off from the photos.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 56),
  },
];
