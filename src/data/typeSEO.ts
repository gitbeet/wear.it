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
    metaOGImage:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    type: "WOMEN",
    metaTitle: "All Women's Products",
    metaDescription:
      "Explore our collection of women's clothing, featuring stylish apparel for every occasion. Discover the latest trends in women's fashion with high-quality clothing and accessories.",
    metaKeywords:
      "women's clothing, women's fashion, women's apparel, women's shirts, women's jeans, women's accessories, women's style, women's shoes",
    metaOGImage:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    type: "KIDS",
    metaTitle: "All wear.it Kids' Products",
    metaDescription:
      "Explore our collection of kids' clothing, featuring stylish apparel for every occasion. Discover the latest trends in  kids' fashion with high-quality clothing and accessories.",
    metaKeywords:
      "kids' clothing, kids' fashion, kids' apparel, kids' shirts, kids' jeans, kids' accessories, kids' style, kids' shoes",
    metaOGImage:
      "https://images.unsplash.com/photo-1627859774205-83c1279a6382?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
