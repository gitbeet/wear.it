import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useRef } from "react";

export const PromosBanner = ({
  promos,
}: {
  promos: { text: string; link: string; linkText: string }[];
}) => {
  const swiperRef = useRef<SwiperRef>(null);

  const CustomArrow = ({ direction }: { direction: "left" | "right" }) => (
    <button
      className="grid w-8 shrink-0 grow place-content-center text-slate-50 hover:bg-indigo-400 active:opacity-50"
      onClick={() =>
        direction === "left"
          ? swiperRef.current?.swiper.slidePrev()
          : swiperRef.current?.swiper.slideNext()
      }
    >
      <FiChevronRight
        className={` ${direction === "left" ? "-scale-x-[1]" : ""} h-5 w-5`}
      />
    </button>
  );

  return (
    // Hard coded pt-16 - value of the nav height
    <div className="gradient-main-r shadow-color relative z-[40] flex  w-full items-center justify-center pt-16 text-slate-50 shadow-lg ">
      <div className="padding-x flex w-[min(100vw,40rem)] items-stretch justify-center gap-2 md:gap-4">
        <CustomArrow direction="left" />
        <Swiper
          className="w-full grow"
          ref={swiperRef}
          style={{ paddingBlock: ".5rem", paddingInline: "0.75rem" }}
          keyboard
          spaceBetween={8}
          slidesPerView={1}
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 2500,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          speed={600}
        >
          {promos.map((banner, i) => (
            <SwiperSlide key={i}>
              <div className="px-1 text-center text-xs font-semibold sm:px-8 md:px-4 md:text-sm">
                <p>{banner.text}</p>
                <Link
                  className="text-xs font-bold underline"
                  href={banner.link}
                >
                  {banner.linkText}
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <CustomArrow direction="right" />
      </div>
    </div>
  );
};
