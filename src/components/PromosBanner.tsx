import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import Carousel from "react-multi-carousel";
import { type ArrowProps } from "react-multi-carousel/lib/types";

export const PromosBanner = ({
  promos,
}: {
  promos: { text: string; link: string; linkText: string }[];
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 1,
    },
    desktopSmall: {
      breakpoint: { max: 1280, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const CustomRightArrow = ({ onClick, ...rest }: ArrowProps) => {
    return (
      <FiChevronRight
        role="button"
        className="absolute right-0 h-6 w-6 -translate-x-full  text-slate-50"
        onClick={() => onClick?.()}
      />
    );
  };

  const CustomLeftArrow = ({ onClick, ...rest }: ArrowProps) => {
    return (
      <FiChevronRight
        role="button"
        className="absolute   h-6 w-6 rotate-180  border-white text-slate-50 "
        onClick={() => onClick?.()}
      />
    );
  };

  return (
    <div className="w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-500 text-slate-50">
      <Carousel
        className="relative mx-auto w-[min(95%,700px)] py-1.5"
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
        infinite
        autoPlay
        autoPlaySpeed={4000}
        responsive={responsive}
      >
        {promos.map((banner, i) => (
          <div className="text-center text-sm font-semibold" key={i}>
            <p>{banner.text}</p>
            <Link className="text-xs font-bold underline" href={banner.link}>
              {banner.linkText}
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
