import { ColorDetails, ProductImage, SizeDetails } from "@prisma/client";

export type SQLProductType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  SKU: string;
  price: number;
  description: string;
  categoryId: number;
  types: string[];
  inventoryId: string;
  collectionId: number | null;
  discountId: number | null;
  discountedprice?: number;
  colors: ColorDetails[];
  images: ProductImage[];
  sizes: SizeDetails[];
  category: { name: string; slug: string };
  discount: {
    discountPercent: number | null;
    active: boolean | null;
  } | null;
};
