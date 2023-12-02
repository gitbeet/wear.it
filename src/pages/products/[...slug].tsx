import {
  CategorySEO,
  CategoryType,
  ProductColor,
  ProductSize,
  TypeSEO,
} from "@prisma/client";
import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import ColorFilter from "~/components/Filters/ColorFilter";
import PriceFilter from "~/components/Filters/PriceFilter";
import SizeFilter from "~/components/Filters/SizeFilter";
import SortSelectMenu from "~/components/Filters/SortSelectMenu";
import ToggleFilters from "~/components/Filters/ToggleFilters";
import Products from "~/components/Products";
import { api } from "~/utils/api";
import { db } from "~/server/db";
import Pagination from "~/components/Pagination";

const skeleton = (
  <section className="grid w-full grow content-start gap-2 sm:grid-cols-2 lg:grid-cols-3">
    {[...Array(12).keys()].map((bone) => (
      <div key={bone} className="pb-2">
        <div>
          <div className="relative">
            <div className="absolute bottom-4 right-4 z-10  h-10 w-10   rounded-full bg-slate-300"></div>
            <div className="relative aspect-square w-full rounded-lg bg-slate-200" />
            <p className="absolute bottom-2 left-4 h-4 w-16 rounded-full bg-slate-300"></p>
          </div>
        </div>
        <div className="h-4"></div>
        <div className=" min-h-[4rem] overflow-hidden pl-4">
          <p className="h-4 w-3/4 rounded-full bg-slate-300"></p>
          <div className="h-1"></div>
          <p className=" h-4 w-16  rounded-full bg-slate-300"></p>
        </div>
      </div>
    ))}
  </section>
);

const ProductsPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { seo } = props;
  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const [showSort, setShowSort] = useState(false);
  const router = useRouter();
  const { color, size, slug, sort, priceFrom, priceTo } = router.query as {
    color: string | string[] | undefined;
    size: string | string[] | undefined;
    slug: string[] | undefined;
    sort: "newest" | "high-to-low" | "low-to-high" | undefined;
    priceFrom: string | undefined;
    priceTo: string | undefined;
  };
  const queryInput = useMemo(
    () => ({
      // .flat(1) is used so we get an array if color is both a string or a string[] , filter(Boolean) -> filter falsey values
      color: [color].flat(1).filter(Boolean) as ProductColor[],
      size: [size].flat(1).filter(Boolean) as ProductSize[],
      type: [slug?.[0]?.toUpperCase() as CategoryType],
      slug: slug?.[1],
      sort,
      skip: (currentPage - 1) * pageSize,
      pageSize,
      priceFrom:
        typeof priceFrom === "string" ? parseInt(priceFrom) : undefined,
      priceTo: typeof priceTo === "string" ? parseInt(priceTo) : undefined,
    }),
    [color, size, slug, sort, currentPage, priceFrom, priceTo],
  );
  const { data, isLoading } = api.product.getAll.useQuery(queryInput);

  return (
    <>
      <NextSeo
        title={seo.metaTitle ?? ""}
        description={seo.metaDescription ?? ""}
        additionalMetaTags={[
          { property: "keywords", content: seo.metaKeywords ?? "" },
        ]}
        noindex={false}
        nofollow={false}
        canonical="https://t3-ecommerce-five.vercel.app/products"
      />
      <main className="padding-x">
        <section className="flex justify-end gap-8 pt-16  ">
          <ToggleFilters
            setShowFilters={setShowFilters}
            showFilters={showFilters}
          />
          <SortSelectMenu showSort={showSort} setShowSort={setShowSort} />
        </section>
        {isLoading ? (
          <p className="h-6 w-36 animate-pulse rounded-full bg-slate-300"></p>
        ) : !data ? (
          <p></p>
        ) : (
          <p className="pb-8  text-xl">
            <span className="font-bold">{data.totalProducts}</span>
            {` Product${
              data.totalProducts > 1 || data.totalProducts === 0 ? "s" : ""
            } found`}
          </p>
        )}
        <section className="flex gap-4 overflow-hidden pt-8">
          <div
            className={`${
              showFilters ? "" : "-ml-64"
            } k  min-w-[250px] transition-all duration-500`}
          >
            <PriceFilter
              loading={isLoading}
              min={data?.minPrice._min.price ?? 0}
              max={data?.maxPrice._max.price ?? 10000}
            />
            <div className="w-full border-b border-slate-200"></div>
            <SizeFilter loading={isLoading} />
            <div className="w-full border-b border-slate-200"></div>
            <ColorFilter loading={isLoading} />
          </div>
          {isLoading ? (
            skeleton
          ) : !data ? (
            <h1>No data</h1>
          ) : (
            <Products products={data.products} />
          )}
        </section>

        <div className="mx-auto">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalProducts={data?.totalProducts ?? 0}
            pageSize={pageSize}
          />
        </div>
      </main>
    </>
  );
};

