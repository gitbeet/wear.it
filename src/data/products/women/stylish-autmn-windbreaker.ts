import { v4 as uuid } from "uuid";
import { type ProductType } from "../../products";
import { IMAGES_PATH } from "~/constants";

const product: ProductType = {
  id: "7",
  name: "Stylish autmn windbreaker",
  description:
    "Designed for both fashion and function, this lightweight jacket features a flattering fit, water-resistant fabric, and a sleek design perfect for layering. Whether you’re running errands or enjoying a crisp outdoor stroll, this windbreaker keeps you comfortable and effortlessly stylish.",
  types: ["WOMEN"],
  price: 129.99,
  colors: {
    connect: { color: "YELLOW" },
  },
  sizes: {
    connect: [1, 2, 3, 4, 5].map((id) => ({ id })),
  },
  SKU: uuid(),
  discount: {
    connect: {
      id: 1,
    },
  },
  category: {
    connect: {
      id: 29,
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
          imageURL: `${IMAGES_PATH}/women/stylish-autmn-windbreaker/stylish-autmn-windbreaker-01.jpg`,
          color: "YELLOW",
        },
        {
          imageURL: `${IMAGES_PATH}/women/stylish-autmn-windbreaker/stylish-autmn-windbreaker-02.jpg`,
          color: "YELLOW",
        },
        {
          imageURL: `${IMAGES_PATH}/women/stylish-autmn-windbreaker/stylish-autmn-windbreaker-03.jpg`,
          color: "YELLOW",
        },
        {
          imageURL: `${IMAGES_PATH}/women/stylish-autmn-windbreaker/stylish-autmn-windbreaker-04.jpg`,
          color: "YELLOW",
        },
      ],
    },
  },
};

export default product;
