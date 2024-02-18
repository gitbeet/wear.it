import { ProductSize } from "@prisma/client";
import { useRouterQuery } from "./useRouterQuery";

export const useFilterBySize = () => {
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

  return { sizes, sizesQueryArray, handleSizes };
};
