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
    metaOGImage:
      "https://images.unsplash.com/photo-1544880665-a2caf58243bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    categoryId: 1,
    type: "WOMEN",
    metaTitle: "Women's Shoes",
    metaDescription:
      "Step into style with wear.it's exclusive collection of women's shoes. Explore the latest fashion trends in women's footwear, from elegant heels to casual sneakers and boots.",
    metaKeywords: "women,shoes,sneakers",
    metaOGImage:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=2085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    categoryId: 2,
    type: "MEN",
    metaTitle: "Men's Clothing",
    metaDescription:
      "Discover timeless style and contemporary fashion in our men's clothing collection, featuring a curated selection of premium apparel designed to elevate your wardrobe effortlessly.",
    metaKeywords: "men,clothing,apparel",
    metaOGImage:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    categoryId: 2,
    type: "WOMEN",
    metaTitle: "Women's Clothing",
    metaDescription:
      "Discover timeless style and contemporary fashion in our women's clothing collection, featuring a curated selection of premium apparel designed to elevate your wardrobe effortlessly.",
    metaKeywords: "women,clothing,apparel",
    metaOGImage:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
