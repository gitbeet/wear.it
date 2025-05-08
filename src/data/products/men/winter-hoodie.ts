import { v4 as uuid } from "uuid";
import { type ProductType } from "../../products";
import { IMAGES_PATH } from "~/constants";

const product: ProductType = {
  id: "12",
  name: "Winter Mens Hoodie with Thick Fleece Lining",
  description:
    "The Winter Men's Hoodie with Thick Fleece Lining is the ultimate combination of style and warmth. Crafted to withstand chilly temperatures, this hoodie is designed for comfort without compromising on fashion. Its exterior boasts a classic hoodie style, while the interior is lined with plush, insulating fleece, providing an extra layer of coziness. The thick fleece lining extends to the hood, ensuring maximum protection against the cold. With a relaxed fit and a variety of color options, it's the perfect choice for both casual outings and outdoor adventures during the winter season. Whether you're lounging at home or braving the elements, this hoodie offers both insulation and style.",
  types: ["MEN"],
  price: 119.99,
  colors: {
    connect: { color: "BLACK" },
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
      quantity: 45,
    },
  },
  images: {
    createMany: {
      data: [
        {
          imageURL: `${IMAGES_PATH}/men's-fit-jacket-with-hat/men's-fit-jacket-with-hat-black-01.jpg`,
          color: "BLACK",
        },
        {
          imageURL: `${IMAGES_PATH}/men's-fit-jacket-with-hat/men's-fit-jacket-with-hat-black-02.jpg`,
          color: "BLACK",
        },
        {
          imageURL: `${IMAGES_PATH}/men's-fit-jacket-with-hat/men's-fit-jacket-with-hat-black-03.jpg`,
          color: "BLACK",
        },
      ],
    },
  },
};

export default product;
