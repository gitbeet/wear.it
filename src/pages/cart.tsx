import React from "react";
import BagItem from "~/components/Cart/BagItem";
import { useShoppingBagContext } from "~/context/shoppingBagContext";

const Cart = () => {
  const { shoppingBag } = useShoppingBagContext();
  return (
    <section className="mx-auto max-w-[1200px] pt-24">
      {shoppingBag.length < 1 ? (
        <h1>Your bag is empty.</h1>
      ) : (
        <section className="grid grid-cols-[2.5fr,1fr] gap-16">
          <div className="w-full ">
            <p className="text-2xl font-semibold text-gray-800">Bag</p>
            <div className="h-8"></div>
            <div className="">
              {shoppingBag.map((item, i) => (
                <BagItem key={item.id} {...item} index={i} />
              ))}
            </div>
          </div>
          <div>test</div>
        </section>
      )}
    </section>
  );
};

export default Cart;
