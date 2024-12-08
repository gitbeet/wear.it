import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { type ArrowProps } from "react-multi-carousel/lib/types";
import NavIcon from "./NavIcon";

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

  const buttonClass =
    "!absolute !h-full !w-10 !text-slate-50 hover:!bg-indigo-400 !rounded-none";

  const CustomRightArrow = ({ onClick }: ArrowProps) => {
    return (
      <NavIcon
        as="button"
        icon={<FiChevronRight className="h-5 w-5" />}
        className={`${buttonClass} right-0`}
        onClick={() => onClick?.()}
      ></NavIcon>
    );
  };

  const CustomLeftArrow = ({ onClick }: ArrowProps) => {
    return (
      <NavIcon
        as="button"
        icon={<FiChevronRight className="h-5 w-5 rotate-180" />}
        className={`${buttonClass} left-0`}
        onClick={() => onClick?.()}
      ></NavIcon>
    );
  };

  return (
    // Hard coded pt-16 - value of the nav height
    <div className="gradient-main-r shadow-color relative z-[40] flex w-full items-center justify-center pt-16 text-slate-50 shadow-lg">
      <Carousel
        removeArrowOnDeviceType={["mobile", "tablet"]}
        className="w-[min(calc(100%-48px),700px)]  py-1.5 md:py-2"
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
        infinite
        autoPlay
        autoPlaySpeed={4000}
        responsive={responsive}
      >
        {promos.map((banner, i) => (
          <div
            className="px-8 text-center text-xs font-semibold sm:px-8 md:text-sm"
            key={i}
          >
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
