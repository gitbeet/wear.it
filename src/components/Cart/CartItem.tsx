import type { ProductSize } from "@prisma/client";
import { BsHeart, BsHeartFill, BsTrash } from "react-icons/bs";
import { type RouterOutputs, api } from "~/utils/api";
import { formatCurrency } from "~/utilities/formatCurrency";
import Image from "next/image";
import { type ChangeEvent } from "react";
import Link from "next/link";
import { useCartContext } from "~/context/cartContext";
import { useFavoritesContext } from "~/context/favoritesContext";

interface Props {
  cartItem: RouterOutputs["cart"]["getByUserId"]["cartItems"][number];
  modal?: boolean;
}

const CartItem = ({ cartItem, modal = false }: Props) => {
  const ctx = api.useUtils();
  const { isFavorited } = useFavoritesContext();
  const { isFetching } = useCartContext();
  const { mutate: addToFavorites, isLoading: isFaving } =
    api.favorite.favorite.useMutation({
      onSuccess: () => {
        void ctx.invalidate();
      },
    });
  const { mutate: modify, isLoading: isModifying } =
    api.cart.modifyItem.useMutation({
      onSuccess: () => {
        void ctx.invalidate();
      },
    });

  const { mutate: remove, isLoading: isRemoving } =
    api.cart.removeItem.useMutation({
      onSuccess: () => {
        void ctx.invalidate();
      },
    });
  const {
    name,
    category,
    sizes,
    discount,
    price,
    images,
    id: productId,
  } = cartItem.product;
  const { color, id, quantity, size } = cartItem;
  const quantityArray = [...Array(10).keys()];
  const priceBeforeDiscount = formatCurrency(price);
  const priceAfterDiscount = formatCurrency(
    (discount?.discountPercent && discount.active
      ? price - (price * discount?.discountPercent) / 100
      : price) * cartItem.quantity,
  );
  const thumbnail = images.find((image) => image.color === color)?.imageURL;
  const isItemFavorited = isFavorited(color, productId);
  return (
    <div
      className={`${
        !modal ? " border-b border-slate-300" : ""
      } flex w-full items-start gap-4 py-6 sm:items-center`}
    >
      <div
        className={`relative ${
          modal ? "sm:w-32" : "sm:w-48"
        } aspect-square w-28`}
      >
        <Image
          fill
          objectFit="contain"
          src={thumbnail ?? ""}
          alt="Product thumbnail"
          className="absolute "
        />
      </div>

      <div className="flex w-full flex-col justify-between">
        {/* TOP */}
        <div>
          <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row">
            <div>
              <Link
                className="font-semibold"
                href={`/product/${productId}/${color}`}
              >
                <p className={`${modal ? "max-w-[320px]" : ""} line-clamp-1`}>
                  {name}
                </p>
              </Link>
              <p className="text-slate-600">{category.name}</p>
            </div>
            {!modal && <p className="font-bold">{priceAfterDiscount}</p>}
          </div>
          <div className="h-2"></div>
          <div className="text-slate-600">
            Color: <span className="text-slate-500">{color}</span>
          </div>
          <div className="h-2"></div>
        </div>
        {/* BOTTOM */}
        <div>
          {/* SIZE & QTY */}
          {modal && (
            <div className="flex gap-2 text-slate-600">
              <p>Size</p>
              <span>{size}</span>
            </div>
          )}
          {modal && (
            <p>
              <span className="font-bold">{priceAfterDiscount}</span>{" "}
              <span className="pl-2 text-slate-500 line-through">
                {priceBeforeDiscount}
              </span>
            </p>
          )}

          {!modal && (
            <>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-12">
                <div className="flex gap-2 text-slate-600">
                  <p>Sizes</p>
                  <select
                    disabled={isFetching || isModifying}
                    className="bg-slate-200 pl-4 disabled:opacity-50"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      modify({
                        id,
                        size: e.target.value as ProductSize,
                      })
                    }
                    value={size}
                  >
                    {sizes.map((s, i) => (
                      <option key={i}>{s.size}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 text-slate-600">
                  <p>Quantity</p>
                  <select
                    disabled={isFetching || isModifying}
                    className="bg-slate-200 pl-4 disabled:opacity-50"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      modify({
                        id,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    value={quantity}
                  >
                    {quantityArray.map((num) => (
                      <option key={num}>{num + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="h-4"></div>
            </>
          )}
          {/* BTNS */}
          {!modal && (
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
              <button
                type="button"
                disabled={isFaving}
                onClick={() => {
                  if (isItemFavorited) {
                    addToFavorites({ color, productId });
                  }
                  if (!isItemFavorited) {
                    addToFavorites({ color, productId });
                    remove({ id });
                  }
                }}
                role="button"
                className="flex items-center gap-2 text-slate-500 transition-colors duration-150 hover:text-slate-800"
              >
                {isItemFavorited ? (
                  <BsHeartFill className="h-5 w-5" />
                ) : (
                  <BsHeart className="h-5 w-5" />
                )}
                <span>
                  {isItemFavorited ? "Added to Wishlist" : "Add to Wishlist"}
                </span>
              </button>

              <button
                type="button"
                disabled={isRemoving}
                onClick={() => remove({ id })}
                className="flex items-center gap-2 text-slate-500 transition-colors duration-150 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <BsTrash className="h-5 w-5" />
                <span className="pl-2">Remove</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
