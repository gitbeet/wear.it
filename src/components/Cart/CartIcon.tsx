import { BsHandbag } from "react-icons/bs";
import NavIconWithNumber from "../Nav/NavIconWithNumber";
import { useCartContext } from "~/context/cartContext";
const CartIcon = () => {
  const { totalCount, isGettingCart } = useCartContext();
  return (
    <NavIconWithNumber
      as="link"
      icon={<BsHandbag className="h-5 w-5" />}
      href="/cart"
      loading={isGettingCart}
      number={totalCount ?? 0}
      color="bg-teal-400"
    />
  );
};

export default CartIcon;
