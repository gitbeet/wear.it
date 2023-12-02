import { type Prisma } from "@prisma/client";

type CategorySEOType = Prisma.CategorySEOCreateManyInput;
export const categorySEOData: CategorySEOType[] = [
  {
    id: 1,
    categoryId: 1,
    type: "MEN",
    metaTitle: "Men's Shoes",
    metaDescription:
      "Discover the latest trends in men's shoes. Explore a diverse collection of stylish and comfortable men's footwear, including sneakers, formal shoes, boots, and more.",
    metaKeywords: "men,shoes,sneakers",
  },
  {
    id: 2,
    categoryId: 1,
    type: "WOMEN",
    metaTitle: "Women's Shoes",
    metaDescription:
      "Step into style with wear.it's exclusive collection of women's shoes. Explore the latest fashion trends in women's footwear, from elegant heels to casual sneakers and boots.",
    metaKeywords: "women,shoes,sneakers",
  },
  {
    id: 3,
    categoryId: 2,
    type: "MEN",
    metaTitle: "Men's Clothing",
    metaDescription:
      "Discover timeless style and contemporary fashion in our men's clothing collection, featuring a curated selection of premium apparel designed to elevate your wardrobe effortlessly.",
    metaKeywords: "men,clothing,apparel",
  },
  {
    id: 4,
    categoryId: 2,
    type: "WOMEN",
    metaTitle: "Women's Clothing",
    metaDescription:
      "Discover timeless style and contemporary fashion in our women's clothing collection, featuring a curated selection of premium apparel designed to elevate your wardrobe effortlessly.",
    metaKeywords: "women,clothing,apparel",
  },
];
