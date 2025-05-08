import { type ProductColor } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { type ProductType } from "../../products";
import { IMAGES_PATH } from "~/constants";

const product: ProductType = {
  id: "1",
  name: "Patterned wool winter hat",
  description:
    "Stay warm and stylish this winter with our Cozy Patterned Woolen Winter Hat! Crafted with comfort and fashion in mind, this hat is the perfect accessory to keep you snug during the chilly months.",
  types: ["WOMEN"],
  price: 79,
  // colors: ["RED", "BLUE", "BLACK"],
  colors: {
    // connect: [3, 5, 2].map((id) => ({ id })),
    connect: ["RED", "BLUE", "BLACK"].map((color) => ({
      color: color as ProductColor,
    })),
  },
  // sizes: ["S", "M", "L"],
  sizes: {
    connect: [2, 3, 4].map((id) => ({ id })),
  },
  SKU: uuid(),
  collection: {
    connect: {
      id: 1,
    },
  },
  discount: {
    connect: {
      id: 1,
    },
  },
  category: {
    connect: {
      id: 42,
    },
  },
  inventory: {
    create: {
      quantity: 200,
    },
  },
  images: {
    createMany: {
      data: [
        {
          imageURL: `${IMAGES_PATH}/women/cozy-woolen-winter-hat/cozy-woolen-winter-hat--red-01.jpg`,
          color: "RED",
        },
        {
          imageURL: `${IMAGES_PATH}/women/cozy-woolen-winter-hat/cozy-woolen-winter-hat--red-02.jpg`,
          color: "RED",
        },
        {
          imageURL: `${IMAGES_PATH}/women/cozy-woolen-winter-hat/cozy-woolen-winter-hat--red-03.jpg`,
          color: "RED",
        },
        {
          imageURL: `${IMAGES_PATH}/women/cozy-woolen-winter-hat/cozy-woolen-winter-hat--blue-01.jpg`,
          color: "BLUE",
        },
        {
          imageURL: `${IMAGES_PATH}/women/cozy-woolen-winter-hat/cozy-woolen-winter-hat--blue-02.jpg`,
          color: "BLUE",
        },
        {
          imageURL: `${IMAGES_PATH}/women/cozy-woolen-winter-hat/cozy-woolen-winter-hat--black-01.jpg`,
          color: "BLACK",
        },
      ],
    },
  },
};

export default product;
