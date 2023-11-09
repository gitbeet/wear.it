import Link from "next/link";
import { BsHandbag } from "react-icons/bs";
import { api } from "~/utils/api";
const ShoppingBagIcon = () => {
  const { data, isLoading } = api.cart.getItemsCount.useQuery();
  const totalCount = data?.cartItems.reduce((acc, x) => acc + x.quantity, 0);
  return (
    <>
      <Link href="/cart">
        <div
          role="button"
          className="relative  rounded-full bg-transparent  p-2.5 hover:bg-gray-300"
        >
          <BsHandbag className="h-5  w-5" />

          {!isLoading && (
            <div className="absolute left-1 top-6 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white">
              <p className="text-xs">{totalCount}</p>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default ShoppingBagIcon;
