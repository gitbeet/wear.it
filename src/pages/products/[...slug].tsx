import type { CategoryType, ProductColor, ProductSize } from "@prisma/client";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import ColorFilter from "~/components/Filters/ColorFilter";
import SizeFilter from "~/components/Filters/SizeFilter";
import SortSelectMenu from "~/components/Filters/SortSelectMenu";
import ToggleFilters from "~/components/Filters/ToggleFilters";
import Products from "~/components/Products";
import { api } from "~/utils/api";

const Skeleton = () => {
  return (
    <section className="grid w-full grow grid-cols-3 content-start  gap-2  ">
      {[...Array(12).keys()].map((bone) => (
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
          currentPage <= 1 ? "cursor-default text-gray-500" : "text-gray-800"
        } font-semibold`}
        onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1))}
      >
        Previous
      </p>
      <div className="flex items-center">
        <label htmlFor="pagination" className=" pr-2 text-gray-600">
          Page
        </label>
        <select
          id="pagination"
          className="pl-4"
          value={currentPage}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCurrentPage(parseInt(e.target.value))
          }
        >
          {[...Array(totalPages).keys()].map((el) => (
            <option key={el + 1}>{el + 1}</option>
          ))}
        </select>
        <span className="pl-2 text-gray-600"> of {totalPages}</span>
      </div>
      <p
        role="button"
        className={`${
          !isThereNextPage ? "cursor-default text-gray-500" : "text-gray-800"
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
  const pageSize = 1;
  const [currentPage, setCurrentPage] = useState(1);

  const [showFilters, setShowFilters] = useState(true);
  const [showSort, setShowSort] = useState(false);
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
      skip: (currentPage - 1) * pageSize,
      pageSize,
    }),
    [color, size, slug, sort, currentPage],
  );

  const { data, isLoading } = api.product.getAll.useQuery(queryInput);
  // if (isLoading) return <LoadingPage />;
  // if (!data) return <h1>Something went wrong</h1>;
  return (
    <main>
      <section className="flex justify-end gap-8 pt-16  ">
        <ToggleFilters
          setShowFilters={setShowFilters}
          showFilters={showFilters}
        />
        <SortSelectMenu showSort={showSort} setShowSort={setShowSort} />
      </section>
      <section className="flex gap-4 overflow-hidden pt-8">
        <div
          className={`${
            showFilters ? "" : "-ml-64"
          } k  min-w-[250px] transition-all duration-500`}
        >
          <SizeFilter />
          <ColorFilter />
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
        {data?.totalProducts && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalProducts={data.totalProducts}
            pageSize={pageSize}
          />
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
