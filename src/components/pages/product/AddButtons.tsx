import type { ProductColor, ProductSize } from "@prisma/client";
import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { BsHandbag, BsHeart, BsHeartFill } from "react-icons/bs";
import Button from "~/components/ui/Button";
import { useCartContext } from "~/context/cartContext";
import { useFavoritesContext } from "~/context/favoritesContext";
import { useModalsContext } from "~/context/modalsContext";
import { api } from "~/utils/api";

const AddButtons = ({
  selectedColor,
  selectedSize,
  productId,
  setError,
  color,
}: {
  selectedColor: ProductColor | null;
  selectedSize: ProductSize | null;
  productId: string;
  color: string;
  setError: Dispatch<SetStateAction<boolean>>;
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const ctx = api.useUtils();
  const { setShowBagModal } = useModalsContext();
  const { dbCart, isGettingCart, isFetching } = useCartContext();
  const { isFavorited } = useFavoritesContext();

  const { mutate, isLoading: isAddingToCart } = api.cart.addItem.useMutation({
    onSuccess: () => {
      void ctx.invalidate();
      setShowBagModal({ show: true, type: "cart" });
    },
  });

  const { mutate: addToFavorites, isLoading: isFaving } =
    api.favorite.favorite.useMutation({
      onSuccess: () => {
        void ctx.invalidate();
        const isItemFavorited = isFavorited(color as ProductColor, productId);
        if (isItemFavorited) return;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShowBagModal({ show: true, type: "favorite" });
      },
    });

  const isAlreadyInCart =
    dbCart?.cartItems.findIndex(
      (item) =>
        item.product.id === productId &&
        item.color === selectedColor &&
        item.size === selectedSize,
    ) !== -1;
  const handleAddToBag = () => {
    if (!selectedColor) return;
    if (!selectedSize) {
      setError(true);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    mutate({
      color: selectedColor,
      size: selectedSize,
      productId,
      quantity: 1,
      // type: "INCREMENT",
    });
  };

  const isItemFavorited = isFavorited(selectedColor, productId);
  const favoriteButtonText = isItemFavorited
    ? "Added to Wishlist"
    : "Add to Wishlist";
  const favoriteButtonIcon = isItemFavorited ? <BsHeartFill /> : <BsHeart />;

  const handleAddToFavorites = () => {
    if (!selectedColor) return;

    addToFavorites({
      color: selectedColor,
      productId,
    });
  };

  if (!hasMounted) return null;

  return (
    <>
      <div className="relative flex flex-col gap-4">
        {isAlreadyInCart && (
          <p
            id="reason-add-button-disabled"
            className="text-right text-red-500"
          >
            Product is already in bag
          </p>
        )}
        <Button
          aria-describedby="reason-add-button-disabled"
          text="Add to Bag"
          icon={<BsHandbag />}
          onClick={handleAddToBag}
          disabled={
            isAddingToCart ||
            isFaving ||
            isAlreadyInCart ||
            isGettingCart ||
            isFetching
          }
        />
        <Button
          text={favoriteButtonText}
          icon={favoriteButtonIcon}
          onClick={handleAddToFavorites}
          disabled={isFaving || isAddingToCart || isGettingCart || isFetching}
          ghost
        />
      </div>
    </>
  );
};

export default AddButtons;
