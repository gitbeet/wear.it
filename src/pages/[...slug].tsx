import { useRouter } from "next/router";
import React from "react";
import { ProductColor } from "@prisma/client";

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

const TypePage = () => {
  const router = useRouter();
  const { query } = router;
  const { color: colorsQuery = "" } = query;
  const addQuery = async (name: string, value: string | string[] | number) => {
    await router.push(
      {
        query: { ...router.query, [name]: value },
      },
      undefined,
      { scroll: true, shallow: true },
    );
  };

  const removeQuery = async (name: string) => {
    delete router.query[name];
    await router.push({ query: router.query }, undefined, {
      shallow: true,
      scroll: true,
    });
  };

  const colors = [colorsQuery].flat(1).filter(Boolean);
  console.log("Colors", colors);

  const handleColor = async (color: string) => {
    if (!colors.includes(color)) {
      const newColors = [...colors, color];
      await addQuery("color", newColors);
      return;
    }
    if (colors.includes(color)) {
      const filteredColors = colors.filter((c) => c !== color);
      await addQuery("color", filteredColors);
      return;
    }
    if (!colors.length) {
      await removeQuery("color");
    }
  };

  return (
    <section className="flex items-center justify-between">
      <div className="h-screen w-64 border">
        <p>Colors</p>

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
                className={`aspect-square w-8 rounded-full ${option.color}`}
              ></div>
              <p>{option.name}</p>
            </div>
          ))}
        </div>
      </div>

      {router.asPath}
    </section>
  );
};

export default TypePage;
