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
      <div className="flex max-w-[900px]  gap-2 pt-32">
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
            <div key={id}>
              <div className={`bg-gray-50 pb-2 text-gray-800`}>
                <div>
                  <div className="relative">
                    <div
                      onClick={() => addToFavorites({ color, productId })}
                      role="button"
                      className="absolute bottom-4 right-4 z-10 flex h-10 w-10  items-center justify-center rounded-full bg-gray-50"
                    >
                      {isItemFavorited ? (
                        <BsHeartFill className="h-6 w-6" />
                      ) : (
                        <BsHeart className="h-6 w-6" />
                      )}
                    </div>
                    <Link href={`/product/${productId}/${color}`}>
                      <Image
                        className="relative rounded-md bg-slate-200"
                        width={400}
                        height={400}
                        src={
                          product.images.find((image) => image.color === color)
                            ?.imageURL ?? ""
                        }
                        alt="Product image"
                      />
                    </Link>
                    {product.discount ? (
                      <div className="absolute bottom-2 left-4 text-gray-900">
                        <p className="font-display w-fit rounded-sm bg-teal-500 px-1 font-bold text-white">
                          -{product.discount.discountPercent}%
                        </p>
                        <div className=" flex gap-2 ">
                          <p className="font-display py-1 text-gray-500 line-through">
                            {priceBeforeDiscount}
                          </p>
                          <p className="font-display w-fit bg-gray-50 px-3 py-1 font-bold text-pink-500">
                            {priceAfterDiscount}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="font-display absolute bottom-2 left-4 w-fit bg-gray-50 px-3 py-1 font-bold">
                        {priceBeforeDiscount}
                      </p>
                    )}
                  </div>
                  <div className="h-4"></div>
                  <div className="min-h-[4rem] overflow-hidden pl-4">
                    <Link href={`/product/${productId}/${color}`}>
                      <p className="font-semibold">{product.name}</p>
                    </Link>
                    <div className="h-1"></div>
                    <Link
                      href={`products/${product.category.types[0]?.toLowerCase()}/${
                        product.category.slug
                      }`}
                    >
                      <p className="text-gray-500">{product.category.name}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Favorites;
