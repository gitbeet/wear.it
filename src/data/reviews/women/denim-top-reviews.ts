import type { Prisma } from "@prisma/client";

export const denimTopReviews: Prisma.UserReviewCreateInput[] = [
  {
    product: {
      connect: {
        id: "3",
      },
    },
    userId: "user_2wp2ICHI6CMJYzLuR0kW9rEhGGT",
    rate: 4,
    comment: "Nice classic look. Slightly boxy on me, but still very wearable.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    product: {
      connect: {
        id: "3",
      },
    },
    userId: "user_2wp8lIfvYfA0MG0pHVL4U40rRev",
    rate: 5,
    comment:
      "Absolutely love it! Great fit and the denim is soft but structured — perfect for layering.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 17),
  },
  {
    product: {
      connect: {
        id: "3",
      },
    },
    userId: "user_2woYdYmhECzDdFTPSmPzluOkr8x",
    rate: 2,
    comment:
      "Doesn't look like the photos. The cut is awkward and the fabric is too stiff.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120),
  },
  {
    product: {
      connect: {
        id: "3",
      },
    },
    userId: "user_2wp0ClkKKR5VyTo2tZtkd7k2LDa",
    rate: 4,
    comment:
      "Looks great and feels durable, but it runs slightly tight around the shoulders.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120),
  },
];
