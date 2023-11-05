import { useShoppingBagContext } from "~/context/shoppingBagContext";
import Button from "../UI/Button";
import BagItem from "./BagItem";
import { LoadingSpinner } from "../loading";
import { IoMdClose } from "react-icons/io";
import { BsFillCheckCircleFill } from "react-icons/bs";
const ShoppingBagModal = () => {
  const { shoppingBag } = useShoppingBagContext();
  const numberOfItems = shoppingBag.length;
  const prod = shoppingBag[shoppingBag.length - 1];
  if (shoppingBag.length < 1) return <p>your bag is empty</p>;
  if (!prod) return <LoadingSpinner />;
  return (
    <>
      <div className="absolute right-8 z-30  min-w-[450px]  bg-gray-50 px-8 pb-8 pt-4">
        <div className="flex w-full justify-between">
          <p className="flex items-center gap-1 font-semibold">
            <BsFillCheckCircleFill className="text-teal-500" />

            <span className="text-sm">Added bag</span>
          </p>
          <IoMdClose role="button" className="relative  h-5 w-5" />
        </div>
        <BagItem modal {...prod} index={1} />
        <div className="flex gap-2 ">
          <Button
            text={`View Bag (${numberOfItems})`}
            onClick={() => void 0}
            ghost
          />
          <Button text="Checkout" onClick={() => void 0} />
        </div>
      </div>
      <div
        className={`${
          true ? "bg-gray-900/40 backdrop-blur" : "opacity-0"
        } pointer-events-none fixed inset-0 z-20  min-h-screen transition-all duration-500 `}
      ></div>
    </>
  );
};

export default ShoppingBagModal;
