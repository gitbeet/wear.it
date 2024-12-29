import type {
  ColorDetails,
  ProductColor,
  ProductImage,
  ProductSize,
  SizeDetails,
} from "@prisma/client";
import { type RouterOutputs } from "./utils/api";

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

export type FavoriteType = RouterOutputs["favorite"]["getByUserId"][number];

// FOR MODAL/CART ITEMS

export type BaseItem = {
  id: string;
  productId: string;
  name: string;
  category: string;
  color: ProductColor;
  image: string;
  price: string;
  discount?: number;
  priceBeforeDiscount?: string;
};

export type CartItemModal = BaseItem & {
  size: ProductSize;
};

export type FavoriteItemModal = BaseItem;

export type CartItemPage = BaseItem & {
  size: ProductSize;
  quantity: number;
  sizes: ProductSize[];
  colors: ProductColor[];
  isFavorited: boolean;
  onChangeQuantity: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onAddToFavorites: () => void;
  onRemoveFromCart: () => void;
};
