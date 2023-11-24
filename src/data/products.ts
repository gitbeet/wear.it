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
    colors: {
      connect: [1].map((id) => ({ id })),
    },
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
    colors: {
      connect: [6].map((id) => ({ id })),
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
            imageURL: "/assets/product-images/white-tShirt.png",
            color: "WHITE",
          },
        ],
      },
    },
  },
  {
    name: "Womens oversized pullover hoodie",
    description:
      "Embrace comfort and style with our Oversized Pullover Hoodie for women. Crafted with a soft and durable cotton blend, this heather gray hoodie offers a relaxed, chic look. Perfect for a cozy day out or lounging at home.",

    types: ["WOMEN"],
    price: 49.99,
    colors: {
      connect: [5, 10].map((id) => ({ id })),
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
            imageURL:
              "/assets/product-images/women's-oversized-pullover-hoodie/women's-oversized-pullover-hoodie-blue-01.jpg",
            color: "BLUE",
          },
          {
            imageURL:
              "/assets/product-images/women's-oversized-pullover-hoodie/women's-oversized-pullover-hoodie-blue-02.jpg",
            color: "BLUE",
          },
          {
            imageURL:
              "/assets/product-images/women's-oversized-pullover-hoodie/women's-oversized-pullover-hoodie-blue-03.jpg",
            color: "BLUE",
          },
          {
            imageURL:
              "/assets/product-images/women's-oversized-pullover-hoodie/women's-oversized-pullover-hoodie-yellow-01.jpg",
            color: "YELLOW",
          },
          {
            imageURL:
              "/assets/product-images/women's-oversized-pullover-hoodie/women's-oversized-pullover-hoodie-yellow-02.jpg",
            color: "YELLOW",
          },
          {
            imageURL:
              "/assets/product-images/women's-oversized-pullover-hoodie/women's-oversized-pullover-hoodie-yellow-03.jpg",
            color: "YELLOW",
          },
        ],
      },
    },
  },
  {
    name: "Womens oversized sweatshirt",
    description:
      "Unwind in comfort and style with our  Oversized Sweatshirt for women. Made from a cozy fleece blend, this navy blue sweatshirt offers a loose, relaxed fit perfect for casual outings or lounging at home. Elevate your comfort game with this must-have piece.",
    types: ["WOMEN"],
    price: 34.99,
    colors: {
      connect: [9, 11, 12].map((id) => ({ id })),
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
            imageURL:
              "/assets/product-images/women's-oversized-sweatshirt/women's-oversized-sweatshirt-beige-01.jpg",
            color: "BEIGE",
          },
          {
            imageURL:
              "/assets/product-images/women's-oversized-sweatshirt/women's-oversized-sweatshirt-beige-02.jpg",
            color: "BEIGE",
          },
          {
            imageURL:
              "/assets/product-images/women's-oversized-sweatshirt/women's-oversized-sweatshirt-beige-03.jpg",
            color: "BEIGE",
          },
          {
            imageURL:
              "/assets/product-images/women's-oversized-sweatshirt/women's-oversized-sweatshirt-pink-01.jpg",
            color: "PINK",
          },
          {
            imageURL:
              "/assets/product-images/women's-oversized-sweatshirt/women's-oversized-sweatshirt-pink-02.jpg",
            color: "PINK",
          },
          {
            imageURL:
              "/assets/product-images/women's-oversized-sweatshirt/women's-oversized-sweatshirt-pink-03.jpg",
            color: "PINK",
          },
          {
            imageURL:
              "/assets/product-images/women's-oversized-sweatshirt/women's-oversized-sweatshirt-gray-01.jpg",
            color: "GRAY",
          },
          {
            imageURL:
              "/assets/product-images/women's-oversized-sweatshirt/women's-oversized-sweatshirt-gray-02.jpg",
            color: "GRAY",
          },
          {
            imageURL:
              "/assets/product-images/women's-oversized-sweatshirt/women's-oversized-sweatshirt-gray-03.jpg",
            color: "GRAY",
          },
        ],
      },
    },
  },
  {
    name: "Winter Mens Hoodie with Thick Fleece Lining",
    description:
      "The Winter Men's Hoodie with Thick Fleece Lining is the ultimate combination of style and warmth. Crafted to withstand chilly temperatures, this hoodie is designed for comfort without compromising on fashion. Its exterior boasts a classic hoodie style, while the interior is lined with plush, insulating fleece, providing an extra layer of coziness. The thick fleece lining extends to the hood, ensuring maximum protection against the cold. With a relaxed fit and a variety of color options, it's the perfect choice for both casual outings and outdoor adventures during the winter season. Whether you're lounging at home or braving the elements, this hoodie offers both insulation and style.",
    types: ["MEN"],
    price: 119.99,
    colors: {
      connect: [2].map((id) => ({ id })),
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
            imageURL:
              "/assets/product-images/men's-fit-jacket-with-hat/men's-fit-jacket-with-hat-black-01.jpg",
            color: "BLACK",
          },
          {
            imageURL:
              "/assets/product-images/men's-fit-jacket-with-hat/men's-fit-jacket-with-hat-black-02.jpg",
            color: "BLACK",
          },
          {
            imageURL:
              "/assets/product-images/men's-fit-jacket-with-hat/men's-fit-jacket-with-hat-black-03.jpg",
            color: "BLACK",
          },
        ],
      },
    },
  },
];
