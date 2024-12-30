import ProductCardFavoriteButton from "../product/product-card/ProductCardFavoriteButton";
import Link from "next/link";
import ProductCardImage from "../product/product-card/ProductCardImage";
import ProductCardPrices from "../product/product-card/ProductCardPrices";
import { type FavoriteType } from "~/types";

const FavoriteItem = ({
  fav,
  onClick,
}: {
  fav: FavoriteType;
  onClick: () => void;
}) => {
  const { color, id, product, productId } = fav;

  const priceBeforeDiscount = product.price;
  const priceAfterDiscount = product.discount?.discountPercent
    ? product.price - (product.price * product.discount?.discountPercent) / 100
    : product.price;

  return (
    <article key={id} className={`@container`}>
      <div className="relative w-full">
        <ProductCardFavoriteButton
          type="normal"
          favorited
          interactive
          onClick={onClick}
        />
        <Link href={`/product/${productId}/${color}`}>
          <div className="relative aspect-square w-full">
            <ProductCardImage
              fill
              className="absolute rounded-md bg-slate-200"
              src={
                product.images.find((image) => image.color === color)
                  ?.imageURL ?? ""
              }
              alt="Product image"
            />
          </div>
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
        </Link>
      </div>
      <div className="h-4"></div>
      <div className="min-h-[4rem] overflow-hidden pl-4  text-sm @2xs:text-base">
        <Link href={`/product/${productId}/${color}`}>
          <p className="line-clamp-1 font-semibold">{product.name}</p>
        </Link>
        <div className="h-1"></div>
        <Link
          href={`products/${product.category.types[0]?.toLowerCase()}/${
            product.category.slug
          }`}
        >
          <p className="text-slate-500">{product.category.name}</p>
        </Link>
      </div>
    </article>
  );
};

export default FavoriteItem;
