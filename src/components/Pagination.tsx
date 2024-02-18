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
    <div className="flex items-center justify-center gap-16 p-4 pb-12">
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

export default Pagination;
