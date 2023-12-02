import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { BsHeartFill } from "react-icons/bs";
import ProductCardCarousel from "~/components/ProductCardCarousel";
import Button from "~/components/UI/Button";
import { formatCurrency } from "~/utilities/formatCurrency";
import { type RouterOutputs, api } from "~/utils/api";
import LoadingPage from "~/components/loading";
import { NextSeo } from "next-seo";

type FavoriteType = RouterOutputs["favorite"]["getByUserId"][number];

const FavoriteItem = ({ fav }: { fav: FavoriteType }) => {
  const ctx = api.useUtils();
  const { color, id, product, productId } = fav;
  const { mutate: addToFavorites, isLoading: isFaving } =
    api.favorite.favorite.useMutation({
      onSuccess: () => void ctx.invalidate(),
      onError: (error) => console.log(error),
    });

  const priceBeforeDiscount = formatCurrency(product.price);
  const priceAfterDiscount = formatCurrency(
    product.discount?.discountPercent
      ? product.price -
          (product.price * product.discount?.discountPercent) / 100
      : product.price,
  );
  return (
    <div key={id} className={`pb-200 w-full bg-slate-50`}>
      <div className="relative w-full">
        <div
          onClick={() => addToFavorites({ color, productId })}
          role="button"
          className={`absolute bottom-4  right-4 z-10 flex h-10 w-10 items-center justify-center  rounded-full border border-indigo-100 bg-slate-50`}
        >
          <BsHeartFill className="h-6 w-6  text-indigo-400" />
        </div>
        <Link href={`/product/${productId}/${color}`}>
          <div className="relative aspect-square w-full">
            <Image
              fill
              objectFit="contain"
              className="absolute rounded-md bg-slate-200"
              src={
                product.images.find((image) => image.color === color)
                  ?.imageURL ?? ""
              }
              alt="Product image"
            />
          </div>
        </Link>
        {product.discount ? (
          <div className="absolute bottom-2 left-4 text-slate-900">
            <p className="w-fit rounded-sm bg-violet-500 px-1 font-display font-bold text-white">
              -{product.discount.discountPercent}%
            </p>
            <div className=" flex gap-2 ">
              <p className="py-1 font-display text-slate-500 line-through">
                {priceBeforeDiscount}
              </p>
              <p className="w-fit bg-slate-50 px-3 py-1 font-display font-bold text-pink-500">
                {priceAfterDiscount}
              </p>
            </div>
          </div>
        ) : (
          <p className="absolute bottom-2 left-4 w-fit bg-slate-50 px-3 py-1 font-display font-bold">
            {priceBeforeDiscount}
          </p>
        )}
      </div>
      <div className="h-4"></div>
      <div className="min-h-[4rem] overflow-hidden pl-4">
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
    </div>
  );
};

const FavoritesGrid = () => {
  const { data, isLoading } = api.favorite.getByUserId.useQuery();

  const emptyWishlistContent = (
    <>
      <div className="h-4"></div>
      <p>Your wishlist is currently empty.</p>
      <div className="h-8"></div>
      <Link href="/">
        <Button text="Continue shopping" onClick={() => void 0} width="FIT" />
      </Link>
    </>
  );

  const wishListContent = (
    <>
      <div className="h-12"></div>
      <div className=" grid  max-w-[1400px] grid-cols-[repeat(auto-fill,minmax(250px,1fr))]   items-start justify-start   gap-4">
        {data?.map((fav) => <FavoriteItem key={fav.id} fav={fav} />)}
      </div>
    </>
  );

  const noDataContent = (
    <>
      <div className="h-12"></div>
      <h1 className="text-lg">Something went wrong.Please refresh the page</h1>
    </>
  );

  return (
    <section>
      <div className="flex flex-col items-center">
        <h1 className="font-display text-5xl font-black text-slate-800">
          Wishlist
        </h1>
        {isLoading ? (
          <div className="relative py-24">
            <LoadingPage />
          </div>
        ) : !data ? (
          noDataContent
        ) : data.length < 1 ? (
          emptyWishlistContent
        ) : (
          wishListContent
        )}
      </div>
    </section>
  );
};

export const RecentlyViewed = () => {
  const { isSignedIn } = useUser();
  const { data, isLoading, refetch } = api.history.getByUserId.useQuery();

  useEffect(() => {
    void refetch();
  }, [isSignedIn]);

  return data && data?.items.length > 0 ? (
    <>
      <div className="h-16"></div>
      <div className="padding-x">
        <h2 className="font-display text-2xl font-black">Recently viewed</h2>
        <div className="h-6 md:h-12"></div>
        <ProductCardCarousel
          isLoading={isLoading}
          products={data?.items.map((item) => item.product)}
          numberOfItems={{ tablet: 3, desktopSmall: 4, desktop: 5 }}
        />
      </div>
    </>
  ) : null;
};

const Favorites = () => {
  return (
    <>
      <NextSeo
        title="Contact"
        description="Get in touch with is. Contact our customer support for assistance, inquiries, or collaboration opportunities."
        noindex={false}
        nofollow={false}
        canonical="https://t3-ecommerce-five.vercel.app/contact"
      />
      <section>
        <div className="h-16"></div>
        <FavoritesGrid />
        <RecentlyViewed />
        <div className="h-48"></div>
      </section>
    </>
  );
};

export default Favorites;
