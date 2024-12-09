import { SwiperOptions } from "swiper/types";

export const defaultBreakPoints: SwiperOptions["breakpoints"] = {
  0: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 3,
  },
  1440: {
    slidesPerView: 4,
  },
};

export const landingPageTrendingBreakPoints: SwiperOptions["breakpoints"] = {
  0: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 3,
  },
  1440: {
    slidesPerView: 5,
  },
};

export const ReccomendedProductsBreakPoints: SwiperOptions["breakpoints"] = {
  0: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 4,
  },
  1440: {
    slidesPerView: 5,
  },
};
