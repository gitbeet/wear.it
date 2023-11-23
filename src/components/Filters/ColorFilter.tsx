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

const ColorFilter = () => {
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
    <div className="border-b  border-slate-300 p-8 pl-0">
      <p className="font-bold">Colors</p>
      <div className="h-4"></div>
      <div className="grid grid-cols-3 items-center justify-center gap-4">
        {colorOptions.map((option) => {
          const lowerCaseName = option.name.toLowerCase();
          const isIncluded = colorsQueryArray.includes(option.name);
          return (
            <div
              key={option.id}
              className="flex w-full flex-col items-center justify-center gap-1 "
            >
              <div
                role="button"
                onClick={() => handleColor(option.name)}
                className={`aspect-square w-[1.625rem] rounded-full ${
                  option.color
                } border-[2px] outline outline-2 ${
                  isIncluded
                    ? "border-slate-100 outline-slate-500 "
                    : "border-slate-200 outline-transparent "
                }`}
              ></div>
              <p
                className={`${
                  isIncluded ? "text-slate-900" : "text-slate-600"
                } text-sm `}
              >
                {option.name.charAt(0) + lowerCaseName.slice(1)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorFilter;
