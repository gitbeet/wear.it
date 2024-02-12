import ReactSlider from "react-slider";
import { formatCurrency } from "~/utilities/formatCurrency";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const emptySlider = (
  <div className="h-8 border-b p-8 pb-40 pl-0 ">
    <header className="text-md font-semibold">Shop by Price</header>
    <div className="h-6"></div>
    <div className="pointer-events-none opacity-50">
      <div className="w-full space-x-2 text-center text-sm">
        <span>{formatCurrency(0)}</span>
        <span>-</span>
        <span>{formatCurrency(0)}</span>
      </div>
      <div className="h-4"></div>
      <div className="relative">
        <p className="absolute left-0 top-6 text-sm">{formatCurrency(0)}</p>
        <p className="absolute right-0 top-6 text-sm">{formatCurrency(0)}</p>
        <ReactSlider
          step={50}
          min={0}
          max={1}
          onChange={() => {
            void 0;
          }}
          onAfterChange={() => {
            void 0;
          }}
          value={[0, 1]}
          ariaLabel={["Lower thumb (disabled)", "Upper thumb (disabled)"]}
          ariaValuetext={(state) => `Thumb value (disabled) ${state.valueNow}`}
          renderThumb={(props) => (
            <div
              {...props}
              className="absolute -top-1 h-4 w-4 rounded-full bg-indigo-400"
            ></div>
          )}
          renderTrack={(props, state) => (
            <div
              {...props}
              className={`${
                state.index === 1 ? "bg-slate-300" : "bg-slate-200"
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

const skeletonSlider = (
  <div className="pointer-events-none h-8 border-b p-8 pb-40 pl-0">
    <header className="text-md font-semibold">Shop by Price</header>
    <div className="h-6"></div>
    <div className="animate-pulse">
      <div className="mx-auto h-5 w-16 space-x-2 rounded-full bg-slate-300 text-sm text-transparent">
        <span>0</span>
        <span>-</span>
        <span>1</span>
      </div>
      <div className="h-4"></div>
      <div className="relative">
        <p className="absolute left-0 top-6 h-5 w-6 rounded-full bg-slate-300 text-sm text-transparent">
          0
        </p>
        <p className="absolute right-0 top-6 h-5 w-6 rounded-full bg-slate-300 text-sm text-transparent">
          1
        </p>
        <ReactSlider
          step={1}
          min={0}
          max={1}
          onChange={() => {
            void 0;
          }}
          onAfterChange={() => {
            void 0;
          }}
          value={[0, 1]}
          ariaLabel={["Lower thumb (disabled)", "Upper thumb (disabled)"]}
          ariaValuetext={(state) => `Thumb value (disabled) ${state.valueNow}`}
          renderThumb={(props) => (
            <div
              {...props}
              className="absolute -top-1 h-4 w-4 rounded-full bg-slate-400 "
            ></div>
          )}
          renderTrack={(props, state) => (
            <div
              {...props}
              className={`${
                state.index === 1 ? "bg-slate-300" : "bg-slate-200"
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

const PriceSlider = ({
  min,
  max,
  loading,
}: {
  min: number | undefined;
  max: number | undefined;
  loading: boolean;
}) => {
  const router = useRouter();
  const { priceFrom, priceTo } = router.query;
  const [displayPriceRange, setDisplayPriceRange] = useState<[number, number]>([
    min ?? 0,
    max ?? 1000000,
  ]);

  useEffect(() => {
    if (typeof priceFrom !== "string" || typeof priceTo !== "string") {
      setDisplayPriceRange([min ?? 0, max ?? 1000000]);
      return;
    }
    setDisplayPriceRange([parseInt(priceFrom), parseInt(priceTo)]);
  }, [priceFrom, priceTo, min, max]);

  if (loading) return skeletonSlider;
  if (!min || !max) return emptySlider;
  return (
    <div className="h-8 p-8 pb-40 pl-0">
      <header className="text-md font-semibold">Shop by Price</header>
      <div className="h-6"></div>
      <div>
        <div className="w-full space-x-2 text-center text-sm font-semibold">
          <span className="text-slate-800">
            {formatCurrency(displayPriceRange[0])}
          </span>
          <span className="text-lg leading-none text-indigo-400">-</span>
          <span className="text-slate-800">
            {formatCurrency(displayPriceRange[1])}
          </span>
        </div>
        <div className="h-4"></div>
        <div className="relative">
          <p className="absolute left-0 top-6 text-sm font-semibold text-slate-500">
            {formatCurrency(min)}
          </p>
          <p className="absolute right-0 top-6 text-sm font-semibold text-slate-500">
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
                  query: {
                    ...router.query,
                    priceFrom: e[0],
                    priceTo: e[1],
                  },
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
                role="button"
                className="absolute -top-1.5 h-5 w-5 rounded-full border-2 border-slate-50  bg-indigo-400 outline outline-2 outline-transparent  transition-all duration-150 hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-indigo-400"
              ></div>
            )}
            renderTrack={(props, state) => (
              <div
                {...props}
                className={`${
                  state.index === 1 ? "bg-slate-300" : "bg-slate-200"
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
