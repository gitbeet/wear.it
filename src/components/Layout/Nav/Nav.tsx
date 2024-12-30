import { useState, useEffect } from "react";
import NavLink from "./NavLink";
import CartIcon from "../../Cart/CartIcon";
import CartModal from "../../Cart/CartModal";
import Logo from "../../Misc/Logo";
import FavoritesNavIcon from "./FavoritesNavIcon";
import MobileMenuButton from "../../MobileMenu/MobileMenuButton";
import ProfileButton from "./ProfileButton";
import { useUser } from "@clerk/nextjs";
import SearchBar from "../../Search/SearchBar";

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

  const logo = (
    <div className="margin-left absolute left-0 z-50">
      <Logo responsive />
    </div>
  );

  const navLinks = (
    <ul className="z-50 mx-auto hidden h-full cursor-pointer xl:flex xl:items-stretch xl:justify-center">
      <NavLink href="/">Home</NavLink>
      <li className="w-3" />
      <NavLink details categoryType="MEN" href="/products/men">
        Men
      </NavLink>
      <NavLink details categoryType="WOMEN" href="/products/women">
        Women
      </NavLink>
      <NavLink href="/" disabled>
        Kids
      </NavLink>
      <li className="w-3" />
      <NavLink href="/contact">Contact</NavLink>
    </ul>
  );

  return (
    <nav
      className={` ${
        isNavHidden
          ? "-translate-y-full opacity-0"
          : "-translate-y-0 opacity-100"
      } fixed z-[50] w-full transition-[opacity,transform] duration-[450ms] ease-in-out `}
    >
      <div className="relative z-[50] ">
        <div className=" shadow-color absolute inset-0  z-[50] bg-slate-50 shadow-sm" />
        <div className="container-mine  relative mx-auto flex h-16 items-center ">
          {logo}
          {navLinks}
          <div className="margin-right absolute right-0 z-50 flex h-10 items-center">
            <SearchBar />
            <div className="hidden w-4 lg:block"></div>
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
      <CartModal />
    </nav>
  );
};

export default Nav;
