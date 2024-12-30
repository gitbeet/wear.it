import ProductCardFavoriteButton from "../product/ProductCard/ProductCardFavoriteButton";
import ProductCardPrice from "../product/ProductCard/ProductCardPrice";

const FavoriteItemSkeleton = () => (
  <article className="w-full animate-pulse @container">
    <div className="relative w-full">
      <ProductCardFavoriteButton
        type="skeleton"
        favorited={false}
        interactive={false}
      />
      <div className="relative aspect-square w-full bg-slate-200">
        <div className="absolute bottom-4 left-4">
          <ProductCardPrice type="skeleton" amount={0} />
        </div>
      </div>
    </div>
    <div className="h-4"></div>
    <div className="min-h-[4rem] overflow-hidden pl-4  text-sm @2xs:text-base">
      <div className="h-3 w-1/2 rounded-full bg-slate-300" />
      <div className="h-1"></div>

      <div className="h-3 w-1/3 rounded-full bg-slate-300" />
    </div>
  </article>
);

export default FavoriteItemSkeleton;
