import { createContext, useContext, useState, useEffect } from "react";
import { type RouterOutputs, api } from "~/utils/api";

const shopingBagContext = createContext<BagContextType | null>(null);

export const useShoppingBagContext = () => {
  const context = useContext(shopingBagContext);
  if (!context) {
    throw new Error("No Shopping Bag context found.");
  }
  return context;
};

type BagContextType = {
  cart: RouterOutputs["cart"]["getByUserId"] | undefined;
  isGettingCart: boolean;
  isFetching: boolean;
  totalCount: number;
};

const ShoppingBagProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [totalCount, setTotalCount] = useState(0);
  // const [shoppingBag, setShoppingBag] = useState<ShoppingBagProduct[]>([]);
  const {
    data: cart,
    isLoading: isGettingCart,
    isFetching,
  } = api.cart.getByUserId.useQuery();

  useEffect(() => {
    const totalCount = cart?.cartItems.reduce((acc, x) => acc + x.quantity, 0);
    if (!totalCount) return;
    setTotalCount(totalCount);
  }, [cart]);

  // const addToBag = (data: ShoppingBagProduct) => {
  //   const { color, id, quantity, size, discount, price } = data;
  //   setShoppingBag((prev) => {
  //     const itemIndex = prev.findIndex((item) => {
  //       return item.id === id && item.color === color && item.size === size;
  //     });
  //     console.log(itemIndex);
  //     return itemIndex === -1
  //       ? [...prev, { id, color, size, quantity, discount, price }]
  //       : prev.map((item) =>
  //           item.id === id && item.color === color && item.size === size
  //             ? { ...item, quantity: item.quantity + 1 }
  //             : item,
  //         );
  //   });
  //   console.log(shoppingBag);
  // };

  // const modifyBagItem = (index: number, data: ShoppingBagProduct) => {
  //   setShoppingBag((prev) =>
  //     prev.map((item, i) => (i === index ? data : item)),
  //   );
  // };

  // const removeFromBag = (index: number) => {
  //   setShoppingBag((prev) => prev.filter((_, i) => i !== index));
  // };

  return (
    <shopingBagContext.Provider
      value={{ cart, isGettingCart, totalCount, isFetching }}
    >
      {children}
    </shopingBagContext.Provider>
  );
};

export default ShoppingBagProvider;
