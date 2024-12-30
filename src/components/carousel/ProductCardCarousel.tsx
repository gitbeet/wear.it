import { SwiperSlide } from "swiper/react";
import Carousel from "./Carousel";
import ProductCard from "../product/ProductCard/ProductCard";
import { type SQLProductType } from "~/types";
import { type SwiperOptions } from "swiper/types";
import ProductCardSkeleton from "../product/ProductCard/ProductCardSkeleton";
const ProductCardCarousel = ({
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
  const loadingContent = [...Array(12).keys()].map((_, i) => (
    <SwiperSlide key={i}>
      <ProductCardSkeleton />
    </SwiperSlide>
  ));

  const content = (
    <div>
      {data?.map((card, i) => (
        <SwiperSlide key={i}>
          <ProductCard product={card} />
        </SwiperSlide>
      ))}
    </div>
  );

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

export default ProductCardCarousel;
