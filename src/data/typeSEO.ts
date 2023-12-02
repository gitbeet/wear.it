import { type Prisma } from "@prisma/client";

type TypeSEOType = Prisma.TypeSEOCreateManyInput;
export const typeSEOdata: TypeSEOType[] = [
  {
    id: 1,
    type: "MEN",
    metaTitle: "All Men's Products",
    metaDescription:
      "Explore our collection of men's clothing, featuring stylish apparel for every occasion. Discover the latest trends in men's fashion with high-quality clothing and accessories.",
    metaKeywords:
      "men's clothing, men's fashion, men's apparel, men's shirts, men's jeans, men's accessories, men's style, men's shoes",
  },
  {
    id: 2,
    type: "WOMEN",
    metaTitle: "All Women's Products",
    metaDescription:
      "Explore our collection of women's clothing, featuring stylish apparel for every occasion. Discover the latest trends in women's fashion with high-quality clothing and accessories.",
    metaKeywords:
      "women's clothing, women's fashion, women's apparel, women's shirts, women's jeans, women's accessories, women's style, women's shoes",
  },
  {
    id: 3,
    type: "KIDS",
    metaTitle: "All wear.it Kids' Products",
    metaDescription:
      "Explore our collection of kids' clothing, featuring stylish apparel for every occasion. Discover the latest trends in  kids' fashion with high-quality clothing and accessories.",
    metaKeywords:
      "kids' clothing, kids' fashion, kids' apparel, kids' shirts, kids' jeans, kids' accessories, kids' style, kids' shoes",
  },
];
