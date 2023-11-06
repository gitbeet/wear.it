import ProductCard from "./ProductCard";
import { type RouterOutputs } from "~/utils/api";

type ProductType = RouterOutputs["product"]["getAll"]["products"];

interface Props {
  products: ProductType;
}

const Products = ({ products }: Props) => {
  return (
    <div className="grid w-full grow grid-cols-3 content-start  gap-2  ">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
