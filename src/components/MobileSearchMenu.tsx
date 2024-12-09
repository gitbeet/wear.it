import React from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import type { SQLProductType } from "~/types";
import CloseButton from "./UI/CloseButton";
import FocusTrap from "focus-trap-react";

interface Props {
  showMenu: boolean;
  input: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseButton: () => void;
  onFocus: () => void;
  onBlur: () => void;
  showResults: boolean;
  results: SQLProductType[] | undefined;
  onClose: () => void;
  query: string;
  loading: boolean;
  handleClearQuery: () => void;
}

const MobileSearchMenu = ({
  handleClearQuery,
  showMenu,
  showResults,
  onFocus,
  input,
  handleSearch,
  handleCloseButton,
  results,
  onClose,
  query,
  loading,
}: Props) => {
  return (
    <FocusTrap active={showMenu}>
      <div
        className={`${
          showMenu ? "" : "translate-x-full"
        } fixed inset-0 z-[100]  h-screen bg-slate-50  transition-transform duration-500 md:hidden`}
      >
        <div className="p-6">
          <div className="flex  h-10  place-content-end">
            <CloseButton
              onClick={() => {
                handleCloseButton();
                onClose();
              }}
            />
          </div>
          <div className="h-12"></div>
          <SearchBar
            mobile
            handleCloseButton={handleClearQuery}
            handleSearch={handleSearch}
            input={input}
            onFocus={onFocus}
          />
        </div>
        <SearchResults
          mobile
          query={query}
          onClose={() => {
            handleCloseButton();
            onClose();
          }}
          show={showResults && showMenu}
          results={results}
          loading={loading}
        />
      </div>
    </FocusTrap>
  );
};

export default MobileSearchMenu;
