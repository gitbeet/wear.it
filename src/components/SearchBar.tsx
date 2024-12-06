import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";
import NavIconWithNumber from "./Nav/NavIconWithNumber";
import NavIcon from "./Nav/NavIcon";

const SearchBar = ({
  onFocus,
  input,
  handleSearch,
  handleCloseButton,
  mobile = false,
}: {
  input: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseButton: () => void;
  onFocus: () => void;
  mobile: boolean;
}) => {
  return (
    <div className="">
      {mobile && (
        <div className=" relative  h-10 md:hidden">
          {input.length > 1 && (
            <div className="absolute right-2 top-1/2  -translate-y-1/2 cursor-pointer">
              <NavIcon
                as="button"
                size={28}
                icon={
                  <VscChromeClose
                    className="h-full w-full p-1"
                    onClick={handleCloseButton}
                  />
                }
              />
            </div>
          )}
          <FiSearch className="absolute left-2 top-1/2  h-6 w-6 -translate-y-1/2 text-indigo-300" />
          <input
            onFocus={onFocus}
            value={input}
            onChange={handleSearch}
            className="peer h-full w-full rounded-full border border-indigo-100 bg-white px-10 outline outline-transparent transition-colors duration-150 focus:border-transparent focus:outline-indigo-300"
          />
        </div>
      )}
      {!mobile && (
        <div className="group relative hidden h-10 grow justify-end  md:flex">
          {input.length > 1 && (
            <div className="absolute right-2 top-1/2  -translate-y-1/2 cursor-pointer">
              <NavIcon
                as="button"
                size={28}
                icon={
                  <VscChromeClose
                    className="h-full w-full p-1"
                    onClick={handleCloseButton}
                  />
                }
              />
            </div>
          )}
          <FiSearch className="relative left-8  top-1/2 h-6 w-6 -translate-y-1/2 text-indigo-300 transition-all duration-300 " />
          {/* Using both the focus: and the input lenght */}
          <input
            onFocus={onFocus}
            value={input}
            onChange={handleSearch}
            className={` ${
              input.length > 0 ? "w-full" : "w-40"
            } peer h-full rounded-full border border-indigo-100 bg-white px-10 outline outline-transparent transition-all duration-300 focus:w-full focus:border-transparent focus:outline-indigo-300`}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
