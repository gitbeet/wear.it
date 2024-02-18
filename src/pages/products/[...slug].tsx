import {
  CategoryType,
  type ProductColor,
  type ProductSize,
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
import OrderByFilter from "~/components/Filters/OrderByFilter";
import ToggleFilters from "~/components/Filters/ToggleFilters";
import Products from "~/components/Products";
import { api } from "~/utils/api";
import { db } from "~/server/db";
import Pagination from "~/components/Pagination";
import { useModalsContext } from "~/context/modalsContext";
import MobileFiltersMenu from "~/components/MobileFiltersMenu";
import { filtersIcon } from "public/assets/icons";

const skeleton = (
  <section className="grid w-full grow grid-cols-2 content-start gap-2 lg:grid-cols-3">
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
  const { setShowMobileFiltersMenu } = useModalsContext();
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
  const { data, isLoading } = api.product.getAllSQL.useQuery(queryInput);

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
        canonical={`https://t3-ecommerce-five.vercel.app/products/${
          seo.type?.toLowerCase() ?? ""
        }`}
        openGraph={{
          url: `https://t3-ecommerce-five.vercel.app/${seo.type?.toLowerCase()}`,
          title: `${seo.metaTitle} - wear.it`,
          description: seo.metaDescription ?? "",
          site_name: "wear.it",
          images: [
            {
              url: seo.metaOGImage ?? "",
              width: 800,
              height: 600,
              alt: `Hero image for contact page`,
            },
          ],
        }}
      />
      <main className="flex h-full w-full grow flex-col items-stretch justify-between">
        <section>
          <section className="padding-x hidden items-center justify-between pt-16 md:flex">
            {isLoading ? (
              <div className="  flex items-end justify-between">
                <p className="h-6 w-36 animate-pulse rounded-full bg-slate-300"></p>
              </div>
            ) : !data ? (
              <div className="  flex items-end justify-between ">
                <p className="invisible">X Products found.</p>
              </div>
            ) : (
              <div className=" flex items-end justify-between ">
                <p className="text-slate-600">
                  <span className="font-bold">{data.totalProducts}</span>
                  {` Product${
                    data.totalProducts &&
                    (data?.totalProducts > 1 || data.totalProducts === 0)
                      ? "s"
                      : ""
                  } found`}
                </p>

                <div
                  role="button"
                  onClick={() => setShowMobileFiltersMenu(true)}
                  className="flex cursor-pointer items-center gap-2 md:hidden"
                >
                  <span className="md:hidden">Filters</span>
                  {filtersIcon}
                </div>
              </div>
            )}
            <div className="justify-end gap-8 md:flex">
              <ToggleFilters
                setShowFilters={setShowFilters}
                showFilters={showFilters}
              />
              <OrderByFilter
                loading={isLoading}
                showSort={showSort}
                setShowSort={setShowSort}
              />
            </div>
          </section>
          {/* MOBILE */}
          {isLoading ? (
            <div className=" padding-x flex items-end justify-between pt-8 md:hidden">
              <p className="h-6 w-36 animate-pulse rounded-full bg-slate-300"></p>
              <div className="pointer-events-none flex cursor-pointer items-center gap-2 opacity-50 md:hidden">
                {filtersIcon} <p className="md:hidden">Filters</p>
              </div>{" "}
            </div>
          ) : !data ? (
            <div className=" padding-x flex items-end justify-between pt-8 md:hidden">
              <p className="invisible">X Products found.</p>
              <div className="flex cursor-pointer items-center gap-2 md:hidden">
                {filtersIcon} <p className="md:hidden">Filters</p>
              </div>
            </div>
          ) : (
            <div className="padding-x flex items-end justify-between pt-8  md:hidden">
              <p className="text-slate-600">
                <span className="font-bold">{data.totalProducts}</span>
                {` Product${
                  data.totalProducts &&
                  (data?.totalProducts > 1 || data.totalProducts === 0)
                    ? "s"
                    : ""
                } found`}
              </p>

              <div
                role="button"
                onClick={() => setShowMobileFiltersMenu(true)}
                className="flex cursor-pointer items-center gap-2 md:hidden"
              >
                <span className="md:hidden">Filters</span>
                {filtersIcon}
              </div>
            </div>
          )}
          <section className="flex gap-4 overflow-hidden pt-8">
            <div
              className={`${
                showFilters ? "" : "-ml-64"
              } padding-x  hidden min-w-[250px] transition-all duration-500 md:block`}
            >
              <PriceFilter
                loading={isLoading}
                min={data?.minPrice ?? 0}
                max={data?.maxPrice ?? 10000}
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
        </section>
        <div className="mx-auto">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalProducts={data?.totalProducts ?? 0}
            pageSize={pageSize}
          />
        </div>
        <MobileFiltersMenu
          min={data?.minPrice ?? 0}
          max={data?.maxPrice ?? 10000}
          loading={isLoading}
        />
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
        metaOGImage: string | null;
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
        metaOGImage: true,
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
          metaOGImage: true,
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
