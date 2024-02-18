import React from "react";
import { FiSearch } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";

const SearchBar = ({
  onFocus,
  onBlur,
  input,
  handleSearch,
  handleCloseButton,
  mobile = false,
}: {
  input: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseButton: () => void;
  onFocus: () => void;
  onBlur: () => void;
  mobile: boolean;
}) => {
  return (
    <>
      {mobile && (
        <div className=" relative  h-9 md:hidden">
          {input.length > 1 && (
            <VscChromeClose
              onClick={handleCloseButton}
              role="button"
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
            />
          )}
          <FiSearch className="absolute left-2 top-1/2  h-6 w-6 -translate-y-1/2 text-indigo-300" />
          <input
            onFocus={onFocus}
            onBlur={onBlur}
            value={input}
            onChange={handleSearch}
            className="peer h-full w-full rounded-full border border-indigo-100 bg-white px-10 outline outline-transparent transition-colors duration-150 focus:border-transparent focus:outline-indigo-300"
          />
        </div>
      )}
      {!mobile && (
        <div className="relative hidden h-9  md:block">
          {input.length > 1 && (
            <VscChromeClose
              onClick={handleCloseButton}
              role="button"
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
            />
          )}
          <FiSearch className="absolute left-2 top-1/2  h-6 w-6 -translate-y-1/2 text-indigo-300" />
          <input
            onFocus={onFocus}
            onBlur={onBlur}
            value={input}
            onChange={handleSearch}
            className="peer h-full w-40 rounded-full border border-indigo-100 bg-white px-10 outline outline-transparent transition-colors duration-150 focus:border-transparent focus:outline-indigo-300"
          />
        </div>
      )}
    </>
  );
};

export default SearchBar;
