import { useShoppingBagContext } from "~/context/shoppingBagContext";
import Button from "../UI/Button";
import BagItem from "./BagItem";
import { LoadingSpinner } from "../loading";
import { IoMdClose } from "react-icons/io";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useModalsContext } from "~/context/modalsContext";
import { useRouter } from "next/router";
const ShoppingBagModal = () => {
  const router = useRouter();
  const { showBagModal, setShowBagModal } = useModalsContext();
  const { shoppingBag } = useShoppingBagContext();
  const numberOfItems = shoppingBag.length;
  //   Get the last product in the cart
  const product = shoppingBag[shoppingBag.length - 1];
  if (shoppingBag.length < 1) return <p>your bag is empty</p>;
  if (!product) return <LoadingSpinner />;
  return (
    <>
      {showBagModal && (
        <div className="absolute right-8 z-30  min-w-[450px]  bg-gray-50 px-8 pb-8 pt-4">
          <div className="flex w-full justify-between">
            <p className="flex items-center gap-1 font-semibold">
              <BsFillCheckCircleFill className="text-teal-500" />

              <span className="text-sm">Added bag</span>
            </p>
            <IoMdClose
              onClick={() => setShowBagModal(false)}
              role="button"
              className="relative  h-5 w-5"
            />
          </div>
          <BagItem modal {...product} index={1} />
          <div className="flex gap-2 ">
            <Button
              text={`View Bag (${numberOfItems})`}
              onClick={async () => {
                setShowBagModal(false);
                await router.push("/cart");
              }}
              ghost
            />
            <Button text="Checkout" onClick={() => void 0} />
          </div>
        </div>
      )}
      <div
        className={`${
          showBagModal ? "bg-gray-900/40 backdrop-blur" : "opacity-0"
        } pointer-events-none fixed inset-0 z-20  min-h-screen transition-all duration-500 `}
      ></div>
    </>
  );
};

export default ShoppingBagModal;
