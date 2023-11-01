import { type Prisma } from "@prisma/client";
import { v4 as uuid } from "uuid";

type ProductType = Prisma.ProductCreateInput;
export const products: ProductType[] = [
  {
    name: "Test t-shirt",
    description: "This is the coolest t-shirt ever",
    types: ["MEN", "WOMEN"],
    price: 150,
    colors: ["ORANGE", "BROWN"],
    sizes: ["XS", "S", "M", "L", "XL"],
    SKU: uuid(),
    category: {
      connect: {
        id: 22,
      },
    },
    inventory: {
      connect: {
        id: 1,
      },
    },
    images: {
      createMany: {
        data: [
          {
            imageURL: "/assets/product-images/white-tShirt.png",
          },
        ],
      },
    },
  },
  {
    name: "Test Hat",
    description: "Cool hat ",
    types: ["MEN"],
    price: 150,
    colors: ["RED"],
    sizes: ["XS", "S", "M", "L", "XL"],
    SKU: uuid(),
    category: {
      connect: {
        id: 42,
      },
    },
    inventory: {
      connect: {
        id: 2,
      },
    },
    images: {
      createMany: {
        data: [
          {
            imageURL: "/assets/product-images/red-hat.png",
          },
        ],
      },
    },
  },
  {
    name: "Test Leggings",
    description: "Coolest leggings ever!",
    types: ["WOMEN"],
    price: 150,
    colors: ["PURPLE"],
    sizes: ["S", "M", "L", "XL"],
    SKU: uuid(),
    category: {
      connect: {
        id: 36,
      },
    },
    inventory: {
      connect: {
        id: 3,
      },
    },
    images: {
      createMany: {
        data: [
          {
            imageURL: "/assets/product-images/purple-leggings.png",
          },
        ],
      },
    },
  },
];
