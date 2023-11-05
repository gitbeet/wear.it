import { useRef, useState, useEffect } from "react";
import { type RouterOutputs } from "~/utils/api";
import ProductCard from "../ProductCard";

const mock = [...Array(15).keys()];

type Product = RouterOutputs["product"]["getAll"][number];

const Carousel = ({ products }: { products: Product[] }) => {
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

  return (
    <div className="relative overflow-hidden">
      <div className="absolute flex h-full w-full justify-between">
        <button
          onClick={movePrev}
          className="z-10 m-0 h-full w-10 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out hover:bg-blue-900/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
          disabled={isDisabled("prev")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-5 h-12 w-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="sr-only">Prev</span>
        </button>
        <button
          onClick={moveNext}
          className="z-10 m-0 h-full w-10 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out hover:bg-blue-900/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
          disabled={isDisabled("next")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-5 h-12 w-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>
      <div
        ref={carousel}
        className="relative z-0 flex touch-pan-x snap-x snap-mandatory gap-2 overflow-hidden scroll-smooth"
      >
        {products.map((product) => {
          return (
            // <div
            //   key={product.id}
            //   className=" relative flex h-[450px] min-w-[400px] snap-start items-center justify-center bg-slate-300 text-center"
            // >
            <ProductCard slider key={product.id} product={product} />
            // </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
