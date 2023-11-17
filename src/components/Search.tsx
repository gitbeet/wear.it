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
      <div className="relative hidden h-10 lg:block">
        {input.length > 1 && (
          <VscChromeClose
            onClick={handleCloseButton}
            role="button"
            className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
          />
        )}
        <BsSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          value={input}
          onChange={handleSearch}
          className="h-full w-56  rounded-full border border-slate-200 bg-slate-100 px-10"
        />
      </div>
      <BsSearch className="m-3 h-5 w-5 text-slate-700 lg:hidden" />
    </>
  );
};

export default Search;
