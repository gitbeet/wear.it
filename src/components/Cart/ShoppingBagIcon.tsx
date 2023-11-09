import { BsHandbag } from "react-icons/bs";
import { api } from "~/utils/api";
import NavIcon from "../NavIcon";
const ShoppingBagIcon = () => {
  const { data, isLoading } = api.cart.getItemsCount.useQuery();
  const totalCount = data?.cartItems.reduce((acc, x) => acc + x.quantity, 0);
  return (
    <NavIcon
      icon={<BsHandbag className="h-5 w-5" />}
      link="/cart"
      loading={isLoading}
      number={totalCount ?? 0}
    />
  );
};

export default ShoppingBagIcon;
