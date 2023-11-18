import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { type ArrowProps } from "react-multi-carousel/lib/types";

export const PromosBanner = ({
  promos,
}: {
  promos: { text: string; link: string; linkText: string }[];
}) => {
  const responsive = {
    allSizes: {
      breakpoint: { max: 10000, min: 0 },
      items: 1,
    },
  };

  const CustomRightArrow = ({ onClick, ...rest }: ArrowProps) => {
    return (
      <FiChevronRight
        role="button"
        className="absolute right-0  h-6 w-6 -translate-x-full text-slate-50  "
        onClick={() => onClick?.()}
      />
    );
  };

  const CustomLeftArrow = ({ onClick, ...rest }: ArrowProps) => {
    return (
      <FiChevronRight
        role="button"
        className="absolute  h-6   w-6 rotate-180 border-white  text-slate-50  "
        onClick={() => onClick?.()}
      />
    );
  };

  return (
    <div className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-slate-50 md:via-indigo-500 md:to-violet-500">
      <Carousel
        removeArrowOnDeviceType={["tablet", "mobile"]}
        className="mx-auto w-[min(95%,700px)] py-1.5"
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
