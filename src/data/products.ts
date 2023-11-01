import { type Prisma } from "@prisma/client";
import { v4 as uuid } from "uuid";

type ProductType = Prisma.ProductCreateInput;
export const products: ProductType[] = [
  {
    name: "Clothing",
    description: "All Clothing products",
    types: ["MEN", "WOMEN"],
    price: 150,
    colors: ["ORANGE", "BROWN"],
    sizes: ["XS", "S", "M", "L", "XL"],
    SKU: uuid(),
    category: {
      connect: {
        id: 1,
      },
    },
    inventory: {
      connect: {
        id: 1,
      },
    },
  },
];
