import { PrismaClient } from "@prisma/client";
import { type ProductType } from "~/data/products";
import product from "../../src/data/products/women/long-sleeve-tshirt";

const prisma = new PrismaClient();

async function addProduct(product: ProductType) {
  const result = await prisma.product.create({
    data: product,
  });
  return result;
}

addProduct(product)
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
