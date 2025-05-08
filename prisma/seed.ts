import {
  PrismaClient,
  type ProductColor,
  type ProductSize,
} from "@prisma/client";
import { productCategories } from "../src/data/categories";
import { products } from "../src/data/products";
import { categorySEOData } from "~/data/categorySEO";
import { typeSEOdata } from "~/data/typeSEO";
import { reviews } from "~/data/reviews";

const prisma = new PrismaClient();

const colors: { id: number; color: ProductColor }[] = [
  { id: 1, color: "PURPLE" },
  { id: 2, color: "BLACK" },
  { id: 3, color: "RED" },
  { id: 4, color: "ORANGE" },
  { id: 5, color: "BLUE" },
  { id: 6, color: "WHITE" },
  { id: 7, color: "BROWN" },
  { id: 8, color: "GREEN" },
  { id: 9, color: "PINK" },
  { id: 10, color: "YELLOW" },
  { id: 11, color: "GRAY" },
  { id: 12, color: "BEIGE" },
];

const sizes: { id: number; size: ProductSize }[] = [
  { id: 1, size: "XS" },
  { id: 2, size: "S" },
  { id: 3, size: "M" },
  { id: 4, size: "L" },
  { id: 5, size: "XL" },
  { id: 6, size: "XXL" },
  { id: 7, size: "XXXL" },
];

const main = async () => {
  await prisma.product.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.productInventory.deleteMany();
  await prisma.productHistory.deleteMany();
  await prisma.discount.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.shoppingSession.deleteMany();
  await prisma.colorDetails.deleteMany();
  await prisma.sizeDetails.deleteMany();
  await prisma.categorySEO.deleteMany();
  await prisma.typeSEO.deleteMany();
  await prisma.userReview.deleteMany();
  await prisma.orderDetails.deleteMany();

  await prisma.typeSEO.createMany({
    data: typeSEOdata,
  });

  const createCategories = prisma.productCategory.createMany({
    data: productCategories,
  });

  const createCategoryDescriptions = prisma.categorySEO.createMany({
    data: categorySEOData,
  });

  await prisma.$transaction([createCategories, createCategoryDescriptions]);

  for (const c of colors) {
    await prisma.colorDetails.create({
      data: {
        id: c.id,
        color: c.color,
        name: c.color.toLowerCase(),
      },
    });
  }

  for (const s of sizes) {
    await prisma.sizeDetails.create({
      data: {
        id: s.id,
        size: s.size,
        name: s.size.toLowerCase(),
      },
    });
  }

  const createDiscounts = prisma.discount.createMany({
    data: [
      {
        id: 1,
        active: true,
        discountPercent: 25,
        description: "Winter sale",
        name: "Winter offer for a set of products",
      },
      {
        id: 2,
        active: true,
        discountPercent: 15,
        description: "Outlet sale",
        name: "Outlet sale 2024",
      },
    ],
  });

  await prisma.$transaction([createDiscounts]);

  const createCollections = prisma.collection.create({
    data: {
      id: 1,
      name: "Winter 2023",
      season: "WINTER",
      year: 2023,
    },
  });

  await prisma.$transaction([createCollections]);

  for (const p of products) {
    await prisma.product.create({
      data: p,
    });
  }

  for (const r of reviews) {
    try {
      await prisma.userReview.create({ data: r });
      console.log(`User review by user ${r.userId} created successfully`);
    } catch (error) {
      console.error("Error while creating review: ", error);
    }
  }
};

async function seedReviews() {
  await prisma.userReview.deleteMany();
  for (const r of reviews) {
    try {
      await prisma.userReview.create({ data: r });
      console.log(`User review by user ${r.userId} created successfully`);
    } catch (error) {
      console.error("Error while creating review: ", error);
    }
  }
}

seedReviews()
  .then(() => console.log("Seeded reviews successfully"))
  .catch((e) => {
    console.error("Error while seeding reviews: ", e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });

// main()
//   .then(() => console.log("Seeded Successfully"))
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(() => {
//     void prisma.$disconnect();
//   });
