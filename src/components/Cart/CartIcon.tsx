import { BsHandbag } from "react-icons/bs";
import NavIcon from "../NavIcon";
import { useCartContext } from "~/context/cartContext";
const CartIcon = () => {
  const { totalCount, isGettingCart } = useCartContext();
  return (
    <NavIcon
      icon={<BsHandbag className="h-5 w-5" />}
      link="/cart"
      loading={isGettingCart}
      number={totalCount ?? 0}
      color="bg-teal-400"
    />
  );
};

export default CartIcon;
