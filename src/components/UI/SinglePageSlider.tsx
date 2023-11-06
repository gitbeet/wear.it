import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

interface Props {
  slides: { title: string; image: string; button: JSX.Element }[];
}

const SinglePageSlider = ({ slides }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touched, setTouched] = useState(false);
  const disabledLeft = currentSlide < 1;
  const disabledRight = currentSlide >= slides.length - 1;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  useEffect(() => {
    if (touched) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [touched, nextSlide]);

  return (
    <div
      onMouseOver={() => setTouched(true)}
      onMouseLeave={() => setTouched(false)}
      className="relative h-72 min-w-full"
    >
      {slides.map((slide, i) => {
        const isVisible = i === currentSlide;
        return (
          <>
            <Image
              key={i}
              fill
              objectFit="cover"
              className={`absolute z-0 bg-slate-200 ${
                isVisible ? "opacity-75" : "opacity-0"
              } rounded-md transition-opacity duration-1000`}
              src={slide.image ?? ""}
              alt="Slide background"
            />
            <div
              className={`${
                isVisible ? "opacity-100" : "opacity-0"
              } absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-8 transition-[opacity] duration-1000`}
            >
              <h2 className="font-display text-center text-5xl font-black uppercase text-gray-900">
                {slide.title}
              </h2>
              <div className="w-fit">{slide.button}</div>
            </div>
          </>
        );
      })}
      <button
        disabled={disabledLeft}
        onClick={() => {
          setTouched(true);
          setCurrentSlide((prev) => prev - 1);
        }}
        role="button"
        className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 p-2 text-center disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FiChevronLeft className="h-8 w-8 text-gray-800" />
      </button>
      <button
        disabled={disabledRight}
        onClick={() => {
          setTouched(true);
          setCurrentSlide((prev) => prev + 1);
        }}
        className="absolute left-[calc(100%-1rem)] top-1/2 z-20 flex h-12 w-12 -translate-x-full -translate-y-1/2 items-center justify-center rounded-full  bg-slate-100 p-2 text-center disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FiChevronLeft className="text-gray-80 h-8 w-8 rotate-180" />
      </button>
    </div>
  );
};

export default SinglePageSlider;
