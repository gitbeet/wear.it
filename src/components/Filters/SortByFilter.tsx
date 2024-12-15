import { chevronIcon } from "public/assets/icons";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useSortItems } from "~/hooks/useSortItems";
import ListMenu from "../UI/ListMenu/ListMenu";
interface Props {
  showSort: boolean;
  setShowSort: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

export type SortOptionType = "newest" | "high-to-low" | "low-to-high";

const SortByFilter = ({ loading, showSort, setShowSort }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { handleChangeSort, sortQueryArray } = useSortItems();
  const [startItem, setStartItem] = useState<"top" | "bottom">("top");
  const handleChange = async (option: SortOptionType) => {
    await handleChangeSort(option);
    setShowSort(false);
  };

  const focusSortButton = () => {
    buttonRef.current?.focus();
  };

  const buttonJsx = (
    <button
      ref={buttonRef}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setStartItem("top");
          setShowSort(true);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setStartItem("bottom");
          setShowSort(true);
        }
      }}
      onClick={() => setShowSort((prev) => !prev)}
      className="flex cursor-pointer items-center gap-2 font-semibold text-slate-800"
      role="listbox"
    >
      <span>Sort by</span>
      <div
        className={`${
          showSort ? "-rotate-180" : ""
        } transition-transform duration-300`}
      >
        {chevronIcon}
      </div>
    </button>
  );

  const listItems = [
    {
      onClick: () => handleChange("newest"),
      selected: sortQueryArray[0] === "newest",
      text: "Newest",
    },
    {
      onClick: () => handleChange("high-to-low"),
      selected: sortQueryArray[0] === "high-to-low",
      text: "Price: High-Low",
    },
    {
      onClick: () => handleChange("low-to-high"),
      selected: sortQueryArray[0] === "low-to-high",
      text: "Price: Low-High",
    },
  ];

  return (
    <>
      <div
        className={` ${
          loading && "pointer-events-none opacity-50"
        } z-60 relative`}
      >
        {buttonJsx}
        <ListMenu
          className="absolute left-4 z-[50] -translate-x-1/2"
          start={startItem}
          items={listItems}
          show={showSort}
          onClose={() => {
            setShowSort(false);
            focusSortButton();
          }}
          backdropZIndex={40}
        />
      </div>
    </>
  );
};

export default SortByFilter;
