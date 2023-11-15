import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { type RouterOutputs } from "~/utils/api";
import ProductCard from "../components/ProductCard";
type Product = RouterOutputs["product"]["getAll"]["products"][number];

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
  const responsive = {
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
    <Carousel responsive={responsive}>
      {[...Array(12).keys()].map((bone) => (
        <div
          key={bone}
          className=" flex  animate-pulse flex-col items-center justify-center bg-gray-100 p-1"
        >
          <div className="aspect-square w-full">
            <div className="relative">
              <div className="absolute bottom-4 right-4 z-10  h-10 w-10   rounded-full bg-gray-400"></div>
              <div className="relative aspect-square w-full bg-slate-200" />
              <p className="absolute bottom-2 left-4 h-4 w-16 rounded-full bg-gray-400"></p>
            </div>
          </div>
          <div className="h-4"></div>
          <div className="min-h-[4rem] w-full self-start overflow-hidden pl-4">
            <p className="h-4 w-3/4 rounded-full bg-gray-400"></p>
            <div className="h-1"></div>
            <p className="h-4 w-16 rounded-full bg-gray-400 text-gray-500"></p>
          </div>
        </div>
      ))}
    </Carousel>
  ) : (
    <Carousel responsive={responsive}>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Carousel>
  );
};

export default ProductCardCarousel;
