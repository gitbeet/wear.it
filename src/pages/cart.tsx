import React from "react";
import BagItem from "~/components/Cart/BagItem";
import { useShoppingBagContext } from "~/context/shoppingBagContext";

const Cart = () => {
  const { shoppingBag } = useShoppingBagContext();
  return (
    <section>
      {shoppingBag.length < 1 ? (
        <h1>Your bag is empty.</h1>
      ) : (
        <div>
          {shoppingBag.map((item) => (
            <BagItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Cart;
