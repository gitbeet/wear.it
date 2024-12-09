import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "~/components/UI/Button";
import { api } from "~/utils/api";

const Successful = () => {
  const router = useRouter();
  const { refetch } = api.cart.getByUserId.useQuery();

  useEffect(() => {
    void refetch();
  }, []);

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="h-16"></div>
      <h1 className="font-display text-6xl font-black text-slate-800">
        Your order was successful!
      </h1>
      <div className="h-8"></div>
      <p className="text-2xl font-bold">Thank you for chosing our products.</p>
      <div className="h-12"></div>
      <Button
        text="Continue Shopping"
        onClick={() => void router.push("/")}
        width="FIT"
      />
    </section>
  );
};

export default Successful;
