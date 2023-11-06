import Link from "next/link";
import { BsHandbag } from "react-icons/bs";
import { useShoppingBagContext } from "~/context/shoppingBagContext";
const ShoppingBagIcon = () => {
  const { shoppingBag } = useShoppingBagContext();
  return (
    <>
      <Link href="/cart">
        <div role="button" className="relative">
          <BsHandbag className="h-5  w-5" />
          {shoppingBag.length > 0 && (
            <div className="absolute -left-1.5 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white">
              <p className="text-xs">{shoppingBag.length}</p>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default ShoppingBagIcon;
