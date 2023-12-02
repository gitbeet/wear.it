import React from "react";
import { BsSearch } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";

const Search = ({
  onFocus,
  onBlur,
  input,
  handleSearch,
  handleCloseButton,
}: {
  input: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseButton: () => void;
  onFocus: () => void;
  onBlur: () => void;
}) => {
  return (
    <>
      <div className=" relative hidden h-9 md:block">
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
          className="peer h-full w-60 rounded-full border border-indigo-100 bg-white px-10 outline-none transition-colors duration-150 focus:border-indigo-300 focus:shadow-sm"
        />
      </div>
      <FiSearch className="m-3 h-5 w-5 text-indigo-400 md:hidden" />
    </>
  );
};

export default Search;
