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
        <section className="absolute z-50 flex w-full bg-slate-50 px-16 py-12 shadow-lg">
          {results.length < 1 && <h1>No results found</h1>}
          <div className="mx-auto flex w-full max-w-[1600px] gap-4">
            {results.length > 0 &&
              results.map((product) => (
                <div key={product.id} className="w-[350px]">
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        </section>
        <div
          onClick={onClose}
          className={`${
            show
              ? "bg-slate-900/40 backdrop-blur "
              : "pointer-events-none opacity-0"
          }  fixed inset-0 z-20  min-h-screen transition-all duration-300 `}
        ></div>
      </>
    )
  );
};

export default SearchResults;
