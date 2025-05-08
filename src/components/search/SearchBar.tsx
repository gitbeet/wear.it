import { FiSearch } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";
import NavIcon from "../layout/nav/NavIcon";
import { useCallback, useEffect, useRef, useState } from "react";
import Backdrop from "../ui/Backdrop";
import { disableScrolling, enableScrolling } from "~/utilities/toggleScrolling";
import Logo from "../misc/Logo";
import FocusTrap from "focus-trap-react";
import CloseButton from "../ui/CloseButton";
import debounce from "just-debounce-it";
import { api } from "~/utils/api";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { data: searchResults, isLoading: isSearching } =
    api.product.searchProduct.useQuery(
      { query: debouncedQuery },
      {
        enabled: true,
        refetchOnWindowFocus: false, // Prevents refetch on window focus
        refetchOnMount: false, // Prevents initial automatic refetch on mount
      },
    );
  const getDebouncedResults = useCallback(
    debounce((val: string) => {
      setDebouncedQuery(val);
    }, 500),
    [],
  );

  const handleCloseButton = () => {
    setDebouncedQuery("");
    setQuery("");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length < 1) {
      setDebouncedQuery("");
      setQuery("");
    }
    setQuery(value);
    getDebouncedResults(value);
  };

  useEffect(() => {
    if (query.length < 1) return;
    setIsActive(true);
  }, [query]);

  useEffect(() => {
    if (isActive) {
      disableScrolling();
      return;
    }
    if (!isActive) {
      enableScrolling();
      return;
    }
  }, [isActive]);

  const handleIconClick = () => {
    inputRef.current?.focus();
    setIsActive(true);
  };

  const handleInputClick = () => {
    setIsActive(true);
  };

  const searchBarJsx = (
    <div className={`group relative flex h-10 grow items-center justify-end`}>
      <div
        className={` ${
          !isActive ? "relative h-10 lg:left-9 lg:h-8" : "absolute left-1 h-8"
        } `}
      >
        <NavIcon
          aria-label="Search a product"
          onClick={handleIconClick}
          className={`shrink-0 text-indigo-300 transition-all duration-300`}
          as="button"
          icon={<FiSearch className="h-5  w-5" />}
        />
      </div>
      {/* Using both the focus: and the query lenght */}
      <input
        aria-label="Search"
        ref={inputRef}
        onClick={handleInputClick}
        value={query}
        onChange={handleSearch}
        className={` ${isActive ? "w-full" : "w-36"} peer ${
          !isActive ? "hidden lg:block" : ""
        } h-full origin-right rounded-full border border-indigo-100 bg-white px-9 outline outline-transparent`}
      />

      <div
        className={` absolute right-1 ${
          !isActive ? "hidden lg:block" : ""
        }  h-8 w-8 cursor-pointer transition-all`}
      >
        <NavIcon
          aria-label="Clear search input"
          className={`${
            query.length > 0 ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={handleCloseButton}
          tabIndex={query.length > 0 ? 0 : -1}
          as="button"
          size={24}
          icon={<VscChromeClose className="h-5 w-5" />}
        />
      </div>
    </div>
  );

  return (
    <>
      <FocusTrap active={isActive}>
        <div>
          <div
            className={
              isActive
                ? "fixed left-0 right-0 top-0  z-50 w-screen bg-slate-50  shadow-lg"
                : ""
            }
          >
            <div
              className={` ${
                isActive
                  ? "padding-x show-search-results-element relative mx-auto min-h-[20rem] max-w-[1720px] pt-4"
                  : ""
              } `}
            >
              <div className="flex items-center gap-8">
                <div className={`${isActive ? "hidden lg:block" : "hidden"} `}>
                  <Logo tabIndex={-1} />
                </div>
                {searchBarJsx}
                <div className={`${isActive ? "block" : "hidden"} h-10 `}>
                  <CloseButton onClick={() => setIsActive(false)} />
                </div>
              </div>

              <SearchResults
                loading={isSearching}
                onClose={() => void 0}
                query={query}
                results={searchResults}
                show={isActive}
                mobile={false}
              />
            </div>
          </div>
          <Backdrop
            show={isActive}
            zIndex={40}
            onClose={() => {
              setIsActive(false);
            }}
          />
        </div>
      </FocusTrap>
    </>
  );
};

export default SearchBar;
