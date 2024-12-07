import ProductCard from "./Product/ProductCard";
import type { SQLProductType } from "~/types";
import LoadingPage from "./loading";
import Backdrop from "./UI/Backdrop";

interface Props {
  show: boolean;
  results: SQLProductType[] | undefined;
  onClose: () => void;
  query: string;
  loading: boolean;
  mobile?: boolean;
}

const SearchResults = ({
  show,
  results,
  onClose,
  query,
  loading,
  mobile = false,
}: Props) => {
  const desktopVersion = (
    <div className="hidden md:block">
      {loading && show && (
        <>
          <section className="absolute z-40 w-full bg-slate-50 shadow-lg">
            <div className="padding-x mx-auto flex w-full max-w-[1720px] flex-col  py-36">
              <LoadingPage />
            </div>
          </section>
          <Backdrop show={show} zIndex={20} onClose={onClose} />
        </>
      )}
      {show && results && (
        <>
          <section className="absolute z-40 w-full bg-slate-50 shadow-lg">
            <div className="padding-x mx-auto flex w-full max-w-[1720px] flex-col  pb-12 pt-8">
              <p
                role="button"
                onClick={onClose}
                className="relative self-end font-bold"
              >
                Close
              </p>
              {results.length < 1 && (
                <span className="pb-24 text-lg">
                  No results found for{" "}
                  <span className="line-clamp-1 max-w-[30ch] font-semibold">
                    &quot;{query}&quot;
                  </span>
                </span>
              )}
              <div className="mx-auto flex w-full  gap-4">
                {results.length > 0 &&
                  results.map((product) => (
                    <div key={product.id} className="w-[290px]">
                      <ProductCard product={product} onClick={onClose} />
                    </div>
                  ))}
              </div>
            </div>
          </section>
          <Backdrop show={show} zIndex={20} onClose={onClose} />
        </>
      )}
    </div>
  );

  const mobileVersion = (
    <div className="block md:hidden">
      {loading && show && (
        <>
          <section className="w-full">
            <div className="mx-auto flex w-full  flex-col">
              <LoadingPage />
            </div>
          </section>
        </>
      )}
      {show && results && (
        <>
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
                className="grid h-full grid-cols-[repeat(auto-fill,minmax(140px,1fr))] 
      items-start justify-start gap-1 overflow-auto"
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
        </>
      )}
    </div>
  );

  return (
    <>
      {mobile && mobileVersion}
      {!mobile && desktopVersion}
    </>
  );
};

export default SearchResults;
