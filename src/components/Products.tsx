import type { CategoryType, ProductColor, ProductSize } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { api } from "~/utils/api";
import ProductCard from "./ProductCard";

const Skeleton = () => {
  return [...Array(12).keys()].map((bone) => (
    <div key={bone} className=" animate-pulse bg-gray-100 pb-2">
      <div>
        <div className="relative">
          <div className="absolute bottom-4 right-4 z-10  h-10 w-10   rounded-full bg-gray-400"></div>
          <div className="relative aspect-square w-full bg-slate-200" />

          <p className="absolute bottom-2 left-4 h-4 w-16 rounded-full bg-gray-400"></p>
        </div>
      </div>

      <div className="h-4"></div>

      <div className="min-h-[4rem] overflow-hidden pl-4">
        <p className="h-4 w-3/4 rounded-full bg-gray-400"></p>
        <div className="h-1"></div>
        <p className="h-4 w-16 rounded-full bg-gray-400 text-gray-500"></p>
      </div>
    </div>
  ));
};

const Products = ({ currentPage }: { currentPage: number }) => {
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
      type: [slug?.[0]?.toUpperCase() as CategoryType],
      slug: slug?.[1],
      sort,
    }),
    [color, size, slug, sort],
  );

  const { data, isLoading } = api.product.getAll.useQuery(queryInput);

  if (isLoading)
    return (
      <div className="grid w-full grow grid-cols-3 content-start  gap-2  ">
        <Skeleton />
      </div>
    );
  if (!data) return <h1>Something went wrong...</h1>;

  return (
    <div className="flex flex-col items-center gap-16">
      {" "}
      <div className="grid w-full grow grid-cols-3 content-start  gap-2  ">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
