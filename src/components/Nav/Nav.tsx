import React, { useState, useCallback } from "react";
import MegaMenu from "./MegaMenu";
import NavLink from "./NavLink";
import CartIcon from "../Cart/CartIcon";
import CartModal from "../Cart/CartModal";
import { useModalsContext } from "~/context/modalsContext";
import Logo from "../Logo";
import FavoritesNavIcon from "../FavoritesNavIcon";
import Search from "../Search";
import SearchResults from "../SearchResults";
import { api } from "~/utils/api";
import debounce from "just-debounce-it";
import MobileMenuButton from "../MobileMenu/MobileMenuButton";
import ProfileButton from "./ProfileButton";
import { useUser } from "@clerk/nextjs";

const Nav = () => {
  const { isSignedIn } = useUser();

  const [type, setType] = useState<"men" | "women" | null>(null);
  const { showMegaMenu, setShowMegaMenu } = useModalsContext();
  const [showSearchResults, setShowSearchResults] = useState(false);
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

  console.log(searchResults);

  return (
    <nav>
      <div className="relative z-[50]  bg-slate-50 shadow-lg shadow-indigo-600/5">
        <div className="padding-x relative mx-auto flex max-w-[1600px] items-center justify-between py-2">
          <Logo />

          <ul
            role="navigation"
            className="absolute left-1/2 hidden -translate-x-1/2 cursor-pointer justify-center xl:flex"
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
              onBlur={() => void 0}
              handleCloseButton={handleCloseButton}
              input={query}
              handleSearch={handleSearch}
            />
            <div className="hidden w-7 md:block"></div>
            <FavoritesNavIcon />
            <CartIcon />
            <div className={` hidden w-4 ${isSignedIn && "md:block"}`}></div>
            <ProfileButton />
            <div className="w-3 xl:hidden"></div>
            <MobileMenuButton />
          </div>
        </div>
      </div>
      <SearchResults
        query={debouncedQuery}
        onClose={() => setShowSearchResults(false)}
        show={showSearchResults}
        results={searchResults}
      />
      <MegaMenu type={type} show={showMegaMenu} setShow={setShowMegaMenu} />
      <CartModal />
    </nav>
  );
};

export default Nav;
