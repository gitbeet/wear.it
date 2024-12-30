import { NextSeo } from "next-seo";
import Spacer from "~/components/ui/Spacer";
import RecentlyViewed from "~/components/carousel/RecentlyViewed";
import Cart from "~/components/cart/Cart";

const Index = () => {
  return (
    <>
      <NextSeo
        title="Your Bag"
        description="Review and manage items in your shopping bag at wear.it . Discover the latest styles and proceed to checkout for a seamless shopping experience."
        noindex={false}
        nofollow={false}
        canonical="https://t3-ecommerce-five.vercel.app/cart"
      />
      <section className="container-mine padding-x mx-auto">
        <Spacer type="header" />
        <h1 className="text-center font-display text-5xl font-black text-slate-800">
          Bag
        </h1>
        <Cart />
        <RecentlyViewed />
        <Spacer type="footer" />
      </section>
    </>
  );
};

export default Index;
