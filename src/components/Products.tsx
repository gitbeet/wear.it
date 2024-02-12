import ProductCard from "./Product/ProductCard";
import type { SQLProductType } from "~/types";

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
