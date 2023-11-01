import { useRouter } from "next/router";

export const useRouterQuery = () => {
  const router = useRouter();
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

  return { addQuery, removeQuery, router };
};
