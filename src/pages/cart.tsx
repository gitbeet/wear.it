import { useUser } from "@clerk/nextjs";
import React from "react";
import BagItem from "~/components/Cart/BagItem";
import Button from "~/components/UI/Button";
import LoadingPage from "~/components/loading";
import { useShoppingBagContext } from "~/context/shoppingBagContext";
import { formatCurrency } from "~/utilities/formatCurrency";
import { api } from "~/utils/api";

const Cart = () => {
  const ctx = api.useUtils();
  const {
    data,
    isLoading: isGettingCart,
    isError,
    error,
  } = api.cart.getByUserId.useQuery();
  const { mutate, isLoading: isDeleting } = api.cart.removeItem.useMutation({
    onSuccess: () => {
      void ctx.invalidate();
    },
  });

  const { mutate: add, isLoading: isAdding } = api.cart.addItem.useMutation({
    onSuccess: () => {
      void ctx.invalidate();
    },
  });
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
  if (isGettingCart) return <LoadingPage />;
  console.log(data?.cartItems);
  return (
    <section>
      <section className="grid grid-cols-[2.5fr,1fr] gap-16 pt-32">
        <div className="w-full ">
          <h2 className="text-2xl font-semibold">Bag</h2>
          <div className="h-8"></div>
          {data?.cartItems && data.cartItems.length < 1 && (
            <p>Your bag is empty</p>
          )}
          <div>
            {data?.cartItems?.map((item, i) => (
              <BagItem key={item.id} {...item} index={i} />
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
