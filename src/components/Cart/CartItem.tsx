import { BsHeart, BsHeartFill, BsTrash } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import type { CartItemModal, CartItemPage, FavoriteItemModal } from "~/types";
import CartItemDetail from "./CartItemDetail";
import CartItemSelectElement from "./CartItemSelectElement";
import CartItemButton from "./CartItemButton";

type CartItemModalProps = {
  cartItem: CartItemModal;
  type: "cartModal";
  isLoading: boolean;
};

type FavoriteItemModalProps = {
  cartItem: FavoriteItemModal;
  type: "wishlistModal";
  isLoading: boolean;
};

type CartItemPageProps = {
  cartItem: CartItemPage;
  type: "cartPage";
  isLoading: boolean;
};

type Props = CartItemModalProps | FavoriteItemModalProps | CartItemPageProps;

const CartItem = ({ cartItem, type, isLoading }: Props) => {
  const {
    productId,
    name,
    category,
    color,
    image,
    price,
    discount,
    priceBeforeDiscount,
  } = cartItem;
  const modal = type === "cartModal" || type === "wishlistModal";

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
          src={image}
          alt="Product thumbnail"
          className="absolute"
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
              <p className="text-slate-600">{category}</p>
            </div>
            {!modal && <p className="font-bold">{price}</p>}
          </div>
          <div className="h-2"></div>
          <CartItemDetail text="Color">
            <span className="text-slate-500">{color}</span>
          </CartItemDetail>
          <div className="h-2"></div>
        </div>
        {/* BOTTOM */}
        <div>
          {/* SIZE & QTY */}
          {type === "cartModal" && (
            <CartItemDetail text="Size">
              <span className="text-slate-500">{cartItem.size}</span>
            </CartItemDetail>
          )}
          {modal &&
            (discount ? (
              <p>
                <span className="font-bold">{price}</span>{" "}
                <span className="pl-2 text-slate-500 line-through">
                  {priceBeforeDiscount}
                </span>
              </p>
            ) : (
              <p className="font-bold">{price}</p>
            ))}

          {type === "cartPage" && (
            <>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-12">
                <CartItemDetail text="Sizes">
                  <CartItemSelectElement
                    disabled={isLoading}
                    onChange={cartItem.onChangeSize}
                    value={cartItem.size}
                    options={cartItem.sizes.map((s) => ({
                      label: s,
                      value: s,
                    }))}
                  />
                </CartItemDetail>
                <CartItemDetail text="Quantity">
                  <CartItemSelectElement
                    disabled={isLoading}
                    onChange={cartItem.onChangeQuantity}
                    value={cartItem.quantity}
                    options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => ({
                      label: s.toString(),
                      value: s,
                    }))}
                  />
                </CartItemDetail>
              </div>
              <div className="h-4"></div>
            </>
          )}
          {/* BTNS */}
          {type === "cartPage" && (
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
              <CartItemButton
                aria-label={
                  cartItem.isFavorited
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"
                }
                text={
                  cartItem.isFavorited
                    ? "Already in Wishlist"
                    : "Add to Wishlist"
                }
                icon={cartItem.isFavorited ? <BsHeartFill /> : <BsHeart />}
                disabled={isLoading}
                onClick={cartItem.onAddToFavorites}
              />
              <CartItemButton
                aria-label="Remove from Bag"
                text="Remove"
                icon={<BsTrash />}
                disabled={isLoading}
                onClick={cartItem.onRemoveFromCart}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
