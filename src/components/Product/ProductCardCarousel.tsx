import Carousel, {
  type ArrowProps,
  type ResponsiveType,
} from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { FiChevronLeft } from "react-icons/fi";
import type { SQLProductType } from "~/types";
import NavIcon from "../Nav/NavIcon";
import SliderArrow from "../UI/SliderArrow";

const arrowContainerClass =
  "absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center";
const arrowIconClass = "!bg-white !border-slate-100 hover:!bg-slate-300";

//   <div className={`${arrowContainerClass} left-4`}>
//   <NavIcon
//     className={arrowIconClass}
//     onClick={() => setCurrentImage((prev) => (prev < 1 ? 0 : prev - 1))}
//     as="button"
//     size={32}
//     icon={<FiChevronLeft className="h-full w-full" />}
//     disabled={isFirstImage}
//   />
// </div>

const CustomRightArrow = ({ onClick, ...rest }: ArrowProps) => {
  return (
    <SliderArrow
      positionClass="right-4"
      arrowDirectionClass="rotate-180"
      onClick={() => onClick?.()}
    />
  );
};

const CustomLeftArrow = ({ onClick, ...rest }: ArrowProps) => {
  return <SliderArrow positionClass="left-4" onClick={() => onClick?.()} />;
};

const ProductCardCarousel = ({
  products,
  isLoading,
  numberOfItems,
}: {
  products: SQLProductType[] | undefined;
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
      items: 1.5,
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
              <div className="absolute bottom-4 right-4 z-10  h-10 w-10   rounded-full bg-slate-300"></div>
              <div className="relative aspect-square w-full bg-slate-200" />
              <p className="absolute bottom-2 left-4 h-4 w-16 rounded-full bg-slate-300"></p>
            </div>
          </div>
          <div className="h-4"></div>
          <div className="min-h-[4rem] w-full self-start overflow-hidden pl-4">
            <p className="h-4 w-3/4 rounded-full bg-slate-300"></p>
            <div className="h-1"></div>
            <p className="h-4 w-16 rounded-full bg-slate-300"></p>
          </div>
        </div>
      ))}
    </Carousel>
  ) : (
    <Carousel
      responsive={responsive}
      autoPlay
      autoPlaySpeed={5000}
      infinite
      transitionDuration={500}
      customTransition="transform 0.5s ease-in-out"
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
