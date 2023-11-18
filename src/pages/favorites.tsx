import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ProductCard from "~/components/ProductCard";
import { useFavoritesContext } from "~/context/favoritesContext";
import { formatCurrency } from "~/utilities/formatCurrency";
import { api } from "~/utils/api";

const Favorites = () => {
  const ctx = api.useUtils();
  const { isFavorited } = useFavoritesContext();
  const { mutate: addToFavorites, isLoading: isFaving } =
    api.favorite.favorite.useMutation({
      onSuccess: () => void ctx.invalidate(),
      onError: (error) => console.log(error),
    });
  const { data, isLoading } = api.favorite.getByUserId.useQuery();
  return (
    <section>
      <div className="h-16"></div>
      <h1 className="text-center font-display text-5xl font-black">Wishlist</h1>
      <div className="h-12"></div>
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(250px,1fr))]  items-start justify-start   gap-4">
        {data?.map((fav) => {
          const { color, id, product, productId } = fav;
          const isItemFavorited = isFavorited(color, productId);

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
        })}
      </div>
    </section>
  );
};

export default Favorites;
