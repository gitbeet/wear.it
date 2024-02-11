import type {
  ColorDetails,
  ProductCategory,
  ProductImage,
  SizeDetails,
} from "@prisma/client";
import ProductCard from "./Product/ProductCard";
import { type RouterOutputs } from "~/utils/api";

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
  };
  // discountpercent: number | null;
};

interface Props {
  products: SQLProductType[];
}

const Products = ({ products }: Props) => {
  return (
    <div className="grid w-full grow content-start gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
