import { type Prisma } from "@prisma/client";

type ProductCategoryType = Prisma.ProductCategoryCreateManyInput;
export const productCategories: ProductCategoryType[] = [
  {
    id: 1,
    name: "Clothing",
    slug: "clothing",
    types: ["MEN", "WOMEN"],
    description: "All Clothing products",
  },
];
