import { v4 as uuid } from "uuid";
import { type ProductType } from "../products";
import { IMAGES_PATH } from "~/constants";

const product: ProductType = {
  name: "Women's purple leggings",
  description: "Coolest leggings ever!",
  types: ["WOMEN"],
  price: 96,
  colors: {
    connect: { color: "PURPLE" },
  },
  sizes: {
    connect: [2, 3, 4, 5].map((id) => ({ id })),
  },
  SKU: uuid(),
  discount: {
    connect: {
      id: 1,
    },
  },
  category: {
    connect: {
      id: 36,
    },
  },
  inventory: {
    create: {
      quantity: 150,
    },
  },
  images: {
    createMany: {
      data: [
        {
          imageURL: `${IMAGES_PATH}/women's-purple-leggings/women's-purple-leggings-01.jpg`,
          color: "PURPLE",
        },
      ],
    },
  },
};

export default product;
