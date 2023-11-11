import React from "react";
import { BsSearch } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";

const Search = ({
  input,
  handleSearch,
  handleCloseButton,
}: {
  input: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseButton: () => void;
}) => {
  return (
    <div className=" relative h-10">
      {input.length > 1 && (
        <VscChromeClose
          onClick={handleCloseButton}
          role="button"
          className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2"
        />
      )}
      <BsSearch className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
      <input
        value={input}
        onChange={handleSearch}
        className="h-full w-52  rounded-full border border-gray-200 bg-gray-100 px-10"
      />
    </div>
  );
};

export default Search;
