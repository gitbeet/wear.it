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
    <div className="border-b border-slate-700 p-8">
      <p className="font-bold">Sizes</p>
      <div className="h-4"></div>

      {sizes.map((size, i) => (
        <div className="flex gap-2" key={i}>
          <input
            type="checkbox"
            id={size}
            onChange={() => handleSizes(size)}
            checked={sizesQueryArray.includes(size)}
          />
          <label htmlFor={size}>{size}</label>
        </div>
      ))}
    </div>
  );
};

export default SizeFilter;
