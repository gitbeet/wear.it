/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import axios from "axios";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getSecret = async () => {
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: 89 },
      });
      const clientSecret = data.secret;
      setClientSecret(clientSecret as string);
    };
    void getSecret();
  }, []);

  if (!clientSecret) return <h1>loading...</h1>;
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
