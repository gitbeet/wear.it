import { useFilterBySize } from "~/hooks/useFilterBySize";
const SizeFilter = ({ loading }: { loading: boolean }) => {
  const { sizes, sizesQueryArray, handleSizes } = useFilterBySize();

  return (
    <div className="p-8 pl-0">
      <p className="font-bold">Sizes</p>
      <div className="h-4"></div>
      <ul className="flex appearance-none flex-col gap-0.5 pl-4">
        {sizes.map((size, i) => {
          const isIncluded = sizesQueryArray.includes(size);
          return (
            <li
              className={`${
                loading && "pointer-events-none opacity-50"
              } flex w-fit cursor-pointer`}
              key={i}
            >
              <input
                className="w-4 cursor-pointer  accent-indigo-500"
                type="checkbox"
                id={size}
                onChange={() => handleSizes(size)}
                checked={isIncluded}
              />
              <label
                className={`${
                  isIncluded ? "text-slate-800" : "text-slate-500"
                } cursor-pointer pl-2 pr-4 text-sm font-semibold transition-colors duration-150 hover:text-slate-800`}
                htmlFor={size}
              >
                {size}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SizeFilter;
