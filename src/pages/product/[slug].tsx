import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";

import React, { useState } from "react";
import { appRouter } from "~/server/api/root";
import { api } from "~/utils/api";
import SuperJSON from "superjson";
import { db } from "~/server/db";
import LoadingPage from "~/components/loading";
import { colorOptions } from "~/components/Filters/ColorFilter";
import type { ProductSize, ProductColor } from "@prisma/client";
import Button from "~/components/Button";
import Image from "next/image";

const Product = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);

  const { data: productData, isLoading: isGettingProductData } =
    api.product.getSingleProduct.useQuery({ id });
  if (isGettingProductData) return <LoadingPage />;
  if (!productData) return <h1>Something went wrong.</h1>;
  const { colors, name, price, sizes, description, category, images } =
    productData;
  return (
    <div>
      <section className="mx-auto flex max-w-[1200px] justify-between border pt-24">
        {/* IMAGE BLOCK */}
        <div className="flex h-[500px] gap-4">
          <div className="">
            {images.map((image) => (
              <Image
                className="bg-slate-200"
                key={image.id}
                width={64}
                height={64}
                src={image.imageURL}
                alt="thumbnail"
              />
            ))}
          </div>
          <Image
            className="bg-slate-200"
            src={images[0]?.imageURL}
            alt="product image"
            width={550}
            height={550}
          />
        </div>
        {/* INFO BLOCK */}
        <div className="h-[700px] w-[500px] ">
          <p>{name}</p>
          <p>{category.name}</p>
          <p>{price}</p>
          <p>Colors</p>
          <p>
            {colors.map((c, i) => (
              <>
                <div
                  role="button"
                  onClick={() => setSelectedColor(c)}
                  className={`aspect-square w-[1.625rem] rounded-full ${colorOptions.find(
                    (option) => option.name === c,
                  )?.color} border-[2px] outline outline-2 ${
                    selectedColor === c
                      ? "border-gray-100 outline-gray-500 "
                      : "border-gray-200 outline-transparent "
                  }`}
                ></div>
              </>
            ))}
          </p>
          <p>Select Size</p>
          <div className="flex gap-2">
            {sizes.map((s, i) => (
              <span
                role="button"
                onClick={() => setSelectedSize(s)}
                className={`${
                  s === selectedSize ? "border-slate-800" : "border-slate-300"
                } w-16 rounded-sm border py-2 text-center`}
                key={i}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <Button text="Add to Bag" onClick={() => void 0} />
            <Button text="Add to Favorites" onClick={() => void 0} ghost />
          </div>

          <p>Description</p>
          <p>{description}</p>
          <p>Reviews (420)</p>
        </div>
      </section>
      <div className="h-32"></div>
      {/* RECCOMENDED BLOCK */}
      <section className="h-[300px] w-full border border-black"></section>
    </div>
  );
};

export default Product;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const slug = context.params?.slug;
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      db,
    },
    transformer: SuperJSON,
  });

  if (typeof slug !== "string") {
    throw new Error("no slug");
  }

  await helpers.product.getSingleProduct.prefetch({ id: slug });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id: slug,
    },
  };
};
