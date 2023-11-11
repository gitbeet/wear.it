import { type Prisma } from "@prisma/client";
import { v4 as uuid } from "uuid";

type ProductType = Prisma.ProductCreateInput;

export const winterHat: ProductType = {
  name: "Cozy Patterned Woolen Winter Hat",
  description:
    "Stay warm and stylish this winter with our Cozy Patterned Woolen Winter Hat! Crafted with comfort and fashion in mind, this hat is the perfect accessory to keep you snug during the chilly months.",
  types: ["MEN"],
  price: 79,
  // colors: ["RED", "BLUE", "BLACK"],
  colors: {
    connect: [3, 5, 2].map((id) => ({ id })),
  },
  // sizes: ["S", "M", "L"],
  sizes: {
    connect: [2, 3, 4].map((id) => ({ id })),
  },
  SKU: uuid(),
  collection: {
    connect: {
      id: 1,
    },
  },
  discount: {
    connect: {
      id: 1,
    },
  },
  category: {
    connect: {
      id: 42,
    },
  },
  inventory: {
    create: {
      quantity: 200,
    },
  },
  images: {
    createMany: {
      data: [
        {
          imageURL: "/assets/product-images/cozy-woolen-winter-hat--red.png",
          color: "RED",
        },
        {
          imageURL: "/assets/product-images/cozy-woolen-winter-hat--red--2.png",
          color: "RED",
        },
        {
          imageURL: "/assets/product-images/cozy-woolen-winter-hat--red--3.png",
          color: "RED",
        },
        {
          imageURL: "/assets/product-images/cozy-woolen-winter-hat--blue.png",
          color: "BLUE",
        },
        {
          imageURL:
            "/assets/product-images/cozy-woolen-winter-hat--blue--2.png",
          color: "BLUE",
        },
        {
          imageURL: "/assets/product-images/cozy-woolen-winter-hat--black.png",
          color: "BLACK",
        },
      ],
    },
  },
};

export const products: ProductType[] = [
  {
    name: "Cozy Patterned Woolen Winter Hat",
    description:
      "Stay warm and stylish this winter with our Cozy Patterned Woolen Winter Hat! Crafted with comfort and fashion in mind, this hat is the perfect accessory to keep you snug during the chilly months.",
    types: ["MEN"],
    price: 79,
    // colors: ["RED", "BLUE", "BLACK"],
    colors: {
      connect: [3, 5, 2].map((id) => ({ id })),
    },
    // sizes: ["S", "M", "L"],
    sizes: {
      connect: [2, 3, 4].map((id) => ({ id })),
    },
    SKU: uuid(),
    collection: {
      connect: {
        id: 1,
      },
    },
    discount: {
      connect: {
        id: 1,
      },
    },
    category: {
      connect: {
        id: 42,
      },
    },
    inventory: {
      create: {
        quantity: 200,
      },
    },
    images: {
      createMany: {
        data: [
          {
            imageURL: "/assets/product-images/cozy-woolen-winter-hat--red.png",
            color: "RED",
          },
          {
            imageURL:
              "/assets/product-images/cozy-woolen-winter-hat--red--2.png",
            color: "RED",
          },
          {
            imageURL:
              "/assets/product-images/cozy-woolen-winter-hat--red--3.png",
            color: "RED",
          },
          {
            imageURL: "/assets/product-images/cozy-woolen-winter-hat--blue.png",
            color: "BLUE",
          },
          {
            imageURL:
              "/assets/product-images/cozy-woolen-winter-hat--blue--2.png",
            color: "BLUE",
          },
          {
            imageURL:
              "/assets/product-images/cozy-woolen-winter-hat--black.png",
            color: "BLACK",
          },
        ],
      },
    },
  },
  {
    name: "Leggings",
    description: "Coolest leggings ever!",
    types: ["WOMEN"],
    price: 96,
    // colors: ["PURPLE"],
    colors: {
      connect: [1].map((id) => ({ id })),
    },
    // sizes: ["S", "M", "L","XL"],
    sizes: {
      connect: [2, 3, 4, 5].map((id) => ({ id })),
    },
    SKU: uuid(),
    discount: {
      connect: {
        id: 1,
      },
    },
    category: {
      connect: {
        id: 36,
      },
    },
    inventory: {
      create: {
        quantity: 150,
      },
    },
    images: {
      createMany: {
        data: [
          {
            imageURL: "/assets/product-images/purple-leggings.png",
            color: "PURPLE",
          },
        ],
      },
    },
  },
  {
    name: "Casual white T-shirt",
    description: "This is the coolest t-shirt ever",
    types: ["MEN"],
    price: 150,
    // colors: ["WHITE"],
    colors: {
      connect: [6].map((id) => ({ id })),
    },
    // sizes: ["S", "M", "L","XL"],
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
            imageURL: "/assets/product-images/white-tShirt.png",
            color: "WHITE",
          },
        ],
      },
    },
  },
];
