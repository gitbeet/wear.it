import { v4 as uuid } from "uuid";
import { type ProductType } from "../../products";
import { IMAGES_PATH } from "~/constants";

const product: ProductType = {
  id: "9",
  name: "Wool hat and scarf",
  description:
    " Crafted from premium, soft wool, this matching set combines timeless style with unbeatable warmth. Perfect for chilly days, it’s the ideal accessory duo to keep you snug and effortlessly chic.",
  types: ["WOMEN"],
  price: 44.99,
  colors: {
    connect: { color: "GRAY" },
  },
  sizes: {
    connect: [2, 3, 4].map((id) => ({ id })),
  },
  SKU: uuid(),
  category: {
    connect: {
      id: 42,
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
          imageURL: `${IMAGES_PATH}/women/wool-hat-and-scarf/wool-hat-and-scarf-01.jpg`,
          color: "GRAY",
        },
        {
          imageURL: `${IMAGES_PATH}/women/wool-hat-and-scarf/wool-hat-and-scarf-02.jpg`,
          color: "GRAY",
        },
        {
          imageURL: `${IMAGES_PATH}/women/wool-hat-and-scarf/wool-hat-and-scarf-03.jpg`,
          color: "GRAY",
        },
      ],
    },
  },
};

export default product;
