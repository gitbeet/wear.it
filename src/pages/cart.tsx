import React from "react";
import BagItem from "~/components/Cart/BagItem";
import Button from "~/components/UI/Button";
import { useShoppingBagContext } from "~/context/shoppingBagContext";
import { formatCurrency } from "~/utilities/formatCurrency";

const Cart = () => {
  const { shoppingBag } = useShoppingBagContext();
  const subtotal = shoppingBag.reduce((acc, x) => {
    const calculatedPrice = x.discount?.discountPercent
      ? x.price - (x.price * x.discount?.discountPercent) / 100
      : x.price;
    return acc + calculatedPrice;
  }, 0);
  const shippingCost = subtotal > 100 ? 0 : 15;
  const taxes = (subtotal + shippingCost) * 0.21;
  const totalCost = subtotal + shippingCost + taxes;
  return (
    <section className="mx-auto max-w-[1200px] pt-24">
      {shoppingBag.length < 1 ? (
        <h1>Your bag is empty.</h1>
      ) : (
        <section className="grid grid-cols-[2.5fr,1fr] gap-16">
          <div className="w-full ">
            <h2 className="text-2xl font-semibold">Bag</h2>
            <div className="h-8"></div>
            <div className="">
              {shoppingBag.map((item, i) => (
                <BagItem key={item.id} {...item} index={i} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold ">Summary</h2>
            <div className="h-8"></div>
            <table className="w-full ">
              <tr>
                <td>Subtotal</td>
                <td className="py-1.5 text-right font-bold">
                  {formatCurrency(subtotal)}
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
            </table>
            <div className="h-8 border-b border-gray-300"></div>
            <Button text="Checkout" onClick={() => void 0} />
          </div>
        </section>
      )}
    </section>
  );
};

export default Cart;
