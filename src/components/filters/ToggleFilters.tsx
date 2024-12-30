import { filtersIcon } from "public/assets/icons";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
}

const ToggleFilters = ({ showFilters, setShowFilters }: Props) => {
  return (
    <button
      onClick={() => setShowFilters((prev) => !prev)}
      className="flex items-center gap-2 font-semibold text-slate-800"
    >
      <span>{showFilters ? "Hide" : "Show"} Filters</span>
      {filtersIcon}
    </button>
  );
};

export default ToggleFilters;
