import type { CategoryType, ProductColor, ProductSize } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { api } from "~/utils/api";

const Products = () => {
  const router = useRouter();
  const { color, size, slug } = router.query as {
    color: string | string[] | undefined;
    size: string | string[] | undefined;
    slug: string[] | undefined;
  };

  const queryInput = useMemo(
    () => ({
      color: color as ProductColor[],
      size: [size].flat(1).filter(Boolean) as ProductSize[],
      type: slug?.[0]?.toUpperCase() as CategoryType,
      slug: slug?.[1],
    }),
    [color, size, slug],
  );

  const { data, isLoading } = api.product.getAll.useQuery(queryInput);

  if (isLoading) return <h1>Loading...</h1>;
  if (!data) return <h1>Something went wrong...</h1>;

  return (
    <section className="w-full grow border">
      {data.map((product) => (
        <h1 key={product.id}>{product.name}</h1>
      ))}
    </section>
  );
};

export default Products;