type SeoStaticPropType = {
  seo:
    | {
        metaDescription: string | null;
        metaKeywords: string | null;
        metaTitle: string | null;
        type: CategoryType;
      }
    | Record<string, never>;
};

export const getStaticProps: GetStaticProps<SeoStaticPropType> = async (
  context: GetStaticPropsContext,
) => {
  const slug = context.params?.slug;
  if (!slug?.[0]) {
    return {
      props: {
        seo: {},
      },
    };
  }
  // If no category selected (clothing , shoes, hats) get the type (men,women,kids) seo data
  if (!slug?.[1]) {
    const type = slug[0].toUpperCase() as CategoryType;
    const typeSEO = await db.typeSEO.findUnique({
      where: {
        type,
      },
      select: {
        metaDescription: true,
        metaKeywords: true,
        metaTitle: true,
        type: true,
      },
    });
    // TODO : Handle ERROR in a better way
    if (!typeSEO) {
      return {
        props: {
          seo: {},
        },
      };
    }
    return {
      props: {
        seo: typeSEO,
      },
    };
  }
  const category = await db.productCategory.findUnique({
    where: {
      slug: slug[1],
    },
    include: {
      seo: {
        select: {
          metaDescription: true,
          metaKeywords: true,
          metaTitle: true,
          type: true,
        },
      },
    },
  });

  if (!category?.seo) {
    return {
      props: {
        seo: {},
      },
    };
  }
  const mySeo = category.seo.find(
    (seoData) => seoData.type.toLowerCase() === slug[0]?.toLowerCase(),
  );

  if (!mySeo) {
    return {
      props: {
        seo: {},
      },
    };
  }
  return {
    props: {
      seo: mySeo,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await db.productCategory.findMany();
    // Function to generate all paths
    const generatePaths = (): {
      params: { slug: [string, string] | [string] };
    }[] => {
      // Define initial/empty paths variable
      const paths: { params: { slug: [string, string] | [string] } }[] = [];
      // Get all the types (men,women,kids)
      const types = Object.keys(CategoryType) as CategoryType[];
      // For each type :
      //  push the type itself as a path (/men , /women ...)
      // push the type/category for all the possible type/category paths (men/shoes , women/shoes ...)
      types.forEach((type) => {
        paths.push({ params: { slug: [type.toLowerCase()] } });
        categories.forEach((category) => {
          if (!category.types.some((t) => t === type)) return;
          paths.push({ params: { slug: [type.toLowerCase(), category.slug] } });
        });
      });
      return paths;
    };
    const paths = generatePaths();
    return {
      paths,
      // No fallback , we don't want to navigate to a non-existing category , does not make sense
      fallback: false,
    };
  } catch (error) {
    console.error("Error while fetching categories:");
    return { paths: [], fallback: false };
  } finally {
    await db.$disconnect();
  }
};

export default ProductsPage;
