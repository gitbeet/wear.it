import { type ProductColor } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { type ProductType } from "../../products";
import { IMAGES_PATH } from "~/constants";

const product: ProductType = {
  id: "2",
  name: "Oversized pullover hoodie",
  description:
    "Embrace comfort and style with our Oversized Pullover Hoodie for women. Crafted with a soft and durable cotton blend, this heather gray hoodie offers a relaxed, chic look. Perfect for a cozy day out or lounging at home.",

  types: ["WOMEN"],
  price: 49.99,
  colors: {
    connect: ["BLUE", "YELLOW"].map((color) => ({
      color: color as ProductColor,
    })),
  },
  sizes: {
    connect: [1, 2, 3, 4, 5].map((id) => ({ id })),
  },
  SKU: uuid(),
  category: {
    connect: {
      id: 25,
    },
  },
  inventory: {
    create: {
      quantity: 6,
    },
  },
  images: {
    createMany: {
      data: [
        {
          imageURL: `${IMAGES_PATH}/women/oversized-pullover-hoodie/oversized-pullover-hoodie--blue-01.jpg`,
          color: "BLUE",
        },
        {
          imageURL: `${IMAGES_PATH}/women/oversized-pullover-hoodie/oversized-pullover-hoodie--blue-02.jpg`,
          color: "BLUE",
        },
        {
          imageURL: `${IMAGES_PATH}/women/oversized-pullover-hoodie/oversized-pullover-hoodie--blue-03.jpg`,
          color: "BLUE",
        },
        {
          imageURL: `${IMAGES_PATH}/women/oversized-pullover-hoodie/oversized-pullover-hoodie--yellow-01.jpg`,
          color: "YELLOW",
        },
        {
          imageURL: `${IMAGES_PATH}/women/oversized-pullover-hoodie/oversized-pullover-hoodie--yellow-02.jpg`,
          color: "YELLOW",
        },
        {
          imageURL: `${IMAGES_PATH}/women/oversized-pullover-hoodie/oversized-pullover-hoodie--yellow-03.jpg`,
          color: "YELLOW",
        },
      ],
    },
  },
};

export default product;
