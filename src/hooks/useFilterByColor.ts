import { useRouter } from "next/router";
import { useRouterQuery } from "./useRouterQuery";

export const useFilterByColor = () => {
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
  return { colorsQueryArray, handleColor };
};
