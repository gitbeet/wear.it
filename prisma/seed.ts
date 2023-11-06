import { PrismaClient } from "@prisma/client";
// import { productInventories } from "../src/data/inventories";
import { productCategories } from "../src/data/categories";
import { products } from "../src/data/products";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.product.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.productInventory.deleteMany();
  await prisma.discount.deleteMany();
  await prisma.collection.deleteMany();

  const createCategories = prisma.productCategory.createMany({
    data: productCategories,
  });

  await prisma.$transaction([createCategories]);

  // const createInventories = prisma.productInventory.createMany({
  //   data: productInventories,
  // });

  // await prisma.$transaction([createInventories]);

  const createDiscounts = prisma.discount.create({
    data: {
      id: 1,
      active: true,
      discountPercent: 25,
      description: "Winter offer for all t-shirts",
      name: "Winter T-shirt Sale",
    },
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
};

main()
  .then(() => console.log("Seeded Successfully"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
