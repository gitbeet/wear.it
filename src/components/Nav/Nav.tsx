import React, { useState, useCallback, useEffect } from "react";
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
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isNavHidden, setIsNavHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setPrevScrollPos(currentScrollPos);
      if (currentScrollPos < 150) {
        setIsNavHidden(false);
        return;
      }
      const isScrollingDown = currentScrollPos > prevScrollPos;
      setIsNavHidden(isScrollingDown);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

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
    <nav
      className={` ${
        isNavHidden
          ? "-translate-y-full opacity-0"
          : "-translate-y-0 opacity-100"
      } fixed z-[50] w-full transition-[opacity,transform] duration-[550ms] ease-in-out `}
    >
      <div className=" relative z-[50]  bg-slate-50 shadow-lg shadow-indigo-600/5">
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
        loading={isSearching}
      />

      <MegaMenu type={type} show={showMegaMenu} setShow={setShowMegaMenu} />
      <CartModal />
    </nav>
  );
};

export default Nav;
