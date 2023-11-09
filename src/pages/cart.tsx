import React from "react";
import BagItem from "~/components/Cart/BagItem";
import Button from "~/components/UI/Button";
import LoadingPage from "~/components/loading";
import { useShoppingBagContext } from "~/context/shoppingBagContext";
import { formatCurrency } from "~/utilities/formatCurrency";

const Cart = () => {
  const { cart, isGettingCart } = useShoppingBagContext();
  if (isGettingCart) return <LoadingPage />;
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
      <section className="grid grid-cols-[2.5fr,1fr] gap-16 pt-32">
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
        <div>
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
              <tr className="border-t border-gray-300 ">
                <td>Total</td>
                <td className="py-2 text-right font-bold">
                  {formatCurrency(totalCost)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="h-8 border-b border-gray-300"></div>
          <Button text="Checkout" onClick={() => void 0} />
        </div>
      </section>
    </section>
  );
};

export default Cart;
