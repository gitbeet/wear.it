import Link from "next/link";
import React from "react";
import CartItem from "~/components/Cart/CartItem";
import Button from "~/components/UI/Button";
import BagItemSkeleton from "~/components/skeletons/BagItemSkeleton";
import SummarySkeleton from "~/components/skeletons/SummarySkeleton";
import { useCartContext } from "~/context/cartContext";
import { formatCurrency } from "~/utilities/formatCurrency";
import { RecentlyViewed } from "./favorites";
import LoadingPage from "~/components/loading";

export const Summary = ({ page = "cart" }: { page?: "cart" | "checkout" }) => {
  const { dbCart, isGettingCart } = useCartContext();
  if (isGettingCart) return <SummarySkeleton />;

  if (!dbCart) return <h1>Something went wrong.Please try again</h1>;
  const subtotal = dbCart.cartItems.reduce((acc, x) => {
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
  const shippingCost = subtotal > 100 ? 0 : 15;
  const taxes = (subtotal + shippingCost) * 0.21;
  const totalCost = subtotal + shippingCost + taxes;
  return (
    <section className="">
      <h2 className="text-2xl font-semibold leading-none">Summary</h2>
      <div className="h-8"></div>
      <table className="w-full ">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td className="py-1.5 text-right font-bold">
              {formatCurrency(subtotal ?? 0)}
            </td>
          </tr>
          <tr>
            <td>Estimated Shipping Cost</td>
            <td className="py-1.5 text-right font-bold">
              {formatCurrency(shippingCost)}
            </td>
          </tr>
          <tr>
            <td>Estimated Tax</td>
            <td className="py-1.5 text-right font-bold">
              {formatCurrency(taxes)}
            </td>
          </tr>
          <tr className="border-t border-slate-300 ">
            <td>Total</td>
            <td className="py-2 text-right font-bold">
              {formatCurrency(totalCost)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="h-8"></div>
    </section>
  );
};

export const CartItems = ({
  page = "cart",
}: {
  page?: "cart" | "checkout";
}) => {
  const { dbCart, isGettingCart } = useCartContext();
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
        {dbCart.cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
    </div>
  );
};

const Cart = () => {
  const { dbCart, isGettingCart } = useCartContext();

  const emptyCartContent = (
    <div className="flex flex-col items-center ">
      <div className="h-4"></div>
      <p>Your bag is currently empty.</p>
      <div className="h-8"></div>
      <Link href="/">
        <Button text="Continue shopping" onClick={() => void 0} width="FIT" />
      </Link>
    </div>
  );

  const cartContent = (
    <>
      <div className="padding-x mx-auto grid max-w-[1400px] gap-16 pt-16 md:pt-24 lg:grid-cols-[2fr,1fr]">
        <CartItems />
        <div>
          <Summary />
          <Link href="/checkout">
            <Button text="Buy now" onClick={() => void 0} />
          </Link>
        </div>
      </div>
    </>
  );

  const noDataContent = (
    <>
      <div className="h-12"></div>
      <h1 className="text-lg">Something went wrong.Please refresh the page</h1>
    </>
  );

  return (
    <section>
      <div className="h-16"></div>
      <h1 className="text-center font-display text-5xl font-black text-slate-800">
        Bag
      </h1>
      {isGettingCart ? (
        <div className="relative py-24">
          <LoadingPage />
        </div>
      ) : !dbCart ? (
        noDataContent
      ) : dbCart.cartItems.length < 1 ? (
        emptyCartContent
      ) : (
        cartContent
      )}
      <RecentlyViewed />
      <div className="h-48"></div>
    </section>
  );
};

export default Cart;
