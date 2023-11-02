import { filtersIcon } from "public/assets/icons";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
}

const ToggleFilters = ({ showFilters, setShowFilters }: Props) => {
  return (
    <div
      onClick={() => setShowFilters((prev) => !prev)}
      role="button"
      className="flex items-center gap-2 font-semibold text-gray-800"
    >
      <span>{showFilters ? "Hide" : "Show"} Filters</span>
      {filtersIcon}
    </div>
  );
};

export default ToggleFilters;
