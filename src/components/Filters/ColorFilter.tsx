import { type ProductColor } from "@prisma/client";
import { useRouter } from "next/router";
import { useRouterQuery } from "~/hooks/useRouterQuery";

export type ColorOption = {
  name: ProductColor;
  color: string;
  id: number;
};

export const colorOptions: ColorOption[] = [
  { id: 1, name: "RED", color: "bg-red-500" },
  { id: 2, name: "PURPLE", color: "bg-purple-500" },
  { id: 3, name: "BLACK", color: "bg-black" },
  { id: 4, name: "BLUE", color: "bg-blue-500" },
  { id: 5, name: "ORANGE", color: "bg-orange-500" },
  { id: 6, name: "WHITE", color: "bg-white" },
  { id: 7, name: "GREEN", color: "bg-green-500" },
  { id: 8, name: "PINK", color: "bg-pink-300" },
  { id: 9, name: "BROWN", color: "bg-amber-900" },
  { id: 10, name: "YELLOW", color: "bg-yellow-500" },
  { id: 11, name: "GRAY", color: "bg-slate-600" },
  { id: 12, name: "BEIGE", color: "bg-yellow-600" },
];

const ColorFilter = ({ loading }: { loading: boolean }) => {
  const router = useRouter();
  const { addQuery, removeQuery } = useRouterQuery();
  const { color: colorsQuery = [""] } = router.query;
  const colorsQueryArray = [colorsQuery].flat(1).filter(Boolean);

  const handleColor = async (color: string) => {
    if (!colorsQueryArray.includes(color)) {
      const newColors = [...colorsQueryArray, color];
      await addQuery("color", newColors);
      return;
    }
    if (colorsQueryArray.includes(color)) {
      const filteredColors = colorsQueryArray.filter((c) => c !== color);
      await addQuery("color", filteredColors);
      return;
    }
    if (!colorsQueryArray.length) {
      await removeQuery("color");
    }
  };
  return (
    <div className=" p-8 pl-0">
      <p className="font-bold">Colors</p>
      <div className="h-4"></div>
      <div className="grid grid-cols-3 items-center justify-center gap-2.5">
        {colorOptions.map((option) => {
          const lowerCaseName = option.name.toLowerCase();
          const isIncluded = colorsQueryArray.includes(option.name);
          return (
            <div
              key={option.id}
              className="group flex w-full cursor-pointer flex-col items-center justify-center gap-1"
            >
              <button
                role="checkbox"
                id={`color-filter-${option.name}`}
                aria-checked={isIncluded}
                onClick={() => handleColor(option.name)}
                className={` ${
                  loading
                    ? "pointer-events-none cursor-not-allowed opacity-25"
                    : "cursor-pointer"
                } aspect-square w-[1.625rem] rounded-full ${
                  option.color
                } border-[2px] outline outline-2 ${
                  isIncluded
                    ? "border-slate-100 outline-indigo-400 "
                    : "border-slate-200 outline-transparent "
                }`}
              ></button>
              <label
                htmlFor={`color-filter-${option.name}`}
                className={`${
                  isIncluded ? "text-slate-800" : "text-slate-500"
                } cursor-pointer text-sm font-semibold transition-colors duration-150 group-hover:text-slate-800`}
              >
                {option.name.charAt(0) + lowerCaseName.slice(1)}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorFilter;
