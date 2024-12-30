import type { ProductColor, ProductSize } from "@prisma/client";
import CartItem from "~/components/Cart/CartItem";
import BagItemSkeleton from "../Skeletons/BagItemSkeleton";
import { type CartItemType, useCartContext } from "~/context/cartContext";
import { useFavoritesContext } from "~/context/favoritesContext";
import type { CartItemPage } from "~/types";
import { formatCurrency } from "~/utilities/formatCurrency";

export const CartItems = ({
  page = "cart",
  isLoading,
  addToFavorites,
  remove,
  modify,
}: {
  page?: "cart" | "checkout";
  isLoading: boolean;
  addToFavorites: ({
    color,
    productId,
  }: {
    color: ProductColor;
    productId: string;
  }) => void;
  remove: ({ id }: { id: string }) => void;
  modify: ({
    id,
    size,
    quantity,
  }: {
    id: string;
    size?: ProductSize;
    quantity?: number;
  }) => void;
}) => {
  const { dbCart, isGettingCart } = useCartContext();
  const { isFavorited } = useFavoritesContext();

  const handleAddToFavorites = (
    id: string,
    productId: string,
    color: ProductColor,
    favorited: boolean,
  ) => {
    if (favorited) {
      addToFavorites({ color, productId });
    }
    if (!favorited) {
      addToFavorites({ color, productId });
      remove({ id });
    }
  };

  const getCartItem = (item: CartItemType): CartItemPage => {
    const { id, product, color, quantity, size } = item;
    const {
      id: productId,
      category,
      colors,
      discount,
      images,
      name,
      price,
      sizes: productSizes,
    } = product;
    const image = images.find((image) => image.color === color)?.imageURL ?? "";
    const sizes = productSizes.map((s) => s.size);
    const isItemFavorited = isFavorited(color, productId);
    const priceAfterDiscount =
      discount?.discountPercent && discount.active
        ? price - (price * discount?.discountPercent) / 100
        : price;
    const cartItem: CartItemPage = {
      id,
      productId,
      name,
      category: category.name,
      color,
      image,
      size,
      quantity,
      sizes,
      colors: colors.map((c) => c.color),
      isFavorited: isItemFavorited,
      ...(discount?.active
        ? {
            discount: discount.discountPercent,
            priceBeforeDiscount: formatCurrency(price),
            price: formatCurrency(priceAfterDiscount),
          }
        : { price: formatCurrency(price) }),
      onChangeSize: (e) =>
        modify({
          id,
          size: e.target.value as ProductSize,
        }),
      onChangeQuantity: (e) =>
        modify({
          id,
          quantity: parseInt(e.target.value),
        }),
      onAddToFavorites: () =>
        handleAddToFavorites(id, productId, color, isItemFavorited),
      onRemoveFromCart: () => remove({ id }),
    };
    return cartItem;
  };

  if (isGettingCart)
    return (
      <div className="w-full">
        <h2 className="w-fit rounded-full bg-slate-400 text-2xl leading-none text-transparent">
          Bag
        </h2>
        <div className="h-8"></div>
        {[...Array(3).keys()].map((item) => (
          <BagItemSkeleton key={item} />
        ))}
      </div>
    );
  if (!dbCart) return <h1>Something went wrong.Please try again</h1>;
  return (
    <div className="w-full ">
      {dbCart.cartItems.length < 1 && <p>Your bag is empty</p>}
      <div>
        <h2 className="w-fit rounded-full  text-2xl font-bold leading-none text-slate-800">
          {page === "cart" ? "Bag" : "Your order"}
        </h2>
        <div className="h-8"></div>
        {dbCart.cartItems.map((item) => {
          const cartItem = getCartItem(item);
          return (
            <CartItem
              key={item.id}
              cartItem={cartItem}
              type="cartPage"
              isLoading={isLoading}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CartItems;
