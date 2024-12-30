import { useRouter } from "next/router";
import Button from "~/components/ui/Button";
import { useCartContext } from "~/context/cartContext";
import CartItems from "./CartItems";
import Summary from "./CartSummary";
import LoadingPage from "~/components/ui/LoadingElements";
import { api } from "~/utils/api";

const Cart = () => {
  const ctx = api.useUtils();
  const { dbCart, isGettingCart, isFetching } = useCartContext();
  const router = useRouter();

  const { mutate: addToFavorites, isLoading: isFaving } =
    api.favorite.favorite.useMutation({
      onSuccess: () => {
        void ctx.invalidate();
      },
    });
  const { mutate: modify, isLoading: isModifying } =
    api.cart.modifyItem.useMutation({
      onSuccess: () => {
        void ctx.invalidate();
      },
    });

  const { mutate: remove, isLoading: isRemoving } =
    api.cart.removeItem.useMutation({
      onSuccess: () => {
        void ctx.invalidate();
      },
    });

  const isLoading =
    isFaving || isRemoving || isModifying || isGettingCart || isFetching;

  const emptyCartContent = (
    <div className="flex flex-col items-center ">
      <div className="h-4"></div>
      <p>Your bag is currently empty.</p>
      <div className="h-8"></div>
      <Button
        text="Continue shopping"
        aria-label="Go to the home page"
        onClick={async () => await router.push("/")}
        width="FIT"
      />
    </div>
  );

  const cartContent = (
    <>
      <div className="mx-auto grid max-w-[1400px] gap-16 pt-16 md:pt-24 lg:grid-cols-[2fr,1fr]">
        <CartItems
          addToFavorites={addToFavorites}
          isLoading={isLoading}
          remove={remove}
          modify={modify}
        />
        <div>
          <Summary isLoading={isLoading} />
          <Button
            text="Buy now"
            disabled={isLoading}
            aria-label="Go to the checkout page"
            onClick={async () => await router.push("/checkout")}
          />
        </div>
      </div>
    </>
  );

  const noDataContent = (
    <>
      <div className="h-12"></div>
      <h1 className="text-lg">Something went wrong.Please refresh the page</h1>
    </>
  );

  return (
    <>
      {isGettingCart ? (
        <div className="relative py-24">
          <LoadingPage />
        </div>
      ) : !dbCart ? (
        noDataContent
      ) : dbCart.cartItems.length < 1 ? (
        emptyCartContent
      ) : (
        cartContent
      )}
    </>
  );
};

export default Cart;
