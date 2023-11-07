import { chevronIcon } from "public/assets/icons";
import type { Dispatch, SetStateAction } from "react";
import { useRouterQuery } from "~/hooks/useRouterQuery";
interface Props {
  showSort: boolean;
  setShowSort: Dispatch<SetStateAction<boolean>>;
}

const SortSelectMenu = ({ showSort, setShowSort }: Props) => {
  const { addQuery, removeQuery, router } = useRouterQuery();
  const { sort = [""] } = router.query;
  const sortQueryArray = [sort].flat(1).filter(Boolean);
  const handleChangeSort = async (option: string) => {
    if (!sortQueryArray.includes(option)) {
      void addQuery("sort", option);
    } else {
      await removeQuery("sort");
    }
    setShowSort(false);
  };

  return (
    <div className="relative z-50 ">
      <div
        onClick={() => setShowSort((prev) => !prev)}
        role="listbox"
        className="flex cursor-pointer items-center gap-2 font-semibold text-gray-800"
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
        } absolute left-4 flex w-max -translate-x-1/2 flex-col gap-2  rounded-lg bg-gray-50 p-6 text-right font-semibold transition-all duration-500`}
      >
        <p
          onClick={() => handleChangeSort("newest")}
          role="listitem"
          className={`cursor-pointer text-slate-800 hover:text-slate-400`}
        >
          Newest
        </p>
        <p
          onClick={() => handleChangeSort("high-to-low")}
          role="listitem"
          className={`cursor-pointer text-slate-800 hover:text-slate-400`}
        >
          Price: High-Low
        </p>
        <p
          onClick={() => handleChangeSort("low-to-high")}
          role="listitem"
          className={`cursor-pointer text-slate-800 hover:text-slate-400`}
        >
          Price: Low-High
        </p>
      </div>
    </div>
  );
};

export default SortSelectMenu;
