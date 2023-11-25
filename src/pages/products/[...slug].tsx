import type { CategoryType, ProductColor, ProductSize } from "@prisma/client";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import ColorFilter from "~/components/Filters/ColorFilter";
import PriceFilter from "~/components/Filters/PriceFilter";
import SizeFilter from "~/components/Filters/SizeFilter";
import SortSelectMenu from "~/components/Filters/SortSelectMenu";
import ToggleFilters from "~/components/Filters/ToggleFilters";
import Products from "~/components/Products";
import { api } from "~/utils/api";

export const SkeletonCard = ({ slider = false }: { slider?: boolean }) => {
  return (
    <div
      className={`${
        slider ? "relative min-h-[500px] min-w-[400px] snap-start" : ""
      }  animate-pulse bg-slate-50 pb-2  text-slate-800`}
    >
      <div>
        <div className="relative">
          <div className="absolute bottom-4 right-4 z-10  h-10 w-10   rounded-full bg-slate-400"></div>
          <div className="relative aspect-square w-full bg-slate-200" />
          <p className="absolute bottom-2 left-4 h-4 w-16 rounded-full bg-slate-400"></p>
        </div>
      </div>
      <div className="h-4"></div>
      <div className="min-h-[4rem] overflow-hidden pl-4">
        <p className="h-4 w-3/4 rounded-full bg-slate-400"></p>
        <div className="h-1"></div>
        <p className="h-4 w-16 rounded-full bg-slate-400"></p>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <section className=" grid w-full grow content-start gap-2  md:grid-cols-3  ">
      {[...Array(12).keys()].map((bone) => (
        <div key={bone} className=" bg-slate-100 pb-2">
          <div>
            <div className="relative">
              <div className="absolute bottom-4 right-4 z-10  h-10 w-10   rounded-full bg-slate-400"></div>
              <div className="relative aspect-square w-full bg-slate-200" />
              <p className="absolute bottom-2 left-4 h-4 w-16 rounded-full bg-slate-400"></p>
            </div>
          </div>
          <div className="h-4"></div>
          <div className=" min-h-[4rem] overflow-hidden pl-4">
            <p className="h-4 w-3/4 rounded-full bg-slate-400"></p>
            <div className="h-1"></div>
            <p className=" h-4 w-16  rounded-full bg-slate-400"></p>
          </div>
        </div>
      ))}
    </section>
  );
};

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalProducts: number;
  pageSize: number;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalProducts,
  pageSize,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalProducts / pageSize);
  const isThereNextPage = currentPage < totalPages;
  return (
    <div className="flex items-center justify-center gap-16 p-4">
      <p
        role="button"
        className={`${
          currentPage <= 1 ? "cursor-default text-slate-500" : "text-slate-800"
        } font-semibold`}
        onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1))}
      >
        Previous
      </p>
      <div className="flex items-center">
        <label htmlFor="pagination" className=" pr-2 text-slate-600">
          Page
        </label>
        <select
          disabled={totalPages < 2}
          id="pagination"
          className="pl-4"
          value={currentPage ?? 1}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCurrentPage(parseInt(e.target.value))
          }
        >
          {[...Array(totalPages < 2 ? 1 : totalPages).keys()].map((el) => (
            <option key={el + 1}>{el + 1}</option>
          ))}
        </select>
        <span className="pl-2 text-slate-600">
          {" "}
          of {totalPages < 2 ? 1 : totalPages}
        </span>
      </div>
      <p
        role="button"
        className={`${
          !isThereNextPage ? "cursor-default text-slate-500" : "text-slate-800"
        } font-semibold`}
        onClick={() =>
          setCurrentPage((prev) => (isThereNextPage ? prev + 1 : prev))
        }
      >
        Next
      </p>
    </div>
  );
};

const ProductsPage = () => {
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
          {` Product${data.totalProducts > 1 ? "s" : ""} found`}
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
          <Skeleton />
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
  );
};

export default ProductsPage;
