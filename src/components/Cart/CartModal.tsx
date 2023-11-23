import Button from "../UI/Button";
import { IoMdClose } from "react-icons/io";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useModalsContext } from "~/context/modalsContext";
import { useRouter } from "next/router";
import { useCartContext } from "~/context/cartContext";
import CartItem from "./CartItem";
const CartModal = () => {
  const router = useRouter();
  const { showBagModal, setShowBagModal } = useModalsContext();
  const { dbCart, totalCount, isFetching } = useCartContext();
  const cartItem = dbCart?.cartItems[dbCart.cartItems.length - 1];
  return (
    <>
      {showBagModal && cartItem && !isFetching && (
        <div className="absolute right-8 z-30  min-w-[450px]  bg-slate-50 px-8 pb-8 pt-4 shadow-lg">
          <div className="flex w-full justify-between">
            <p className="flex items-center gap-1 font-semibold">
              <BsFillCheckCircleFill className="text-teal-500" />

              <span className="text-sm">Added to bag</span>
            </p>
            <IoMdClose
              onClick={() => setShowBagModal(false)}
              role="button"
              className="relative  h-5 w-5"
            />
          </div>
          <CartItem modal cartItem={cartItem} />
          <div className="flex gap-2 ">
            <Button
              text={`View Bag (${totalCount})`}
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
        onClick={() => setShowBagModal(false)}
        className={`${
          showBagModal
            ? "bg-slate-900/40 backdrop-blur "
            : "pointer-events-none opacity-0"
        }  fixed inset-0 z-20  min-h-screen transition-all duration-300 `}
      ></div>
    </>
  );
};

export default CartModal;
