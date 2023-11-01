import { PrismaClient } from "@prisma/client";
import { productInventories } from "../src/data/inventories";
import { productCategories } from "../src/data/categories";
import { products } from "../src/data/products";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.product.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.productInventory.deleteMany();

  const createCategories = prisma.productCategory.createMany({
    data: productCategories,
  });

  await prisma.$transaction([createCategories]);

  const createInventories = prisma.productInventory.createMany({
    data: productInventories,
  });

  await prisma.$transaction([createInventories]);

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
