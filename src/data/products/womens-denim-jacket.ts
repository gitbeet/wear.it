import { v4 as uuid } from "uuid";
import { IMAGES_PATH, type ProductType } from "../products";
import { type ProductColor } from "@prisma/client";

const product: ProductType = {
  name: "Womens denim jacket",
  description:
    "Unwind in comfort and style with our  Oversized Sweatshirt for women. Made from a cozy fleece blend, this navy blue sweatshirt offers a loose, relaxed fit perfect for casual outings or lounging at home. Elevate your comfort game with this must-have piece.",
  types: ["WOMEN"],
  price: 89.99,
  colors: {
    connect: ["WHITE"].map((c) => ({
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
          imageURL: `${IMAGES_PATH}/women's-denim-top/women's-denim-top-01.jpg`,
          color: "WHITE",
        },
        {
          imageURL: `${IMAGES_PATH}/women's-denim-top/women's-denim-top-02.jpg`,
          color: "WHITE",
        },
        {
          imageURL: `${IMAGES_PATH}/women's-denim-top/women's-denim-top-03.jpg`,
          color: "WHITE",
        },
      ],
    },
  },
};

export default product;
