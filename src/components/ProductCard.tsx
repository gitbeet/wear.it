import Image from "next/image";
import { type RouterOutputs } from "~/utils/api";

type Product = RouterOutputs["product"]["getAll"][number];

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className=" bg-gray-100 pb-2 text-gray-900">
      <Image
        className=" bg-slate-200"
        width={500}
        height={500}
        src={product.images[0] ? product.images[0].imageURL : ""}
        alt="Product image"
      />
      {product.discount ? (
        <div className="relative -top-16 left-4 ">
          <p className="font-bold">-{product.discount.discountPercent}$</p>
          <div className=" flex gap-2 ">
            <p className=" py-1 text-gray-500 line-through">${product.price}</p>
            <p className="w-fit bg-gray-100 px-3 py-1 font-bold text-red-500">
              $
              {product.discount?.discountPercent
                ? product.price -
                  (product.price * product.discount?.discountPercent) / 100
                : product.price}
            </p>
          </div>
        </div>
      ) : (
        <p className="relative -top-11 left-4 w-fit bg-gray-100 px-3 py-1 font-bold">
          ${product.price}
        </p>
      )}

      <div
        className={`relative ${
          product.discount ? "-top-10 left-4" : "-top-4 left-4"
        }`}
      >
        <p>{product.name}</p>
        <div className="h-1"></div>
        <p className="text-gray-500">{product.category.name}</p>
      </div>
    </div>
  );
};

export default ProductCard;
