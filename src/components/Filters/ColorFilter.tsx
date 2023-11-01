import { type ProductColor } from "@prisma/client";
import { useRouter } from "next/router";
import { useRouterQuery } from "~/hooks/useRouterQuery";

type ColorOption = {
  name: ProductColor;
  color: string;
  id: number;
};

const colorOptions: ColorOption[] = [
  { id: 1, name: "RED", color: "bg-red-500" },
  { id: 2, name: "PURPLE", color: "bg-purple-500" },
  { id: 3, name: "BLACK", color: "bg-black" },
  { id: 4, name: "BLUE", color: "bg-blue-500" },
  { id: 5, name: "ORANGE", color: "bg-orange-500" },
  { id: 6, name: "WHITE", color: "bg-white" },
  { id: 7, name: "GREEN", color: "bg-green-500" },
  { id: 8, name: "PINK", color: "bg-pink-500" },
];

const ColorFilter = () => {
  const router = useRouter();
  const { addQuery, removeQuery } = useRouterQuery();
  const { color: colorsQuery = "" } = router.query;
  const colorsQueryArray = [colorsQuery].flat(1).filter(Boolean);

  const handleColor = async (color: string) => {
    console.log("Colors", colorsQueryArray);
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
    <div className="border-b border-slate-700 p-8">
      <p className="font-bold">Colors</p>
      <div className="h-4"></div>
      <div className="grid grid-cols-2 items-center justify-center gap-4">
        {colorOptions.map((option) => (
          <div
            key={option.id}
            className="flex w-full flex-col items-center justify-center gap-1 "
          >
            <div
              role="button"
              onClick={() => handleColor(option.name.toLowerCase())}
              className={`aspect-square w-8 rounded-full ${
                option.color
              } border border-transparent ${
                colorsQueryArray.includes(option.name.toLowerCase()) &&
                "border-yellow-500"
              }`}
            ></div>
            <p>{option.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
