import React from "react";
import { SwiperSlide } from "swiper/react";
import Carousel from "./Carousel";
import ProductCard from "../Product/ProductCard";
import { type SQLProductType } from "~/types";
import { type SwiperOptions } from "swiper/types";
const ProductCardCarouselTest = ({
  data,
  isLoading,
  paginationContainerId: containerId,
  infinite,
  autoplay,
  autoplayDelay,
  speed,
  breakPoints,
}: {
  data: SQLProductType[] | undefined;
  isLoading: boolean;
  paginationContainerId: string;
  infinite: boolean;
  autoplay: boolean;
  autoplayDelay: number;
  speed: number;
  breakPoints?: SwiperOptions["breakpoints"];
}) => {
  const content = (
    <div>
      {data?.map((card, i) => (
        <SwiperSlide key={i}>
          <ProductCard product={card} />
        </SwiperSlide>
      ))}
    </div>
  );

  const loadingContent = [...Array(12).keys()].map((bone, i) => (
    <SwiperSlide key={i}>
      <div
        key={bone}
        className=" flex animate-pulse flex-col items-center justify-center bg-slate-100 p-1"
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
    </SwiperSlide>
  ));

  return (
    <Carousel
      breakpoints={breakPoints}
      paginationContainerId={containerId}
      infinite={infinite}
      autoplay={autoplay}
      autoplayDelay={autoplayDelay}
      speed={speed}
    >
      {isLoading || !data ? loadingContent : content}
      {/* {true ? loadingContent : content} */}
    </Carousel>
  );
};

export default ProductCardCarouselTest;
