import { useEffect, useRef, useState } from "react";
import type { SwiperOptions } from "swiper/types";
import { Swiper, type SwiperRef } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SliderArrow from "../UI/SliderArrow";
import { defaultBreakPoints } from "~/utilities/swiperBreakPoints";
import "swiper/css";

const Carousel = ({
  children,
  breakpoints = defaultBreakPoints,
  paginationContainerId,
  infinite = false,
  autoplay = false,
  autoplayDelay = 5000,
  speed = 300,
}: {
  children: React.ReactNode;
  breakpoints?: SwiperOptions["breakpoints"];
  paginationContainerId: string;
  infinite: boolean;
  autoplay: boolean;
  autoplayDelay: number;
  speed: number;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(true);
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    if (!swiperRef.current?.swiper) return;

    const swiper = swiperRef.current.swiper;

    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);

    swiper.on("slideChange", () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    });
  }, [swiperRef]);

  return (
    <div
      className={`${
        isLoading ? "pointer-events-none opacity-0" : "opacity-100"
      } relative`}
    >
      <Swiper
        allowTouchMove
        preventClicks={false}
        preventClicksPropagation={false}
        style={{
          paddingBlock: ".5rem",
          paddingInline: "0.75rem",
          touchAction: "pan-y",
        }}
        keyboard
        pagination={{
          el: `#${paginationContainerId}`,
          type: "bullets",
          bulletClass: "swiper-custom-bullet",
          bulletActiveClass: "swiper-custom-bullet-active",
          clickable: true,
          enabled: true,
        }}
        ref={swiperRef}
        spaceBetween={8}
        slidesPerView={3}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={breakpoints}
        onInit={(swiperInstance) => {
          setIsBeginning(swiperInstance.isBeginning);
          setIsEnd(swiperInstance.isEnd);
          if (autoplay && autoplayDelay) {
            swiperInstance.autoplay.start();
          }
          setIsLoading(false);
        }}
        onSlideChange={(swiperInstance) => {
          setIsBeginning(swiperInstance.isBeginning);
          setIsEnd(swiperInstance.isEnd);
        }}
        loop={infinite}
        autoplay={
          autoplay && autoplayDelay
            ? {
                delay: autoplayDelay,
                pauseOnMouseEnter: true,
                disableOnInteraction: true,
              }
            : undefined
        }
        speed={speed}
      >
        {children}
      </Swiper>

      <div id={paginationContainerId}></div>
      <div className="relative hidden h-16 grow items-center justify-center gap-4 md:flex">
        <SliderArrow
          containerClass="h-9"
          className="-left-12"
          aria-label="Previous slide"
          disabled={infinite ? false : isBeginning}
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        />
        <SliderArrow
          containerClass="h-9"
          className="left-12"
          arrowDirectionClass="rotate-180"
          aria-label="Next slide"
          disabled={infinite ? false : isEnd}
          onClick={() => swiperRef.current?.swiper.slideNext()}
        />
      </div>
    </div>
  );
};

export default Carousel;
