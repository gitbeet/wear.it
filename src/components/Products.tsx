import type { CategoryType, ProductColor, ProductSize } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { api } from "~/utils/api";
import ProductCard from "./ProductCard";
import LoadingPage from "./loading";

const Products = () => {
  const router = useRouter();
  const { color, size, slug, sort } = router.query as {
    color: string | string[] | undefined;
    size: string | string[] | undefined;
    slug: string[] | undefined;
    sort: "newest" | "high-to-low" | "low-to-high";
  };

  const queryInput = useMemo(
    () => ({
      // .flat(1) is used so we get an array if color is both a string or a string[] , filter(Boolean) -> filter falsey values
      color: [color].flat(1).filter(Boolean) as ProductColor[],
      size: [size].flat(1).filter(Boolean) as ProductSize[],
      type: slug?.[0]?.toUpperCase() as CategoryType,
      slug: slug?.[1],
      sort,
    }),
    [color, size, slug, sort],
  );

  const { data, isLoading } = api.product.getAll.useQuery(queryInput);

  if (isLoading) return <LoadingPage />;
  if (!data) return <h1>Something went wrong...</h1>;

  return (
    <>
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};

export default Products;
