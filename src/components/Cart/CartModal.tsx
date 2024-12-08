import Button from "../UI/Button";
import { IoMdClose } from "react-icons/io";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useModalsContext } from "~/context/modalsContext";
import { useRouter } from "next/router";
import { useCartContext } from "~/context/cartContext";
import CartItem from "./CartItem";
import Backdrop from "../UI/Backdrop";
const CartModal = () => {
  const router = useRouter();
  const { showBagModal, setShowBagModal } = useModalsContext();
  const { dbCart, totalCount, isFetching } = useCartContext();
  const cartItem = dbCart?.cartItems[dbCart.cartItems.length - 1];
  return (
    <>
      {showBagModal && cartItem && !isFetching && (
        <div className="absolute z-30 w-full  bg-slate-50  px-8 pb-8 pt-4 shadow-lg md:right-8 md:w-fit md:min-w-[450px]">
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
      <Backdrop
        show={showBagModal}
        zIndex={20}
        onClose={() => setShowBagModal(false)}
      />
    </>
  );
};

export default CartModal;
