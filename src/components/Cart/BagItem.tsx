import type { ProductColor, ProductSize } from "@prisma/client";
import { BsTrash } from "react-icons/bs";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../loading";

interface Props {
  id: string;
  quantity: number;
  size: ProductSize;
  color: ProductColor;
}

const BagItem = ({ id, color, quantity, size }: Props) => {
  const { data: productData, isLoading: isGettingProductData } =
    api.product.getSingleProduct.useQuery({ id });
  if (isGettingProductData) return <LoadingSpinner />;
  if (!productData) return <h1>Something went wrong.</h1>;
  return (
    <div>
      <div>{size}</div>
      <div>{color}</div>
      <div className="flex gap-2">
        <div role="button">-</div>
        <p>{quantity}</p>
        <div role="button">+</div>
      </div>
      <BsTrash />
    </div>
  );
};

export default BagItem;
