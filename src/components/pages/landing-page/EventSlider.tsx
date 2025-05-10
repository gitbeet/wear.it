import ProductCardCarousel from "~/components/carousel/ProductCardCarousel";
import { type SQLProductType } from "~/types";

const EventSlider = ({
  products,
}: {
  products: SQLProductType[] | undefined;
}) => {
  return (
    <section className="padding-x container-mine padding-section mx-auto flex grow flex-col items-start gap-2 md:flex-row md:items-center lg:gap-16">
      <div>
        <h2 className="flex items-center gap-2 bg-gradient-to-r  from-slate-600 to-slate-800 bg-clip-text  py-1  font-display font-extrabold text-transparent">
          {/* <FaSnowflake className="inline h-8 w-8 shrink-0 text-indigo-500" /> */}
          <p className=" py-1 font-display text-5xl font-extrabold">Cozy up!</p>
        </h2>
        <div className="h-4"></div>
        <p className="text-xl font-light text-slate-700">
          <b className="font-bold">Get Comfy</b> with Our Winter Selection
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <ProductCardCarousel
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
