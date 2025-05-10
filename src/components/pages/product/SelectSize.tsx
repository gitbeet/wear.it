import { type ProductSize } from "@prisma/client";
import { type RouterOutputs } from "~/utils/api";
type Sizes = NonNullable<RouterOutputs["product"]["getSingleProduct"]>["sizes"];
const SelectSize = ({
  error,
  sizes,
  handleSize,
  selectedSize,
}: {
  error: boolean;
  sizes: Sizes;
  handleSize: (size: ProductSize) => void;
  selectedSize: ProductSize | null;
}) => {
  return (
    <div>
      <p
        className={`${
          error ? "text-red-500" : "text-slate-800"
        } text-2xl font-semibold`}
      >
        Select Size
      </p>
      <div className="h-4"></div>
      <div
        className={`${
          error ? "border-red-500" : "border-transparent"
        } flex w-fit flex-wrap gap-2 rounded-sm border`}
      >
        {sizes.map((s, i) => (
          <button
            aria-label={`Select size ${s.size}`}
            onClick={() => handleSize(s.size)}
            className={`${
              s.size === selectedSize
                ? "border-slate-800  text-slate-800"
                : "border-slate-300 text-slate-500  hover:border-slate-400"
            } w-16 rounded-[3px] border py-2 text-center font-display font-bold shadow-sm transition active:opacity-50`}
            key={i}
          >
            {s.size}
          </button>
        ))}
      </div>

      <p
        className={`${
          error ? "visible" : "pointer-events-none invisible"
        } pt-2 text-sm text-red-500`}
      >
        Please select a size
      </p>
    </div>
  );
};

export default SelectSize;
