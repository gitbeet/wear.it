import type { CategoryType, ProductColor, ProductSize } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { api } from "~/utils/api";
import ProductCard from "./ProductCard";

const Products = () => {
  const router = useRouter();
  const { color, size, slug } = router.query as {
    color: string | string[] | undefined;
    size: string | string[] | undefined;
    slug: string[] | undefined;
  };

  const queryInput = useMemo(
    () => ({
      // .flat(1) is used so we get an array if color is both a string or a string[] , filter(Boolean) -> filter falsey values
      color: [color].flat(1).filter(Boolean) as ProductColor[],
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
    <section className="grid w-full grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-2 border">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default Products;
