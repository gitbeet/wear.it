import ProductCard from "../product/product-card/ProductCard";
import type { SQLProductType } from "~/types";
import LoadingPage from "../ui/LoadingElements";

interface Props {
  show: boolean;
  results: SQLProductType[] | undefined;
  onClose: () => void;
  query: string;
  loading: boolean;
  mobile?: boolean;
}

const SearchResults = ({ show, results, onClose, query, loading }: Props) => {
  return (
    <>
      {loading && show && <LoadingPage />}
      {show && results && (
        <section className="w-full">
          <div className="mx-auto flex max-h-[calc(100vh-100px)] w-full flex-col overflow-hidden pb-12 pt-8">
            {results.length < 1 && (
              <span className="padding-x pb-24 text-lg">
                No results found for{" "}
                <span className="line-clamp-1 max-w-[30ch] font-semibold">
                  &quot;{query}&quot;
                </span>
              </span>
            )}
            <div
              className="grid h-full grid-cols-[repeat(auto-fill,minmax(190px,1fr))] 
  items-start justify-start gap-1 overflow-auto md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]"
            >
              {results.length > 0 &&
                results.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} onClick={onClose} />
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResults;
