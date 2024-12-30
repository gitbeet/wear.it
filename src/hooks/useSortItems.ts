import type { SortOptionType } from "~/components/filters/SortByFilter";
import { useRouterQuery } from "./useRouterQuery";

export const useSortItems = () => {
  const { addQuery, removeQuery, router } = useRouterQuery();
  const { sort = [""] } = router.query;
  const sortQueryArray = [sort].flat(1).filter(Boolean);
  const handleChangeSort = async (option: SortOptionType) => {
    if (!sortQueryArray.includes(option)) {
      void addQuery("sort", option);
    } else {
      await removeQuery("sort");
    }
  };
  return { sortQueryArray, handleChangeSort };
};
