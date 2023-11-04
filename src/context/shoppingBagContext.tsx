import type { ProductColor, ProductSize } from "@prisma/client";
import { createContext, useContext, useState } from "react";

const shopingBagContext = createContext<BagContextType | null>(null);

export const useShoppingBagContext = () => {
  const context = useContext(shopingBagContext);
  if (!context) {
    throw new Error("No Shopping Bag context found.");
  }
  return context;
};

type ShoppingBagProduct = {
  id: string;
  quantity: number;
  color: ProductColor;
  size: ProductSize;
};

type BagContextType = {
  shoppingBag: ShoppingBagProduct[];
  addToBag: (data: ShoppingBagProduct) => void;
};

const ShoppingBagProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [shoppingBag, setShoppingBag] = useState<ShoppingBagProduct[]>([]);

  const addToBag = (data: ShoppingBagProduct) => {
    const { color, id, quantity, size } = data;
    setShoppingBag((prev) => {
      const itemIndex = prev.findIndex((item) => {
        return item.id === id && item.color === color && item.size === size;
      });
      console.log(itemIndex);
      return itemIndex === -1
        ? [...prev, { id, color, size, quantity }]
        : prev.map((item) =>
            item.id === id && item.color === color && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
    });
    console.log(shoppingBag);
  };

  return (
    <shopingBagContext.Provider value={{ shoppingBag, addToBag }}>
      {children}
    </shopingBagContext.Provider>
  );
};

export default ShoppingBagProvider;
