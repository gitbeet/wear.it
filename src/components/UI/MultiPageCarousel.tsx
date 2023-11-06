import { useRef, useState, useEffect } from "react";
import { type RouterOutputs } from "~/utils/api";
import ProductCard from "../ProductCard";
import { FiChevronLeft } from "react-icons/fi";
import { SkeletonCard } from "~/pages/products/[...slug]";

type Product = RouterOutputs["product"]["getAll"]["products"] | undefined;

const skeleton = [...Array(10).keys()];

const Carousel = ({
  products,
  isLoading,
}: {
  products: Product;
  isLoading: boolean;
}) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement | null>(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: "prev" | "next") => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel?.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  const arrowLeft = (
    <button
      onClick={movePrev}
      disabled={isDisabled("prev")}
      className="relative left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-gray-50 p-2 text-center disabled:cursor-not-allowed disabled:opacity-75"
    >
      <FiChevronLeft className="h-8 w-8 text-gray-800" />
      <span className="sr-only">Previous</span>
    </button>
  );

  const arrowRight = (
    <button
      onClick={moveNext}
      disabled={isDisabled("next")}
      className="relative right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-gray-50 p-2 text-center disabled:cursor-not-allowed disabled:opacity-75"
    >
      <FiChevronLeft className="h-8 w-8 rotate-180 text-gray-800" />
      <span className="sr-only">Next</span>
    </button>
  );

  return (
    <div className="relative overflow-hidden">
      <div className="absolute flex h-full w-full justify-between">
        {arrowLeft}
        {arrowRight}
      </div>
      <div
        ref={carousel}
        className="relative z-0 flex touch-pan-x snap-x snap-mandatory gap-2 overflow-hidden scroll-smooth"
      >
        {isLoading ? (
          skeleton.map((el) => {
            return <SkeletonCard key={el} slider />;
          })
        ) : !products ? (
          <h1>Something went wrong</h1>
        ) : (
          products.map((product) => {
            return <ProductCard slider key={product.id} product={product} />;
          })
        )}
      </div>
    </div>
  );
};

export default Carousel;
