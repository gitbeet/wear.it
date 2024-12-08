import React, { useState, useCallback, useEffect } from "react";
import NavLink from "./NavLink";
import CartIcon from "../Cart/CartIcon";
import CartModal from "../Cart/CartModal";
import { useModalsContext } from "~/context/modalsContext";
import Logo from "../Logo";
import FavoritesNavIcon from "../FavoritesNavIcon";
import SearchBar from "../SearchBar";
import SearchResults from "../SearchResults";
import { api } from "~/utils/api";
import debounce from "just-debounce-it";
import MobileMenuButton from "../MobileMenu/MobileMenuButton";
import ProfileButton from "./ProfileButton";
import { useUser } from "@clerk/nextjs";
import MobileSearchMenu from "../MobileSearchMenu";
import { FiSearch } from "react-icons/fi";
import NavIcon from "./NavIcon";
import NavLinkArrow from "./NavLinkArrow";

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

  const {
    showMegaMenu,
    hideMegamenu,
    openMegaMenu,
    toggleMegaMenu,
    setMegaMenuActiveType,
  } = useModalsContext();
  const [showMobileSearchMenu, setShowMobileSearchMenu] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { data: searchResults, isLoading: isSearching } =
    api.product.searchProduct.useQuery(
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
    <nav
      className={` ${
        isNavHidden && !showSearchResults
          ? "-translate-y-full opacity-0"
          : "-translate-y-0 opacity-100"
      } fixed z-[50] w-full transition-[opacity,transform] duration-[450ms] ease-in-out `}
    >
      <div className="relative z-[50]">
        <div className="shadow-color absolute inset-0 z-[50]  bg-slate-50 shadow-lg" />
        <div className="relative mx-auto flex h-16 max-w-[1720px] items-center">
          <div className="margin-left absolute left-0 z-50">
            <Logo responsive />
          </div>
          <ul
            role="navigation"
            className="z-50 mx-auto hidden h-full cursor-pointer xl:flex xl:items-stretch xl:justify-center"
          >
            <NavLink href="/" onClose={hideMegamenu} active>
              <>Home</>
            </NavLink>
            <div className="w-3" />
            <NavLink
              onClose={hideMegamenu}
              href="/products/men"
              active={
                showMegaMenu.find((e) => e.type === "MEN")?.active ?? false
              }
              onTouchStart={() => openMegaMenu("MEN")}
              onTouchEnd={() => setMegaMenuActiveType("MEN")}
              onFocus={() => {
                setMegaMenuActiveType("MEN");
              }}
              onBlur={hideMegamenu}
              onMouseOver={() => {
                openMegaMenu("MEN");
                setMegaMenuActiveType("MEN");
              }}
              onMouseLeave={hideMegamenu}
            >
              <>Men</>
            </NavLink>
            <NavLinkArrow
              type="MEN"
              isOpen={showMegaMenu.find((e) => e.type === "MEN")?.show ?? false}
            />
            <NavLink
              onClose={hideMegamenu}
              active={
                showMegaMenu.find((e) => e.type === "WOMEN")?.active ?? false
              }
              href="/products/women"
              onTouchStart={() => openMegaMenu("WOMEN")}
              onTouchEnd={() => setMegaMenuActiveType("WOMEN")}
              onFocus={() => {
                setMegaMenuActiveType("WOMEN");
              }}
              onBlur={hideMegamenu}
              onMouseOver={() => {
                openMegaMenu("WOMEN");
                setMegaMenuActiveType("WOMEN");
              }}
              onMouseLeave={() => {
                hideMegamenu();
              }}
            >
              <>Women</>
            </NavLink>
            <NavLinkArrow
              type={"WOMEN"}
              isOpen={
                showMegaMenu.find((e) => e.type === "WOMEN")?.show ?? false
              }
            />
            <NavLink onClose={hideMegamenu} href="/" disabled>
              <>Kids</>
            </NavLink>
            <div className="w-3" />

            <NavLink onClose={hideMegamenu} href="/contact" active>
              <>Contact</>
            </NavLink>
          </ul>
          <div className="margin-right absolute right-0 z-50 flex h-10 items-center">
            <SearchBar
              mobile={false}
              onFocus={() => {
                if (query.length < 1) return;
                setShowSearchResults(true);
              }}
              handleCloseButton={handleCloseButton}
              input={query}
              handleSearch={handleSearch}
            />
            <div className="h-10 md:hidden">
              <NavIcon
                as="button"
                icon={<FiSearch className="h-5 w-5 opacity-80" />}
                onClick={() => {
                  setShowMobileSearchMenu(true);
                  setShowSearchResults(true);
                }}
              />
            </div>
            <div className="hidden w-7 md:block"></div>
            <FavoritesNavIcon />
            <CartIcon />
            <div
              className={` hidden w-4 ${isSignedIn ? "md:block" : ""}`}
            ></div>
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
      <MobileSearchMenu
        handleCloseButton={() => setShowMobileSearchMenu(false)}
        handleClearQuery={handleCloseButton}
        onFocus={() => {
          if (query.length < 1) return;
          setShowSearchResults(true);
        }}
        onBlur={() => void 0}
        input={query}
        handleSearch={handleSearch}
        showMenu={showMobileSearchMenu}
        query={debouncedQuery}
        onClose={() => setShowSearchResults(false)}
        showResults={showSearchResults}
        results={searchResults}
        loading={isSearching}
      />
      <CartModal />
    </nav>
  );
};

export default Nav;
