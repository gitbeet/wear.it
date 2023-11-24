import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useFavoritesContext } from "~/context/favoritesContext";
import { formatCurrency } from "~/utilities/formatCurrency";
import { type RouterOutputs } from "~/utils/api";

type Product = RouterOutputs["product"]["getAll"]["products"][number];

const ProductCard = ({ product }: { product: Product }) => {
  const { isFavorited } = useFavoritesContext();

  const [showColorVariations, setShowColorVariations] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.images[0]?.id);
  const priceBeforeDiscount = formatCurrency(product.price);
  const priceAfterDiscount = formatCurrency(
    product.discount?.discountPercent
      ? product.price -
          (product.price * product.discount?.discountPercent) / 100
      : product.price,
  );
  const currentImageColor = product.images.find(
    (image) => image.id === currentImage,
  )?.color;

  const image = (
    <Image
      fill
      className="relative rounded-lg border border-transparent bg-slate-100 transition-[border] duration-100 group-hover:border-indigo-100 group-hover:shadow-sm"
      src={
        product.images.find((image) => image.id === currentImage)?.imageURL ??
        ""
      }
      alt="Product image"
    />
  );

  const favoriteButton = (
    <div
      role="button"
      className={`border ${
        currentImageColor && isFavorited(currentImageColor, product.id)
          ? "border-indigo-100"
          : "border-transparent"
      } absolute bottom-4 right-4 z-10 flex h-10 w-10  items-center justify-center rounded-full bg-slate-50 pt-1`}
    >
      {currentImageColor && isFavorited(currentImageColor, product.id) && (
        <BsHeartFill className="h-6 w-6 text-indigo-400" />
      )}
      {currentImageColor && !isFavorited(currentImageColor, product.id) && (
        <BsHeart className="h-6 w-6 text-slate-600" />
      )}
    </div>
  );

  const thumbnails = (
    <div
      className={
        showColorVariations
          ? " flex items-center gap-2 self-start pt-2"
          : "hidden"
      }
    >
      {product.colors.map((color, i) => {
        const image = product.images.find(
          (image) => image.color === color.color,
        );
        return (
          <Image
            onMouseOver={() => setCurrentImage(image?.id)}
            className="bg-slate-200"
            width={56}
            height={56}
            key={i}
            src={image?.imageURL ?? ""}
            alt={`${color.color} variation`}
          />
        );
      })}
    </div>
  );

  const prices = product.discount ? (
    <div className="absolute bottom-2 left-4 text-slate-900 transition-transform duration-300 group-hover:-translate-y-1.5">
      <p className="w-fit rounded-sm bg-teal-500 px-1 font-display font-bold text-white">
        -{product.discount.discountPercent}%
      </p>
      <div className="h-1.5"></div>
      <div className=" flex gap-2 ">
        <p className="bg-slate-50 px-3  py-1 font-display  text-slate-500 line-through">
          {priceBeforeDiscount}
        </p>
        <p className="w-fit bg-slate-50 px-3 py-1 font-display font-bold text-pink-500">
          {priceAfterDiscount}
        </p>
      </div>
    </div>
  ) : (
    <p className="absolute bottom-2 left-4 w-fit bg-slate-50 px-3 py-1 font-display font-bold transition-transform duration-300 group-hover:-translate-y-1.5">
      {priceBeforeDiscount}
    </p>
  );

  const nameAndCategory = !showColorVariations && (
    <div className="min-h-[4rem] self-start overflow-hidden pl-4 ">
      <p className="line-clamp-1 font-semibold">{product.name}</p>
      <div className="h-1"></div>
      <p className="text-slate-500">{product.category.name}</p>
    </div>
  );

  return (
    <Link
      href={`/product/${product.id}/${product.images.find(
        (image) => image.id === currentImage,
      )?.color}`}
      className={`group flex flex-col items-center justify-center  rounded-sm bg-slate-50 p-1 text-slate-800`}
      onMouseOver={() => setShowColorVariations(true)}
      onMouseLeave={() => setShowColorVariations(false)}
    >
      <div className="relative aspect-square w-full ">
        {favoriteButton}
        {image}
        {prices}
      </div>
      {thumbnails}
      <div className="h-4"></div>
      {nameAndCategory}
    </Link>
  );
};

export default ProductCard;
