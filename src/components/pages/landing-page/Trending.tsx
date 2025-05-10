import ProductCardCarousel from "~/components/carousel/ProductCardCarousel";
import { type SQLProductType } from "~/types";
import { landingPageTrendingBreakPoints } from "~/utilities/swiperBreakPoints";

const Trending = ({ products }: { products: SQLProductType[] | undefined }) => {
  return (
    <section className="padding-x container-mine mx-auto">
      <h2 className="padding-section font-display text-2xl font-black">
        Trending
      </h2>
      {/* <div className="h-6 md:h-12"></div> */}
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
