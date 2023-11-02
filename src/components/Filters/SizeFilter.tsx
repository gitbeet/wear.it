import { ProductSize } from "@prisma/client";
import { useRouterQuery } from "../../hooks/useRouterQuery";
const SizeFilter = () => {
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
    <div className="border-b border-gray-300 p-8">
      <p className="font-bold">Sizes</p>
      <div className="h-4"></div>
      <div className="flex flex-col gap-1 pl-4">
        {sizes.map((size, i) => {
          const isIncluded = sizesQueryArray.includes(size);

          return (
            <div className="flex gap-2" key={i}>
              <input
                className="w-4"
                type="checkbox"
                id={size}
                onChange={() => handleSizes(size)}
                checked={isIncluded}
              />
              <label
                className={`${
                  isIncluded ? "text-gray-800" : "text-gray-600"
                } text-sm font-semibold `}
                htmlFor={size}
              >
                {size}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SizeFilter;
