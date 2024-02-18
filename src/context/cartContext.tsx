import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useState, useEffect } from "react";
import { type RouterOutputs, api } from "~/utils/api";
import { useCookies } from "react-cookie";
import { createId } from "@paralleldrive/cuid2";
import { formatNumber } from "~/utilities/formatNumber";

const cartContext = createContext<CartContextType | null>(null);
export const useCartContext = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("No Shopping Bag context found.");
  }
  return context;
};

export type CartType = RouterOutputs["cart"]["getByUserId"] | undefined;

type CartContextType = {
  dbCart: CartType;
  isGettingCart: boolean;
  isFetching: boolean;
  totalCount: number;
  cookies: {
    "session-id"?: string;
  };
  costs: {
    subtotal: number | undefined;
    shippingCost: number;
    taxes: number | undefined;
    totalCost: number | undefined;
  };
};

const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [cookies, setCookie] = useCookies(["session-id"]);
  const { isSignedIn } = useUser();
  const [totalCount, setTotalCount] = useState(0);
  const {
    data: dbCart,
    isLoading: isGettingCart,
    isFetching,
    refetch,
  } = api.cart.getByUserId.useQuery(undefined, {});

  useEffect(() => {
    const totalCount = dbCart?.cartItems.reduce(
      (acc, x) => acc + x.quantity,
      0,
    );
    setTotalCount(totalCount ?? 0);
    if (!dbCart) return;
  }, [dbCart]);

  useEffect(() => {
    // Refetch cart on user change
    void refetch();

    // Handle cookie
    const expirationDate = new Date();
    const guestUserId = createId();
    expirationDate.setDate(expirationDate.getDate() + 30);
    if (!isSignedIn && !cookies["session-id"]) {
      setCookie("session-id", guestUserId, {
        expires: expirationDate,
        path: "/",
      });
    }

    return () => void 0;
  }, [isSignedIn]);

  const subtotal = dbCart?.cartItems.reduce((acc, x) => {
    const { discount, price } = x.product;
    // check if discount available and active
    const discounted = discount?.discountPercent && discount.active;
    // price without discount
    let calculatedPrice = price * x.quantity;
    if (discounted) {
      // apply discount if exists
      calculatedPrice =
        (price - (price * discount?.discountPercent) / 100) * x.quantity;
    }

    return acc + calculatedPrice;
  }, 0);

  const shippingCost = formatNumber(subtotal && subtotal > 100 ? 0 : 15);
  const taxes = formatNumber(subtotal && (subtotal + shippingCost) * 0.21);
  const totalCost = formatNumber(
    subtotal && taxes && subtotal + shippingCost + taxes,
  );

  const costs = { subtotal, shippingCost, taxes, totalCost };

  return (
    <cartContext.Provider
      value={{ dbCart, isGettingCart, totalCount, isFetching, cookies, costs }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
