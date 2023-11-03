import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";

import React from "react";
import { appRouter } from "~/server/api/root";
import { api } from "~/utils/api";
import SuperJSON from "superjson";
import { db } from "~/server/db";
import LoadingPage from "~/components/loading";

const Product = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: productData, isLoading: isGettingProductData } =
    api.product.getSingleProduct.useQuery({ id });
  if (isGettingProductData) return <LoadingPage />;
  if (!productData) return <h1>Something went wrong.</h1>;
  return (
    <section>
      <div>{productData.name}</div>
    </section>
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
