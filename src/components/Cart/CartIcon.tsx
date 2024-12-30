import { BsHandbag } from "react-icons/bs";
import NavIconWithNumber from "../layout/nav/NavIconWithNumber";
import { useCartContext } from "~/context/cartContext";
const CartIcon = () => {
  const { totalCount, isGettingCart } = useCartContext();
  return (
    <NavIconWithNumber
      aria-label="Go to the shopping cart page"
      as="link"
      icon={<BsHandbag className="h-5 w-5" />}
      href="/cart"
      loading={isGettingCart}
      number={totalCount ?? 0}
      color="bg-teal-500"
    />
  );
};

export default CartIcon;
