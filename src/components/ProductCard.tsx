import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatCurrency } from "~/utilities/formatCurrency";
import { type RouterOutputs } from "~/utils/api";

type Product = RouterOutputs["product"]["getAll"][number];

const ProductCard = ({ product }: { product: Product }) => {
  const [showColorVariations, setShowColorVariations] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const priceBeforeDiscount = formatCurrency(product.price);
  const priceAfterDiscount = formatCurrency(
    product.discount?.discountPercent
      ? product.price -
          (product.price * product.discount?.discountPercent) / 100
      : product.price,
  );
  return (
    <div className=" bg-gray-100 pb-2 text-gray-900">
      <div
        onMouseOver={() => setShowColorVariations(true)}
        onMouseLeave={() => setShowColorVariations(false)}
      >
        <div className="relative">
          <Image
            className=" relative bg-slate-200"
            width={500}
            height={500}
            src={product.images[currentImage]?.imageURL ?? ""}
            alt="Product image"
          />
          {product.discount ? (
            <div className="absolute bottom-2 left-4 ">
              <p className="font-bold">-{product.discount.discountPercent}%</p>
              <div className=" flex gap-2 ">
                <p className=" py-1 text-gray-500 line-through">
                  {priceBeforeDiscount}
                </p>
                <p className="w-fit bg-gray-100 px-3 py-1 font-bold text-red-500">
                  {priceAfterDiscount}
                </p>
              </div>
            </div>
          ) : (
            <p className="absoltute -bottom-11 left-4 w-fit bg-gray-100 px-3 py-1 font-bold">
              {priceBeforeDiscount}
            </p>
          )}
        </div>

        <div
          className={
            showColorVariations ? " flex items-center gap-2 py-2" : "hidden"
          }
        >
          {product.colors.map((color, i) => (
            <Image
              onMouseOver={() => setCurrentImage(i)}
              className="bg-slate-200"
              width={48}
              height={48}
              key={i}
              src={
                product.images.find((image) => image.color === color)
                  ?.imageURL ?? ""
              }
              alt={`${color} variation`}
            />
          ))}
        </div>
      </div>

      <div className="h-4"></div>
      <div className="pl-4">
        <Link href={`/product/${product.id}`}>
          <p>{product.name}</p>
        </Link>
        <div className="h-1"></div>
        <Link
          href={`/products/${product.types[0]?.toLowerCase()}/${
            product.category.slug
          }`}
        >
          <p className="text-gray-500">{product.category.name}</p>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
