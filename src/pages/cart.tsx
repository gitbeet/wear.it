import Link from "next/link";
import React from "react";
import BagItem from "~/components/Cart/BagItem";
import Button from "~/components/UI/Button";
import BagItemSkeleton from "~/components/skeletons/BagItemSkeleton";
import SummarySkeleton from "~/components/skeletons/SummarySkeleton";
import { useShoppingBagContext } from "~/context/shoppingBagContext";
import { formatCurrency } from "~/utilities/formatCurrency";

const Summary = () => {
  const { cart, isGettingCart } = useShoppingBagContext();
  if (isGettingCart) return <SummarySkeleton />;

  if (!cart) return <h1>Something went wrong.Please try again</h1>;
  const subtotal = cart.cartItems.reduce((acc, x) => {
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
    <section>
      <h2 className="text-2xl font-semibold ">Summary</h2>
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
      <Button disabled text="Guest Checkout" onClick={() => void 0} />
      <div className="h-4"></div>
      <Link href="/checkout">
        <Button text="Member Checkout" onClick={() => void 0} />
      </Link>
    </section>
  );
};

const CartItems = () => {
  const { cart, isGettingCart } = useShoppingBagContext();
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
  if (!cart) return <h1>Something went wrong.Please try again</h1>;
  return (
    <div className="w-full ">
      <h2 className="text-2xl font-semibold">Bag</h2>
      <div className="h-8"></div>
      {cart.cartItems.length < 1 && <p>Your bag is empty</p>}
      <div>
        {cart.cartItems.map((item) => (
          <BagItem key={item.id} cartItem={item} />
        ))}
      </div>
    </div>
  );
};

const Cart = () => {
  return (
    <section className="padding-x mx-auto grid max-w-[1400px] gap-16 pt-16 md:pt-24 lg:grid-cols-[2fr,1fr]">
      <CartItems />
      <Summary />
      <div className="h-12"></div>
    </section>
  );
};

export default Cart;
