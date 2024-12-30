import { NextSeo } from "next-seo";
import Spacer from "~/components/UI/Spacer";
import RecentlyViewed from "~/components/Carousel/RecentlyViewed";
import FavoriteItems from "~/components/Favorites/FavoriteItems";

const Favorites = () => {
  return (
    <>
      <NextSeo
        title="Your Wishlist"
        description="Your wishlist page."
        noindex={false}
        nofollow={false}
        canonical="https://t3-ecommerce-five.vercel.app/contact"
      />
      <section className="padding-x container-mine mx-auto">
        <Spacer type="header" />
        <FavoriteItems />
        <RecentlyViewed />
        <Spacer type="footer" />
      </section>
    </>
  );
};

export default Favorites;
