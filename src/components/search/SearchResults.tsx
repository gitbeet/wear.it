import ProductCard from "../product/product-card/ProductCard";
import type { SQLProductType } from "~/types";
import Pagination from "../ui/Pagination";
import type { SetStateAction, Dispatch } from "react";
import ProductCardSkeleton from "../product/product-card/ProductCardSkeleton";

interface Props {
  show: boolean;
  results: SQLProductType[] | never[] | undefined;
  onClose: () => void;
  query: string;
  loading: boolean;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  total: number;
  showPagination: boolean;
  showNotFoundText: boolean;
}

const SearchResults = ({
  show,
  results,
  onClose,
  query,
  loading,
  currentPage,
  setCurrentPage,
  pageSize,
  total,
  showPagination,
  showNotFoundText,
}: Props) => {
  const loadingJSX = (
    <div
      className="grid max-h-[80dvh] grid-cols-[repeat(auto-fill,minmax(190px,1fr))] items-start justify-start 
  gap-1 overflow-auto  pt-8  md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] "
    >
      {[1, 2, 3, 4, 5].map((skeleton) => (
        <ProductCardSkeleton key={skeleton} />
      ))}
    </div>
  );

  const noResultsJSX = (
    <div className="mx-auto flex w-full flex-col pb-12 pt-8">
      <span className="padding-x pb-24 text-lg">
        No results found for{" "}
        <span className="line-clamp-1 max-w-[30ch] truncate font-semibold">
          &quot;{query}&quot;
        </span>
      </span>
    </div>
  );

  const resultsJSX = (
    <div
      className="grid grow grid-cols-[repeat(auto-fill,minmax(190px,1fr))] items-start justify-start 
  gap-1 overflow-auto pt-8  lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] "
    >
      <>
        {results?.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} onClick={onClose} />
          </div>
        ))}
      </>
    </div>
  );

  const paginationJSX = (
    <Pagination
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageSize={pageSize}
      total={total}
    />
  );

  return (
    <>
      {loading && show && loadingJSX}
      {show &&
        results &&
        results.length < 1 &&
        showNotFoundText &&
        noResultsJSX}
      {show && results && results.length > 0 && resultsJSX}
      {show && total > 0 && showPagination && paginationJSX}
    </>
  );
};

export default SearchResults;
