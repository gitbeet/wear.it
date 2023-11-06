import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { formatCurrency } from "~/utilities/formatCurrency";
import { type RouterOutputs } from "~/utils/api";

type Product = RouterOutputs["product"]["getAll"][number];

const ProductCard = ({
  product,
  slider = false,
}: {
  product: Product;
  slider?: boolean;
}) => {
  const [showColorVariations, setShowColorVariations] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.images[0]?.id);
  const priceBeforeDiscount = formatCurrency(product.price);
  const priceAfterDiscount = formatCurrency(
    product.discount?.discountPercent
      ? product.price -
          (product.price * product.discount?.discountPercent) / 100
      : product.price,
  );
  return (
    <Link
      href={`/product/${product.id}/${product.images.find(
        (image) => image.id === currentImage,
      )?.color}`}
    >
      <div
        className={`${
          slider ? "relative h-[500px] w-[400px] snap-start" : ""
        }  bg-gray-50 pb-2 text-gray-800`}
      >
        <div
          onMouseOver={() => setShowColorVariations(true)}
          onMouseLeave={() => setShowColorVariations(false)}
        >
          <div className="relative">
            <div
              role="button"
              className="absolute bottom-4 right-4 z-10 flex h-10 w-10  items-center justify-center rounded-full bg-gray-50"
            >
              <BsHeart className="h-6 w-6" />
            </div>
            <Image
              className="relative rounded-md bg-slate-200"
              width={800}
              height={800}
              src={
                product.images.find((image) => image.id === currentImage)
                  ?.imageURL ?? ""
              }
              alt="Product image"
            />
            {product.discount ? (
              <div className="absolute bottom-2 left-4 ">
                <p className="font-bold">
                  -{product.discount.discountPercent}%
                </p>
                <div className=" flex gap-2 ">
                  <p className=" py-1 text-gray-500 line-through">
                    {priceBeforeDiscount}
                  </p>
                  <p className="w-fit bg-gray-50 px-3 py-1 font-bold text-red-500">
                    {priceAfterDiscount}
                  </p>
                </div>
              </div>
            ) : (
              <p className="absolute bottom-2 left-4 w-fit bg-gray-50 px-3 py-1 font-bold">
                {priceBeforeDiscount}
              </p>
            )}
          </div>

          <div
            className={
              showColorVariations ? " flex items-center gap-2 pt-2" : "hidden"
            }
          >
            {product.colors.map((color, i) => {
              const image = product.images.find(
                (image) => image.color === color,
              );
              return (
                <Image
                  onMouseOver={() => setCurrentImage(image?.id)}
                  className="bg-slate-200"
                  width={48}
                  height={48}
                  key={i}
                  src={image?.imageURL ?? ""}
                  alt={`${color} variation`}
                />
              );
            })}
          </div>
        </div>

        <div className="h-4"></div>
        {!showColorVariations && (
          <div className="min-h-[4rem] overflow-hidden pl-4">
            <p className="font-semibold">{product.name}</p>
            <div className="h-1"></div>
            <p className="text-gray-500">{product.category.name}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
