import { type ProductColor } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { type ProductType } from "../../products";
import { IMAGES_PATH } from "~/constants";

const product: ProductType = {
  id: "4",
  name: "Long sleeve t-shirt",
  description:
    "Made from soft, breathable fabric, this wardrobe essential offers a flattering fit and versatile design perfect for layering or wearing on its own. Stay comfy and stylish no matter the season.",
  types: ["WOMEN"],
  price: 34.99,
  colors: {
    connect: ["GRAY", "BEIGE"].map((c) => ({
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
      quantity: 100,
    },
  },
  images: {
    createMany: {
      data: [
        {
          imageURL: `${IMAGES_PATH}/women/long-sleeve-tshirt/long-sleeve-tshirt--gray-01.jpg`,
          color: "GRAY",
        },
        {
          imageURL: `${IMAGES_PATH}/women/long-sleeve-tshirt/long-sleeve-tshirt--gray-02.jpg`,
          color: "GRAY",
        },
        {
          imageURL: `${IMAGES_PATH}/women/long-sleeve-tshirt/long-sleeve-tshirt--beige-01.jpg`,
          color: "BEIGE",
        },
        {
          imageURL: `${IMAGES_PATH}/women/long-sleeve-tshirt/long-sleeve-tshirt--beige-02.jpg`,
          color: "BEIGE",
        },
      ],
    },
  },
};

export default product;
