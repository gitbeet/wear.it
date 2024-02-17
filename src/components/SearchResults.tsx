import ProductCard from "./Product/ProductCard";
import type { SQLProductType } from "~/types";
import LoadingPage from "./loading";

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
            <div className="padding-x mx-auto flex w-full max-w-[1600px] flex-col  py-36">
              <LoadingPage />
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
      )}
      {show && results && (
        <>
          <section className="absolute z-40 w-full bg-slate-50 shadow-lg">
            <div className="padding-x mx-auto flex w-full max-w-[1600px] flex-col  pb-12 pt-8">
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
                      <ProductCard product={product} />
                    </div>
                  ))}
              </div>
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
      )}
    </div>
  );

  const mobileVersion = (
    <div className="block md:hidden">
      {loading && show && (
        <>
          <section className="w-full">
            <div className="mx-auto flex w-full max-w-[1600px] flex-col">
              <LoadingPage />
            </div>
          </section>
        </>
      )}
      {show && results && (
        <>
          <section className="w-full">
            <div className="mx-auto flex w-full max-w-[1600px] flex-col  pb-12 pt-8">
              {results.length < 1 && (
                <span className="padding-x pb-24 text-lg">
                  No results found for{" "}
                  <span className="line-clamp-1 max-w-[30ch] font-semibold">
                    &quot;{query}&quot;
                  </span>
                </span>
              )}
              <div
                className=" grid
              
            
              grid-cols-[repeat(auto-fit,minmax(190px,1fr))] 
              items-start justify-start gap-1 "
              >
                {results.length > 0 &&
                  results.map((product) => (
                    <div key={product.id} className="">
                      <ProductCard product={product} />
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
