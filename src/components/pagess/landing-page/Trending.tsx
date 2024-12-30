import ProductCardCarousel from "~/components/carousels/ProductCardCarousel";
import { landingPageTrendingBreakPoints } from "~/utilities/swiperBreakPoints";
import { api } from "~/utils/api";

const Trending = () => {
  const { data: products, isLoading: isGettingProducts } =
    api.product.getAllSQL.useQuery({
      color: undefined,
      size: undefined,
      slug: undefined,
      sort: undefined,
      type: ["MEN", "WOMEN"],
    });
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
        data={products?.products}
        isLoading={isGettingProducts}
        speed={600}
        breakPoints={landingPageTrendingBreakPoints}
      />
    </section>
  );
};

export default Trending;
