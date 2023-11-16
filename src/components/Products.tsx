import ProductCard from "./ProductCard";
import { type RouterOutputs } from "~/utils/api";

type ProductType = RouterOutputs["product"]["getAll"]["products"];

interface Props {
  products: ProductType;
}

const Products = ({ products }: Props) => {
  return (
    <div className="grid w-full grow content-start gap-2 sm:grid-cols-2  lg:grid-cols-3  ">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
