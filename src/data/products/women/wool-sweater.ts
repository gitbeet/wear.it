import { v4 as uuid } from "uuid";
import { type ProductType } from "../../products";
import { IMAGES_PATH } from "~/constants";

const product: ProductType = {
  id: "10",
  name: "Wool sweater",
  description:
    "Crafted from premium, soft wool, this sweater offers a flattering fit and timeless design that’s perfect for layering or wearing on its own. Stay cozy and chic whether you're lounging at home or out enjoying the crisp autumn air.",
  types: ["WOMEN"],
  price: 53.99,
  colors: {
    connect: { color: "PINK" },
  },
  sizes: {
    connect: [1, 2, 3, 4, 5].map((id) => ({ id })),
  },
  SKU: uuid(),
  discount: {
    connect: {
      id: 2,
    },
  },
  category: {
    connect: {
      id: 25,
    },
  },
  inventory: {
    create: {
      quantity: 26,
    },
  },
  images: {
    createMany: {
      data: [
        {
          imageURL: `${IMAGES_PATH}/women/wool-sweater/wool-sweater-01.jpg`,
          color: "PINK",
        },
        {
          imageURL: `${IMAGES_PATH}/women/wool-sweater/wool-sweater-02.jpg`,
          color: "PINK",
        },
        {
          imageURL: `${IMAGES_PATH}/women/wool-sweater/wool-sweater-03.jpg`,
          color: "PINK",
        },
      ],
    },
  },
};

export default product;
