import { ProductSize } from "@prisma/client";
import { useRouterQuery } from "../../hooks/useRouterQuery";
const SizeFilter = ({ loading }: { loading: boolean }) => {
  const sizes = Object.keys(ProductSize);
  const { addQuery, removeQuery, router } = useRouterQuery();
  const { size: sizesQuery = "" } = router.query;
  const sizesQueryArray = [sizesQuery].flat(1).filter(Boolean);

  const handleSizes = async (size: string) => {
    if (!sizesQueryArray.includes(size)) {
      const newSizes = [...sizesQueryArray, size];
      await addQuery("size", newSizes);
      return;
    }
    if (sizesQueryArray.includes(size)) {
      const filteredSizes = sizesQueryArray.filter((s) => s !== size);
      await addQuery("size", filteredSizes);
      return;
    }
    if (!sizesQueryArray.length) {
      await removeQuery("size");
    }
  };

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
                className="w-4 cursor-pointer"
                type="checkbox"
                id={size}
                onChange={() => handleSizes(size)}
                checked={isIncluded}
              />
              <label
                className={`${
                  isIncluded ? "text-slate-800" : "text-slate-500"
                } hover-hover:hover:text-slate-800 cursor-pointer pl-2 pr-4 text-sm  font-semibold transition-colors duration-150`}
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
