import Button from "../UI/Button";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useModalsContext } from "~/context/modalsContext";
import { useRouter } from "next/router";
import { useCartContext } from "~/context/cartContext";
import CartItem from "./CartItem";
import Backdrop from "../UI/Backdrop";
import FocusTrap from "focus-trap-react";
import CloseButton from "../UI/CloseButton";
import { LoadingSpinner } from "../loading";
const CartModal = () => {
  const router = useRouter();
  const { showBagModal, setShowBagModal } = useModalsContext();
  const { dbCart, totalCount, isFetching } = useCartContext();
  const cartItem = dbCart?.cartItems[dbCart.cartItems.length - 1];

  const cartModal = showBagModal && (
    <FocusTrap active={showBagModal}>
      <article className="absolute z-30 w-full  rounded-b-sm  bg-slate-50 px-8 pb-8 pt-4 shadow-lg md:right-8 md:w-[450px]">
        <div className="flex w-full justify-between">
          <p className="flex items-center gap-1 font-semibold">
            <BsFillCheckCircleFill className="text-teal-500" />
            <span className="text-sm">Added to bag</span>
          </p>
          <div className="h-10">
            <CloseButton onClick={() => setShowBagModal(false)} />
          </div>
        </div>
        {isFetching && (
          <div className="grid h-full w-full place-content-center p-12">
            <LoadingSpinner size={32} />
          </div>
        )}
        {!isFetching && !cartItem && (
          <div className="grid h-full w-full place-content-center p-12">
            Something went wrong.
          </div>
        )}
        {!isFetching && cartItem && <CartItem modal cartItem={cartItem} />}
        <div className="flex gap-2 ">
          <Button
            disabled={isFetching || !cartItem}
            text={`View Bag (${totalCount})`}
            onClick={async () => {
              setShowBagModal(false);
              await router.push("/cart");
            }}
            ghost
          />
          <Button
            disabled={isFetching || !cartItem}
            text="Checkout"
            onClick={async () => {
              setShowBagModal(false);
              await router.push("/checkout");
            }}
          />
        </div>
      </article>
    </FocusTrap>
  );

  return (
    <>
      {cartModal}
      <Backdrop
        show={showBagModal}
        zIndex={20}
        onClose={() => setShowBagModal(false)}
      />
    </>
  );
};

export default CartModal;
