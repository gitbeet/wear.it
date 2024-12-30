import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFavoritesContext } from "~/context/favoritesContext";
import type { SQLProductType } from "~/types";
import ProductCardFavoriteButton from "./ProductCardFavoriteButton";
import ProductCardPrices from "./ProductCardPrices";
import ProductCardText from "./ProductCardText";
import ProductCardImage from "./ProductCardImage";
console.log("first");
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
  const priceBeforeDiscount = product.price;
  const priceAfterDiscount = product.discount?.discountPercent
    ? product.price - (product.price * product.discount.discountPercent) / 100
    : product.price;

  const currentImageColor = product.images.find(
    (image) => image.id === currentImage,
  )?.color;

  const productLink = `/product/${product.id}/${product.images.find(
    (image) => image.id === currentImage,
  )?.color}`;

  /* 
  - rendering 2 images to prevent the flickering of conditionally rendering 2 different image elements based on showColorVariations
  - bottom image is non interactive 
  - top image is a link to the product page 
  - the top image becomes visible upon clicking/tapping the card
  */

  const mainImage = (
    <ProductCardImage
      fill
      className="absolute inset-0 z-[0]"
      src={
        product.images.find((image) => image.id === currentImage)?.imageURL ??
        product.images[0]?.imageURL ??
        ""
      }
      alt="Product image"
    />
  );

  const mainImageLink = (
    <Link
      className={` ${
        showColorVariations ? "opacity-100" : "pointer-events-none opacity-0"
      } absolute inset-0 z-[1]`}
      onClick={onClick}
      href={productLink}
    >
      <ProductCardImage
        fill
        src={
          product.images.find((image) => image.id === currentImage)?.imageURL ??
          product.images[0]?.imageURL ??
          ""
        }
        alt="Product image"
      />
    </Link>
  );

  const thumbnails = (
    <div className="relative min-h-[4rem] w-full self-start overflow-hidden pl-1 @xs:pl-1.5">
      <div
        className={`${
          showColorVariations ? "opacity-100" : "-translate-y-full opacity-0"
        } absolute  flex w-full items-start gap-2 self-start transition-[opacity,transform] duration-[250ms]`}
      >
        {product.colors.map((color, i) => {
          const image = product.images.find(
            (image) => image.color === color.color,
          );
          const isCurrenttlyDisplayed = currentImage === image?.id;
          return (
            <Link
              key={i}
              onFocus={() => setCurrentImage(image?.id)}
              onMouseOver={() => setCurrentImage(image?.id)}
              href={`/product/${product.id}/${color.color}`}
            >
              <Image
                className={`border ${
                  isCurrenttlyDisplayed
                    ? "border-indigo-200"
                    : "border-transparent"
                } h-10 w-10 cursor-pointer bg-slate-100 shadow-sm @2xs:h-[56px] @2xs:w-[56px] `}
                width={56}
                height={56}
                src={image?.imageURL ?? ""}
                alt={`${color.color} variation`}
              />
            </Link>
          );
        })}
      </div>
      <div
        className={`${
          !showColorVariations ? "opacity-100" : "translate-y-full opacity-0"
        } t absolute  min-h-[4rem]  w-full overflow-hidden  transition-[transform,opacity] duration-[250ms]`}
      >
        <ProductCardText name={product.name} category={product.category.name} />
      </div>
    </div>
  );

  return (
    <article
      onClick={() => setShowColorVariations(true)}
      onFocus={() => setShowColorVariations(true)}
      onBlur={() => setShowColorVariations(false)}
      onMouseOver={() => setShowColorVariations(true)}
      onMouseLeave={() => setShowColorVariations(false)}
      className="@container"
    >
      <div className="group flex flex-col items-center justify-center">
        <div className="relative aspect-square w-full">
          <ProductCardFavoriteButton
            interactive={false}
            favorited={
              !!currentImageColor && isFavorited(currentImageColor, product.id)
            }
            type="normal"
          />
          {mainImageLink}
          {mainImage}
          <ProductCardPrices
            price={priceBeforeDiscount}
            discount={
              product.discount?.discountPercent
                ? {
                    discountPercent: product.discount?.discountPercent,
                    priceAfterDiscount,
                  }
                : undefined
            }
          />
        </div>
        <div className="h-4"></div>
        {thumbnails}
      </div>
    </article>
  );
};

export default ProductCard;
