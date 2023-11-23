import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useState, useEffect } from "react";
import { type RouterOutputs, api } from "~/utils/api";
import { ProductColor, ProductSize } from "@prisma/client";
import { useCookies } from "react-cookie";
import { createId } from "@paralleldrive/cuid2";

const cartContext = createContext<CartContextType | null>(null);

export const useCartContext = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("No Shopping Bag context found.");
  }
  return context;
};

export type CartType = RouterOutputs["cart"]["getByUserId"] | undefined;
type CartItemProductType =
  RouterOutputs["cart"]["getByUserId"]["cartItems"][number]["product"];

type CartItemType = {
  product: CartItemProductType;
  color: ProductColor;
  size: ProductSize;
  quantity: number;
};

type CartContextType = {
  dbCart: CartType;
  isGettingCart: boolean;
  isFetching: boolean;
  totalCount: number;
  cookies: {
    "session-id"?: string;
  };
};

const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["session-id"]);

  const { isSignedIn } = useUser();
  const [totalCount, setTotalCount] = useState(0);
  const ctx = api.useUtils();
  const {
    data: dbCart,
    isLoading: isGettingCart,
    isFetching,
    refetch,
  } = api.cart.getByUserId.useQuery();

  useEffect(() => {
    const totalCount = dbCart?.cartItems.reduce(
      (acc, x) => acc + x.quantity,
      0,
    );
    setTotalCount(totalCount ?? 0);
    if (!dbCart) return;
  }, [dbCart]);

  useEffect(() => {
    void refetch();
  }, [isSignedIn]);

  useEffect(() => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    !isSignedIn &&
      !cookies["session-id"] &&
      setCookie("session-id", createId(), {
        secure: true,
        expires: expirationDate,
      });
  }, [isSignedIn, setCookie, removeCookie, cookies]);

  return (
    <cartContext.Provider
      value={{ dbCart, isGettingCart, totalCount, isFetching, cookies }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
