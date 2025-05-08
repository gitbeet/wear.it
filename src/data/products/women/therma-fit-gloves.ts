import { v4 as uuid } from "uuid";
import { type ProductType } from "../../products";
import { IMAGES_PATH } from "~/constants";
import { type ProductColor } from "@prisma/client";

const product: ProductType = {
  id: "8",
  name: "Therma-fit gloves",
  description:
    "Designed with advanced insulation technology, these gloves provide superior warmth and a sleek, comfortable fit. Perfect for chilly days, they’re an essential accessory for staying cozy and stylish on the go.",
  types: ["WOMEN"],
  price: 24.99,
  colors: {
    connect: ["BLACK"].map((c) => ({
      color: c as ProductColor,
    })),
  },
  sizes: {
    connect: [1, 2, 3, 4, 5].map((id) => ({ id })),
  },
  SKU: uuid(),
  category: {
    connect: {
      id: 29,
    },
  },
  inventory: {
    create: {
      quantity: 25,
    },
  },
  images: {
    createMany: {
      data: [
        {
          imageURL: `${IMAGES_PATH}/women/therma-fit-gloves/therma-fit-gloves-01.jpg`,
          color: "BLACK",
        },
        {
          imageURL: `${IMAGES_PATH}/women/therma-fit-gloves/therma-fit-gloves-02.jpg`,
          color: "BLACK",
        },
        {
          imageURL: `${IMAGES_PATH}/women/therma-fit-gloves/therma-fit-gloves-03.jpg`,
          color: "BLACK",
        },
      ],
    },
  },
};

export default product;
