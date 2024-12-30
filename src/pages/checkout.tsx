import CheckoutForm from "~/components/Pages/Checkout/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useCartContext } from "~/context/cartContext";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const Checkout = () => {
  const { dbCart } = useCartContext();
  const router = useRouter();

  useEffect(() => {
    const goToCart = async () => {
      try {
        if (dbCart && dbCart?.cartItems?.length < 1) {
          await router.push("/cart");
        }
      } catch (error) {
        throw new Error("An error occurred");
      }
    };
    goToCart().catch((error) => console.log(error));
    return () => void 0;
  }, [dbCart]);

  return (
    <Elements
      stripe={stripePromise}
      options={{ mode: "payment", amount: 1000, currency: "usd" }}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
