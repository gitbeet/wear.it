import ProductCardCarousel from "~/components/carousel/ProductCardCarousel";
import { type SQLProductType } from "~/types";
import { landingPageTrendingBreakPoints } from "~/utils/swiperBreakPoints";

const EventSlider = ({
  products,
}: {
  products: SQLProductType[] | undefined;
}) => {
  return (
    <section className="padding-x container-mine padding-section relative mx-auto  flex grow flex-col items-start gap-4  md:items-center md:gap-16">
      <div className="mx-auto">
        <h2 className="bg-gradient-to-r from-slate-600 to-slate-800  bg-clip-text py-1 text-center  font-display  text-4xl  font-extrabold text-transparent">
          Cozy up!
        </h2>
        <div className="h-4"></div>
        <p className="text-xl font-light text-slate-700">
          <b className="font-bold">Get Comfy</b> with Our Winter Selection
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <ProductCardCarousel
          breakPoints={landingPageTrendingBreakPoints}
          paginationContainerId="landing-page--winter-event__pagination-container"
          data={products}
          isLoading={false}
          infinite={true}
          autoplay={false}
          autoplayDelay={2500}
          speed={500}
        />
      </div>
    </section>
  );
};

export default EventSlider;
