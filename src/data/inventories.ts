import { type Prisma } from "@prisma/client";

type ProductInventory = Prisma.ProductInventoryCreateInput;
export const productInventories: ProductInventory[] = [
  {
    id: 1,
    quantity: 6969,
  },
];
