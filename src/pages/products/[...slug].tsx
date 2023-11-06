import { useState } from "react";
import ColorFilter from "~/components/Filters/ColorFilter";
import SizeFilter from "~/components/Filters/SizeFilter";
import SortSelectMenu from "~/components/Filters/SortSelectMenu";
import ToggleFilters from "~/components/Filters/ToggleFilters";
import Products from "~/components/Products";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ currentPage, setCurrentPage }: PaginationProps) => {
  const totalResults = 200;
  const pageSize = 12;
  const totalPages = Math.ceil(totalResults / pageSize);
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
        className="font-semibold"
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
  const [currentPage, setCurrentPage] = useState(1);

  const [showFilters, setShowFilters] = useState(true);
  const [showSort, setShowSort] = useState(false);
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
          } k h-screen min-w-[250px] transition-all duration-500`}
        >
          <SizeFilter />
          <ColorFilter />
        </div>
        <Products currentPage={currentPage} />
      </section>
      <div className="mx-auto">
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </main>
  );
};

export default ProductsPage;
