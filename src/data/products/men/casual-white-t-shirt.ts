import { v4 as uuid } from "uuid";
import { type ProductType } from "../../products";
import { IMAGES_PATH } from "~/constants";

const product: ProductType = {
  name: "Casual white T-shirt",
  description: "This is the coolest t-shirt ever",
  types: ["MEN"],
  price: 150,
  colors: {
    connect: { color: "WHITE" },
  },
  sizes: {
    connect: [1, 2, 3, 4, 5].map((id) => ({ id })),
  },
  SKU: uuid(),
  category: {
    connect: {
      id: 22,
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
          imageURL: `${IMAGES_PATH}/white-t-shirt/white-t-shirt.jpg`,
          color: "WHITE",
        },
      ],
    },
  },
};

export default product;
