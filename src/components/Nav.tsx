import React, { useState, useCallback } from "react";
import MegaMenu from "./MegaMenu";
import NavLink from "./NavLink";
import CartIcon from "./Cart/CartIcon";
import CartModal from "./Cart/CartModal";
import { useModalsContext } from "~/context/modalsContext";
import Logo from "./Logo";
import { useUser, SignOutButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import FavoritesNavIcon from "./FavoritesNavIcon";
import Search from "./Search";
import SearchResults from "./SearchResults";
import { api } from "~/utils/api";
import debounce from "just-debounce-it";
import { BsPerson } from "react-icons/bs";
import NavIcon from "./NavIcon";
import { PromosBanner } from "./PromosBanner";
import { bannerPromos } from "./promosData";
import { useRouter } from "next/router";

const Nav = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const [type, setType] = useState<"men" | "women" | null>(null);
  const { showMegaMenu, setShowMegaMenu } = useModalsContext();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { isSignedIn, user } = useUser();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  console.log(user?.id);
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
      <div className="relative z-50  bg-slate-50 shadow-md shadow-indigo-600/5">
        <div className="padding-x relative mx-auto flex max-w-[1600px] items-center justify-between py-2">
          <Logo />
          <ul
            role="navigation"
            className="absolute left-1/2 hidden -translate-x-1/2 cursor-pointer justify-center lg:flex"
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
            <div role="button" className="ml-3">
              {!isSignedIn ? (
                <Link href="/sign-in">Sign in</Link>
              ) : (
                <div
                  role="button"
                  className="flex items-center gap-2"
                  onClick={() => signOut(() => router.push("/"))}
                >
                  Hello,
                  <span className="text-indigo-500"> {user.username} </span>
                  <BsPerson className="h-5 w-5" />
                </div>
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
      <CartModal />
    </nav>
  );
};

export default Nav;
