/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import CheckoutForm from "~/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import {
  PaymentMethodOptions,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingPage from "~/components/loading";
import { useCartContext } from "~/context/cartContext";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const Checkout = () => {
  const { costs, dbCart } = useCartContext();
  const router = useRouter();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getSecret = async () => {
      if (!costs?.totalCost) return;
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: costs.totalCost },
      });
      const clientSecret = data.secret;
      setClientSecret(clientSecret as string);
    };
    void getSecret();
    return () => void 0;
  }, [costs]);

  useEffect(() => {
    const goToCart = async () => {
      try {
        if (dbCart && dbCart?.cartItems?.length < 1) {
          // Navigate to the "/cart" page
          await router.push("/cart");
        }
      } catch (error) {
        throw new Error("An error occurred");
      }
    };
    goToCart().catch((error) => console.log(error));

    return () => {
      // Cleanup code here (if applicable)
    };
  }, [dbCart]);

  if (!clientSecret) return <LoadingPage />;

  const options: StripeElementsOptions = {
    clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
