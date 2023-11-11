import { type RouterOutputs } from "~/utils/api";
import ProductCard from "./ProductCard";

interface Props {
  show: boolean;
  results: RouterOutputs["product"]["searchProduct"];
  onClose: () => void;
}

const SearchResults = ({ show, results, onClose }: Props) => {
  return (
    show &&
    results && (
      <>
        <section className="absolute z-50 flex w-full bg-gray-50 px-16 py-8 shadow-lg">
          {results.length < 1 && <h1>No results found</h1>}
          <div className="flex gap-4">
            {results.length > 0 &&
              results.map((product) => (
                <ProductCard key={product.id} product={product} type="SEARCH" />
              ))}
          </div>
        </section>
        <div
          onClick={onClose}
          className={`${
            show
              ? "bg-gray-900/40 backdrop-blur "
              : "pointer-events-none opacity-0"
          }  fixed inset-0 z-20  min-h-screen transition-all duration-300 `}
        ></div>
      </>
    )
  );
};

export default SearchResults;
