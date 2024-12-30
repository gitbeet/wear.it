import Button from "../ui/Button";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useModalsContext } from "~/context/modalsContext";
import { useRouter } from "next/router";
import { useCartContext } from "~/context/cartContext";
import CartItem from "./CartItem";
import Backdrop from "../ui/Backdrop";
import FocusTrap from "focus-trap-react";
import CloseButton from "../ui/CloseButton";
import { LoadingSpinner } from "../ui/LoadingElements";
import React, { useEffect, useState } from "react";
import { useFavoritesContext } from "~/context/favoritesContext";
import { formatCurrency } from "~/utilities/formatCurrency";
import type { CartItemModal, FavoriteItemModal, CartItemPage } from "~/types";

const CartModal = () => {
  const router = useRouter();
  const [addedItem, setAddedItem] = useState<
    CartItemModal | FavoriteItemModal | CartItemPage | null
  >(null);
  const { showBagModal, setShowBagModal } = useModalsContext();
  const {
    dbCart,
    totalCount,
    isFetching: isFetchingCart,
    isGettingCart,
  } = useCartContext();
  const {
    favorites,
    isGettingFavorites,
    isFetching: isFetchingFavorites,
  } = useFavoritesContext();
  const handleCloseBagModal = () =>
    setShowBagModal({ type: null, show: false });

  const handleSetAddedCartItem = () => {
    const cartItem = dbCart?.cartItems[dbCart.cartItems.length - 1];
    if (!cartItem) return;

    const priceAfterDiscount =
      cartItem.product.discount?.discountPercent &&
      cartItem.product.discount.active
        ? cartItem.product.price -
          (cartItem.product.price *
            cartItem.product.discount?.discountPercent) /
            100
        : cartItem.product.price;

    const image =
      cartItem.product.images.find((image) => image.color === cartItem.color)
        ?.imageURL ?? "";

    const addedItem: CartItemModal = {
      id: cartItem.id,
      name: cartItem.product.name,
      color: cartItem.color,
      productId: cartItem.product.id,
      category: cartItem.product.category.name,
      image,
      size: cartItem.size,
      price: formatCurrency(priceAfterDiscount),
      ...(cartItem.product.discount?.active && {
        discount: cartItem.product.discount.discountPercent,
        priceBeforeDiscount: formatCurrency(cartItem.product.price),
      }),
    };
    return setAddedItem(addedItem);
  };

  const handleSetAddedFavoriteItem = () => {
    if (!favorites) return;
    const favoriteItem = favorites[favorites?.length - 1];
    if (!favoriteItem) return;

    const priceAfterDiscount =
      favoriteItem.product.discount?.discountPercent &&
      favoriteItem.product.discount.active
        ? favoriteItem.product.price -
          (favoriteItem.product.price *
            favoriteItem.product.discount?.discountPercent) /
            100
        : favoriteItem.product.price;

    const image =
      favoriteItem.product.images.find(
        (image) => image.color === favoriteItem.color,
      )?.imageURL ?? "";

    const addedItem: FavoriteItemModal = {
      id: favoriteItem.id,
      name: favoriteItem.product.name,
      color: favoriteItem.color,
      productId: favoriteItem.productId,
      category: favoriteItem.product.category.name,
      image,
      price: formatCurrency(priceAfterDiscount),
      ...(favoriteItem.product.discount?.active && {
        discount: favoriteItem.product.discount.discountPercent,
        priceBeforeDiscount: formatCurrency(favoriteItem.product.price),
      }),
    };
    return setAddedItem(addedItem);
  };

  const isLoading =
    isGettingCart ||
    isFetchingCart ||
    isGettingFavorites ||
    isFetchingFavorites;

  useEffect(() => {
    if (!showBagModal.show) return;
    if (showBagModal.type === "cart") {
      handleSetAddedCartItem();
      return;
    }
    if (showBagModal.type === "favorite") {
      handleSetAddedFavoriteItem();
      return;
    }
  }, [isLoading]);

  return (
    <>
      {showBagModal.show && (
        <FocusTrap active={showBagModal.show}>
          <article className="absolute z-30 w-full  rounded-b-sm  bg-slate-50 px-8 pb-8 pt-4 shadow-lg md:right-8 md:w-[450px]">
            <div className="flex w-full justify-between">
              <p className="flex items-center gap-1 font-semibold">
                <BsFillCheckCircleFill className="text-teal-500" />
                <span className="text-sm">
                  Added to {showBagModal.type === "cart" ? "bag" : "wishlist"}
                </span>
              </p>
              <div className="h-10">
                <CloseButton
                  onClick={() => setShowBagModal({ type: null, show: false })}
                />
              </div>
            </div>
            {isLoading && (
              <div className="grid h-full w-full place-content-center p-12">
                <LoadingSpinner size={32} />
              </div>
            )}
            {!isLoading && !addedItem && (
              <div className="grid h-full w-full place-content-center p-12">
                Something went wrong.
              </div>
            )}
            {!isLoading && addedItem && (
              <>
                {showBagModal.type === "cart" && (
                  <CartItem
                    type="cartModal"
                    cartItem={addedItem as CartItemModal}
                    isLoading={isLoading}
                  />
                )}
                {showBagModal.type === "favorite" && (
                  <CartItem
                    type="wishlistModal"
                    cartItem={addedItem as FavoriteItemModal}
                    isLoading={isLoading}
                  />
                )}
              </>
            )}
            {showBagModal.type === "cart" && (
              <div className="flex gap-2 ">
                <Button
                  disabled={isLoading || !addedItem}
                  text={`View Bag (${totalCount})`}
                  onClick={async () => {
                    handleCloseBagModal();
                    await router.push("/cart");
                  }}
                  ghost
                />
                <Button
                  disabled={isLoading || !addedItem}
                  text="Checkout"
                  onClick={async () => {
                    handleCloseBagModal();
                    await router.push("/checkout");
                  }}
                />
              </div>
            )}
            {showBagModal.type === "favorite" && (
              <Button
                disabled={isLoading || !addedItem}
                text="Go to wishlist"
                onClick={async () => {
                  handleCloseBagModal();
                  await router.push("/favorites");
                }}
              />
            )}
          </article>
        </FocusTrap>
      )}
      <Backdrop
        show={showBagModal.show}
        zIndex={40}
        onClose={handleCloseBagModal}
      />
    </>
  );
};

export default CartModal;
