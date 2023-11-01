import Image from "next/image";
import { type RouterOutputs } from "~/utils/api";

type Product = RouterOutputs["product"]["getAll"][number];

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="">
      <p>{product.name}</p>

      <Image
        className="bg-slate-100"
        width={500}
        height={500}
        src={product.images[0] ? product.images[0].imageURL : ""}
        alt="Product image"
      />
      <p>{product.price}</p>
    </div>
  );
};

export default ProductCard;
