import React, { useState, useCallback } from "react";
import MegaMenu from "./MegaMenu";
import NavLink from "./NavLink";
import ShoppingBagIcon from "./Cart/ShoppingBagIcon";
import ShoppingBagModal from "./Cart/ShoppingBagModal";
import { useModalsContext } from "~/context/modalsContext";
import Logo from "./Logo";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import FavoritesNavIcon from "./FavoritesNavIcon";
import Search from "./Search";
import SearchResults from "./SearchResults";
import { api } from "~/utils/api";
import debounce from "just-debounce-it";

const Nav = () => {
  const [type, setType] = useState<"men" | "women" | null>(null);
  const { showMegaMenu, setShowMegaMenu } = useModalsContext();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { isSignedIn } = useUser();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const {
    data: searchResults,
    isLoading: isSearching,
    refetch,
  } = api.product.searchProduct.useQuery(
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
      setShowSearchResults(true);
    }, 500),
    [],
  );

  const handleCloseButton = () => {
    setDebouncedQuery("");
    setQuery("");
    setShowSearchResults(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length < 1) {
      setDebouncedQuery("");
      setQuery("");
      setShowSearchResults(false);
    }
    setQuery(value);
    getDebouncedResults(value);
  };

  return (
    <nav>
      <div className="relative z-50 border-b bg-gray-50">
        {/* <div className="w-full bg-gray-700 py-1 text-sm text-gray-100">
          <div className="mx-auto flex max-w-[1600px] justify-end gap-2">
            <a className="">info@efashion.com</a>
            <a className="">048 155 22</a>
          </div>
        </div> */}
        <div className="relative mx-auto flex max-w-[1600px] items-center justify-between py-3">
          <Logo />
          <ul
            role="navigation"
            className="absolute left-1/2 flex -translate-x-1/2 cursor-pointer justify-center"
          >
            <NavLink link="/" text="Home" />
            <NavLink
              onClick={() => setShowMegaMenu(false)}
              onMouseOver={() => {
                setShowMegaMenu(true);
                setType("men");
              }}
              onMouseLeave={() => {
                setShowMegaMenu(false);
              }}
              link="/products/men"
              text="Men"
            />
            <NavLink
              onClick={() => setShowMegaMenu(false)}
              onMouseOver={() => {
                setShowMegaMenu(true);
                setType("women");
              }}
              onMouseLeave={() => {
                setShowMegaMenu(false);
              }}
              link="/products/women"
              text="Women"
            />
            <NavLink link="/products/kids" text="Kids" />
            <NavLink link="/contact" text="Contact" />
          </ul>
          <div className="flex items-center">
            <Search
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => setShowSearchResults(false)}
              handleCloseButton={handleCloseButton}
              input={query}
              handleSearch={handleSearch}
            />
            <div className="w-7"></div>
            <FavoritesNavIcon />
            <ShoppingBagIcon />
            <div
              role="button"
              className="ml-3 rounded-sm border border-gray-300 px-4 py-1"
            >
              {!isSignedIn ? (
                <Link href="/sign-up">Sign up</Link>
              ) : (
                <SignOutButton />
              )}
            </div>
          </div>
        </div>
      </div>

      <SearchResults
        onClose={() => setShowSearchResults(false)}
        show={showSearchResults}
        results={searchResults}
      />

      <MegaMenu type={type} show={showMegaMenu} setShow={setShowMegaMenu} />
      <ShoppingBagModal />
    </nav>
  );
};

export default Nav;
