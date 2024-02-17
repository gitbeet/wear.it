import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useFavoritesContext } from "~/context/favoritesContext";
import { formatCurrency } from "~/utilities/formatCurrency";
import type { SQLProductType } from "~/types";

const ProductCard = ({
  product,
  onClick,
}: {
  product: SQLProductType;
  onClick?: () => void;
}) => {
  const { isFavorited } = useFavoritesContext();
  const [showColorVariations, setShowColorVariations] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.images[0]?.id);
  const priceBeforeDiscount = formatCurrency(product.price);
  const priceAfterDiscount = formatCurrency(
    product.discount?.discountPercent
      ? product.price - (product.price * product.discount.discountPercent) / 100
      : product.price,
  );
  const currentImageColor = product.images.find(
    (image) => image.id === currentImage,
  )?.color;

  const productLink = `/product/${product.id}/${product.images.find(
    (image) => image.id === currentImage,
  )?.color}`;

  const image = showColorVariations ? (
    <Link onClick={onClick} href={productLink}>
      <Image
        fill
        className="relative rounded-lg border border-transparent bg-slate-100 transition-[border] duration-100 group-hover:border-slate-200"
        src={
          product.images.find((image) => image.id === currentImage)?.imageURL ??
          ""
        }
        alt="Product image"
      />
    </Link>
  ) : (
    <div>
      <Image
        fill
        className="relative rounded-lg border border-transparent bg-slate-100 transition-[border] duration-100 group-hover:border-slate-200"
        src={
          product.images.find((image) => image.id === currentImage)?.imageURL ??
          ""
        }
        alt="Product image"
      />
    </div>
  );

  const favoriteButton = (
    <div
      role="button"
      className={`border ${
        currentImageColor && isFavorited(currentImageColor, product.id)
          ? "border-indigo-100"
          : "border-transparent"
      } @2xs:h-10 @2xs:w-10 @2xs:p-2 absolute right-[4%] top-[4%] z-10 flex h-8 w-8  items-center justify-center rounded-full bg-slate-50 p-1.5`}
    >
      {currentImageColor && isFavorited(currentImageColor, product.id) && (
        <BsHeartFill className=" text-indigo-400" />
      )}
      {currentImageColor && !isFavorited(currentImageColor, product.id) && (
        <BsHeart className="h-full w-full text-slate-600" />
      )}
    </div>
  );

  const prices = product.discount?.discountPercent ? (
    <div className="absolute bottom-2 left-4 text-slate-900 transition-transform duration-300 group-hover:-translate-y-1.5">
      <p className="w-fit rounded-sm bg-teal-500 px-2 py-1 font-display font-bold text-white">
        -{product.discount?.discountPercent}%
      </p>
      <div className="h-1.5"></div>
      <div className=" flex gap-2 ">
        <p className="rounded-sm bg-slate-50  px-3 py-1  font-display  text-slate-400 line-through">
          {priceBeforeDiscount}
        </p>
        <p className="w-fit rounded-sm bg-slate-50 px-3 py-1 font-display font-bold text-pink-500">
          {priceAfterDiscount}
        </p>
      </div>
    </div>
  ) : (
    <p className="absolute bottom-2 left-4 w-fit bg-slate-50 px-3 py-1 font-display font-bold transition-transform duration-300 group-hover:-translate-y-1.5">
      {priceBeforeDiscount}
    </p>
  );

  const thumbnails = (
    <div className="relative min-h-[4rem] w-full self-start overflow-hidden">
      <div
        className={`${
          showColorVariations ? "opacity-100" : "-translate-y-full opacity-0"
        } absolute  flex w-full items-start gap-2 self-start transition-[opacity,transform] duration-[250ms]`}
      >
        {product.colors.map((color, i) => {
          const image = product.images.find(
            (image) => image.color === color.color,
          );
          return showColorVariations ? (
            <Link key={i} href={productLink}>
              <Image
                onMouseOver={() => setCurrentImage(image?.id)}
                className="@2xs:w-[56px] @2xs:h-[56px] h-10 w-10 cursor-pointer bg-slate-100"
                width={56}
                height={56}
                src={image?.imageURL ?? ""}
                alt={`${color.color} variation`}
              />
            </Link>
          ) : (
            <div key={i}>
              <Image
                onMouseOver={() => setCurrentImage(image?.id)}
                className="@2xs:w-[56px] @2xs:h-[56px] h-10 w-10 cursor-pointer bg-slate-100"
                width={56}
                height={56}
                src={image?.imageURL ?? ""}
                alt={`${color.color} variation`}
              />
            </div>
          );
        })}
      </div>

      <div
        className={`${
          !showColorVariations ? "opacity-100" : "translate-y-full opacity-0"
        } t absolute  min-h-[4rem]  w-full overflow-hidden  transition-[transform,opacity] duration-[250ms]`}
      >
        <p className="line-clamp-1 font-semibold">{product.name}</p>
        <div className="h-1"></div>
        <p className="text-slate-500">{product.category.name}</p>
      </div>
    </div>
  );

  return (
    <article
      onMouseOver={() => setShowColorVariations(true)}
      onMouseLeave={() => setShowColorVariations(false)}
      className="@container"
    >
      <div
        className={` @2xs:text-base group flex flex-col items-center  justify-center rounded-sm bg-slate-50 p-1 text-xs text-slate-800`}
      >
        <div className="relative aspect-square w-full ">
          {favoriteButton}
          {image}
          {prices}
        </div>
        <div className="h-4"></div>
        {thumbnails}
      </div>
    </article>
  );
};

export default ProductCard;
