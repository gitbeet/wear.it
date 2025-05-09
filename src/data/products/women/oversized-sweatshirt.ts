import { type ProductColor } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { type ProductType } from "../../products";
import { IMAGES_PATH } from "~/constants";

const product: ProductType = {
  id: "5",
  name: "Oversized sweatshirt",
  description:
    "Unwind in comfort and style with our  Oversized Sweatshirt for women. Made from a cozy fleece blend, this navy blue sweatshirt offers a loose, relaxed fit perfect for casual outings or lounging at home. Elevate your comfort game with this must-have piece.",
  types: ["WOMEN"],
  price: 34.99,
  colors: {
    connect: ["PINK", "GRAY", "BEIGE"].map((c) => ({
      color: c as ProductColor,
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
      quantity: 30,
    },
  },
  images: {
    createMany: {
      data: [
        {
          imageURL: `${IMAGES_PATH}/women/oversized-sweatshirt/oversized-sweatshirt--beige-01.jpg`,
          color: "BEIGE",
        },
        {
          imageURL: `${IMAGES_PATH}/women/oversized-sweatshirt/oversized-sweatshirt--beige-02.jpg`,
          color: "BEIGE",
        },
        {
          imageURL: `${IMAGES_PATH}/women/oversized-sweatshirt/oversized-sweatshirt--beige-03.jpg`,
          color: "BEIGE",
        },
        {
          imageURL: `${IMAGES_PATH}/women/oversized-sweatshirt/oversized-sweatshirt--pink-01.jpg`,
          color: "PINK",
        },
        {
          imageURL: `${IMAGES_PATH}/women/oversized-sweatshirt/oversized-sweatshirt--pink-02.jpg`,
          color: "PINK",
        },
        {
          imageURL: `${IMAGES_PATH}/women/oversized-sweatshirt/oversized-sweatshirt--pink-03.jpg`,
          color: "PINK",
        },
        {
          imageURL: `${IMAGES_PATH}/women/oversized-sweatshirt/oversized-sweatshirt--gray-01.jpg`,
          color: "GRAY",
        },
        {
          imageURL: `${IMAGES_PATH}/women/oversized-sweatshirt/oversized-sweatshirt--gray-02.jpg`,
          color: "GRAY",
        },
        {
          imageURL: `${IMAGES_PATH}/women/oversized-sweatshirt/oversized-sweatshirt--gray-03.jpg`,
          color: "GRAY",
        },
      ],
    },
  },
};

export default product;
