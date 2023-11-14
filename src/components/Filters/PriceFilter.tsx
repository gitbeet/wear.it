import ReactSlider from "react-slider";
import { formatCurrency } from "~/utilities/formatCurrency";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const PriceSlider = ({ min, max }: { min: number; max: number }) => {
  const router = useRouter();
  const { priceFrom, priceTo } = router.query;
  const [displayPriceRange, setDisplayPriceRange] = useState<[number, number]>([
    min,
    max,
  ]);

  useEffect(() => {
    if (typeof priceFrom !== "string" || typeof priceTo !== "string") {
      setDisplayPriceRange([min, max]);
      return;
    }
    setDisplayPriceRange([parseInt(priceFrom), parseInt(priceTo)]);
  }, [priceFrom, priceTo]);

  return (
    <div className="h-8 border-b p-8 pb-40">
      <header className="text-md font-semibold">Shop by Price</header>
      <div className="h-4"></div>
      <div>
        <div className="w-full space-x-2 text-center text-sm">
          <span>{formatCurrency(displayPriceRange[0])}</span>
          <span>-</span>
          <span>{formatCurrency(displayPriceRange[1])}</span>
        </div>
        <div className="h-4"></div>
        <div className="relative">
          <p className="absolute left-0 top-6 text-sm">{formatCurrency(min)}</p>
          <p className="absolute right-0 top-6 text-sm">
            {formatCurrency(max)}
          </p>
          <ReactSlider
            step={0.01}
            min={min}
            max={max}
            onChange={(e) => {
              setDisplayPriceRange(e);
            }}
            onAfterChange={(e) => {
              void router.push(
                {
                  query: { ...router.query, priceFrom: e[0], priceTo: e[1] },
                },
                undefined,
                {
                  shallow: true,
                  scroll: true,
                },
              );
            }}
            value={displayPriceRange}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            renderThumb={(props) => (
              <div
                {...props}
                className="absolute -top-1 h-4 w-4 rounded-full bg-teal-500 "
              ></div>
            )}
            renderTrack={(props, state) => (
              <div
                {...props}
                className={`${
                  state.index === 1 ? "bg-slate-300" : "bg-neutral-200"
                } absolute top-0 h-2`}
              />
            )}
            pearling
            minDistance={5}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
