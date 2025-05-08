import { v4 as uuid } from "uuid";
import { type ProductType } from "../../products";
import { IMAGES_PATH } from "~/constants";
import { type ProductColor } from "@prisma/client";

const product: ProductType = {
  id: "3",
  name: "Denim jacket",
  description:
    "Elevate your wardrobe with our Classic Women's Denim Jacket, the ultimate blend of casual chic and versatile functionality. Made from premium-quality, lightweight denim, this jacket offers all-day comfort without compromising on style. Its tailored fit and timeless design make it the perfect layering piece for every season.",
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
          imageURL: `${IMAGES_PATH}/women/denim-top/denim-top-01.jpg`,
          color: "WHITE",
        },
        {
          imageURL: `${IMAGES_PATH}/women/denim-top/denim-top-02.jpg`,
          color: "WHITE",
        },
        {
          imageURL: `${IMAGES_PATH}/women/denim-top/denim-top-03.jpg`,
          color: "WHITE",
        },
      ],
    },
  },
};

export default product;
