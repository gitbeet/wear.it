import ProductCardCarousel from "~/components/carousel/ProductCardCarousel";
import { type SQLProductType } from "~/types";
import { landingPageTrendingBreakPoints } from "~/utils/swiperBreakPoints";

const Trending = ({ products }: { products: SQLProductType[] | undefined }) => {
  return (
    <section className="padding-x padding-section container-mine mx-auto">
      <div>
        <h2 className="bg-gradient-to-r from-slate-600 to-slate-800  bg-clip-text py-1 text-center  font-display  text-4xl  font-extrabold text-transparent">
          Trending
        </h2>
        <div className="h-4"></div>
        <p className="text-center text-xl font-light text-slate-700">
          Discover Winter Essentials Tailored for <b>Comfort & Style</b>
        </p>
      </div>
      <div className="h-6 md:h-12"></div>
      <ProductCardCarousel
        autoplay={true}
        autoplayDelay={3000}
        infinite={true}
        paginationContainerId="landing-page--trending__pagination-container"
        data={products}
        isLoading={false}
        speed={600}
        breakPoints={landingPageTrendingBreakPoints}
      />
    </section>
  );
};

export default Trending;
