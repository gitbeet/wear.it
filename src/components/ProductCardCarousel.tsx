import Carousel, { ArrowProps, ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { type RouterOutputs } from "~/utils/api";
import ProductCard from "../components/ProductCard";
import { FiChevronRight } from "react-icons/fi";
type Product = RouterOutputs["product"]["getAll"]["products"][number];

const CustomRightArrow = ({ onClick, ...rest }: ArrowProps) => {
  return (
    <div className="absolute right-0 flex -translate-x-full items-center justify-center rounded-full bg-indigo-500/70 p-1 text-slate-50  ">
      <FiChevronRight
        className=" h-8 w-8 "
        role="button"
        onClick={() => onClick?.()}
      />
    </div>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }: ArrowProps) => {
  return (
    <div className="absolute left-0 flex translate-x-full items-center justify-center rounded-full bg-indigo-500/70 p-1 text-slate-50  ">
      <FiChevronRight
        className=" h-8 w-8 rotate-180 "
        role="button"
        onClick={() => onClick?.()}
      />
    </div>
  );
};

const ProductCardCarousel = ({
  products,
  isLoading,
  numberOfItems,
}: {
  products: Product[] | undefined;
  isLoading: boolean;
  numberOfItems: {
    tablet: number;
    desktopSmall: number;
    desktop: number;
  };
}) => {
  const responsive: ResponsiveType = {
    desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: numberOfItems.desktop,
    },
    desktopSmall: {
      breakpoint: { max: 1280, min: 1024 },
      items: numberOfItems.desktopSmall,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: numberOfItems.tablet,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return !products || isLoading ? (
    <Carousel
      responsive={responsive}
      removeArrowOnDeviceType={["mobile", "tablet", "desktop"]}
    >
      {[...Array(12).keys()].map((bone) => (
        <div
          key={bone}
          className=" flex  animate-pulse flex-col items-center justify-center bg-slate-100 p-1"
        >
          <div className="aspect-square w-full">
            <div className="relative">
              <div className="absolute bottom-4 right-4 z-10  h-10 w-10   rounded-full bg-slate-400"></div>
              <div className="relative aspect-square w-full bg-slate-200" />
              <p className="absolute bottom-2 left-4 h-4 w-16 rounded-full bg-slate-400"></p>
            </div>
          </div>
          <div className="h-4"></div>
          <div className="min-h-[4rem] w-full self-start overflow-hidden pl-4">
            <p className="h-4 w-3/4 rounded-full bg-slate-400"></p>
            <div className="h-1"></div>
            <p className="h-4 w-16 rounded-full bg-slate-400 text-slate-500"></p>
          </div>
        </div>
      ))}
    </Carousel>
  ) : (
    <Carousel
      responsive={responsive}
      autoPlay
      autoPlaySpeed={3500}
      infinite
      transitionDuration={1000}
      customTransition="transform 1s ease-in-out"
      removeArrowOnDeviceType={["mobile", "tablet"]}
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
    >
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Carousel>
  );
};

export default ProductCardCarousel;
