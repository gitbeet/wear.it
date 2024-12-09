import { chevronIcon } from "public/assets/icons";
import type { Dispatch, SetStateAction } from "react";
import { useSortItems } from "~/hooks/useSortItems";
interface Props {
  showSort: boolean;
  setShowSort: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

export type SortOptionType = "newest" | "high-to-low" | "low-to-high";

const OrderByFilter = ({ loading, showSort, setShowSort }: Props) => {
  const { handleChangeSort, sortQueryArray } = useSortItems();

  const handleChange = async (option: SortOptionType) => {
    await handleChangeSort(option);
    setShowSort(false);
  };

  return (
    <>
      <div
        className={` ${
          loading && "pointer-events-none opacity-50"
        } relative z-40`}
      >
        <div
          onClick={() => setShowSort((prev) => !prev)}
          role="listbox"
          className="flex cursor-pointer items-center gap-2 font-semibold text-slate-800"
        >
          <span>Sort by</span>
          <div
            className={`${
              showSort ? "-rotate-180" : ""
            } transition-transform duration-300`}
          >
            {chevronIcon}
          </div>
        </div>

        <div
          className={`${
            showSort ? "" : "opacity-0"
          } absolute left-4 z-[20] flex w-max -translate-x-1/2 flex-col gap-2  rounded-lg bg-slate-50 p-6 text-right font-semibold shadow-md transition-all  duration-500`}
        >
          <p
            onClick={() => handleChange("newest")}
            role="listitem"
            className={`${
              sortQueryArray[0] === "newest"
                ? "text-indigo-500"
                : "text-slate-800"
            } cursor-pointer hover:text-slate-400`}
          >
            Newest
          </p>
          <p
            onClick={() => handleChange("high-to-low")}
            role="listitem"
            className={`${
              sortQueryArray[0] === "high-to-low"
                ? "text-indigo-500"
                : "text-slate-800"
            } cursor-pointer hover:text-slate-400`}
          >
            Price: High-Low
          </p>
          <p
            onClick={() => handleChange("low-to-high")}
            role="listitem"
            className={`${
              sortQueryArray[0] === "low-to-high"
                ? "text-indigo-500"
                : "text-slate-800"
            } cursor-pointer hover:text-slate-400`}
          >
            Price: Low-High
          </p>
        </div>
        <div
          onClick={() => setShowSort(false)}
          className={` ${
            !showSort && "pointer-events-none"
          } fixed inset-0 z-[10] bg-black  opacity-0 transition-[opacity]`}
        ></div>
      </div>
    </>
  );
};

export default OrderByFilter;
