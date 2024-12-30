import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { formatCurrency } from "~/utilities/formatCurrency";

const PriceRangeInput = ({
  range,
  displayPrice,
  onChange,
  variant,
}: {
  range: [number, number];
  displayPrice: number;
  onChange: (n: number) => void;
  variant: "min" | "max";
}) => {
  const spanRef = useRef<HTMLParagraphElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [tempPrice, setTempPrice] = useState("0");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onChange(parseInt(tempPrice));
  };
  useEffect(() => {
    setTempPrice(displayPrice.toString());
  }, [displayPrice]);
  return (
    <form onSubmit={handleSubmit} className="group relative">
      <p
        onClick={() => inputRef.current?.focus()}
        ref={spanRef}
        className="relative left-0 top-0 z-0 rounded-md border bg-white p-2.5 text-slate-600 shadow-sm group-focus-within:z-[-1]"
      >
        {formatCurrency(displayPrice)}
      </p>
      <label className="sr-only" htmlFor={`${variant}Price`}>{`${
        variant === "min" ? "Minimum" : "Maximum"
      } price`}</label>
      <input
        id={`${variant}Price`}
        aria-label={`Enter ${variant === "min" ? "minimum" : "maximum"} price`}
        step={1}
        min={range[0]}
        max={range[1]}
        type="number"
        ref={inputRef}
        className="absolute left-0 top-0 z-[-1] rounded-md border p-2.5 text-slate-600 shadow-sm [appearance:textfield]  group-focus-within:z-[0] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={tempPrice}
        onChange={(e) => {
          setTempPrice(e.target.value);
        }}
        onBlur={() => setTempPrice(displayPrice.toString())}
        style={{
          width: `${spanRef.current?.getBoundingClientRect().width}px`,
          height: `${spanRef.current?.getBoundingClientRect().height}px`,
        }}
      />
    </form>
  );
};

export default PriceRangeInput;
