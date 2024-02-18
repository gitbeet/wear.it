import { useFilterByColor } from "~/hooks/useFilterByColor";
import { colorOptions } from "~/maps";

const ColorFilter = ({ loading }: { loading: boolean }) => {
  const { colorsQueryArray, handleColor } = useFilterByColor();
  return (
    <div className=" p-8 pl-0">
      <p className="font-bold">Colors</p>
      <div className="h-4"></div>
      <div className="grid grid-cols-3 items-center justify-center gap-2.5">
        {colorOptions.map((option) => {
          const lowerCaseName = option.color.toLowerCase();
          const isIncluded = colorsQueryArray.includes(option.color);
          return (
            <div
              key={option.id}
              className="group flex w-full cursor-pointer flex-col items-center justify-center gap-1"
            >
              <button
                role="checkbox"
                id={`color-filter-${option.color}`}
                aria-checked={isIncluded}
                onClick={() => handleColor(option.color)}
                className={` ${
                  loading
                    ? "pointer-events-none cursor-not-allowed opacity-25"
                    : "cursor-pointer"
                } aspect-square w-[1.625rem] rounded-full ${
                  option.colorClass
                } border-[2px] outline outline-2 ${
                  isIncluded
                    ? "border-slate-100 outline-indigo-400 "
                    : "border-slate-200 outline-transparent "
                }`}
              ></button>
              <label
                htmlFor={`color-filter-${option.color}`}
                className={`${
                  isIncluded ? "text-slate-800" : "text-slate-500"
                } cursor-pointer text-sm font-semibold transition-colors duration-150 group-hover:text-slate-800`}
              >
                {option.color.charAt(0) + lowerCaseName.slice(1)}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorFilter;
