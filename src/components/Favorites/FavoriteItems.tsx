import Link from "next/link";
import { api } from "~/utils/api";
import Button from "../UI/Button";
import FavoriteItemSkeleton from "./FavoriteItemSkeleton";
import FavoriteItem from "./FavoriteItem";

const FavoriteItems = () => {
  const ctx = api.useUtils();
  const { data, isLoading: isGettingFavorites } =
    api.favorite.getByUserId.useQuery();
  const { mutate: addToFavorites, isLoading: isAddingToFavorites } =
    api.favorite.favorite.useMutation({
      onSuccess: async () => await ctx.invalidate(),
      onError: (error) => console.log(error),
    });

  const emptyWishlistContent = (
    <>
      <p>Your wishlist is currently empty.</p>
      <div className="h-8"></div>
      <Link href="/">
        <Button text="Continue shopping" onClick={() => void 0} width="FIT" />
      </Link>
    </>
  );

  const isLoading = isGettingFavorites || isAddingToFavorites;

  const numberOfSkeletons =
    data?.length && data?.length < 1
      ? 1
      : data?.length && data.length > 1
      ? data.length - 1
      : 1;

  const loadingContent = (
    <>
      <div className=" grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))]   items-start justify-start gap-4 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {[...Array(numberOfSkeletons).keys()].map((_, i) => (
          <FavoriteItemSkeleton key={i} />
        ))}
      </div>
    </>
  );
  const wishListContent = (
    <>
      <div className=" grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))]   items-start justify-start gap-4 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {data?.map((fav) => (
          <FavoriteItem
            key={fav.id}
            fav={fav}
            onClick={() =>
              addToFavorites({ color: fav.color, productId: fav.productId })
            }
          />
        ))}
      </div>
    </>
  );

  const noDataContent = (
    <>
      <h1 className="text-lg">Something went wrong.Please refresh the page</h1>
    </>
  );

  return (
    <section className="flex flex-col items-center">
      <h1 className="font-display text-5xl font-black text-slate-800">
        Wishlist
      </h1>
      <div className="h-12" />
      {isLoading
        ? loadingContent
        : !data
        ? noDataContent
        : data.length < 1
        ? emptyWishlistContent
        : wishListContent}
    </section>
  );
};

export default FavoriteItems;
