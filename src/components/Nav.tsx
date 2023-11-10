import React, { useState } from "react";
import MegaMenu from "./MegaMenu";
import NavLink from "./NavLink";
import ShoppingBagIcon from "./Cart/ShoppingBagIcon";
import { BsSearch } from "react-icons/bs";
import ShoppingBagModal from "./Cart/ShoppingBagModal";
import { useModalsContext } from "~/context/modalsContext";
import Logo from "./Logo";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import FavoritesNavIcon from "./FavoritesNavIcon";

const Nav = () => {
  const [type, setType] = useState<"men" | "women" | null>(null);
  const { showMegaMenu, setShowMegaMenu } = useModalsContext();
  const { isSignedIn } = useUser();
  return (
    <nav>
      <div className="relative z-50 bg-gray-50">
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
          <div className="flex items-center gap-1 ">
            <div className="pointer-events-none relative h-8 pr-4">
              <BsSearch className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input className="h-full w-40  rounded-full border border-gray-200 bg-gray-100 pl-8" />
            </div>
            <FavoritesNavIcon />
            <ShoppingBagIcon />
            {/* <NavIcon
              icon={<BsPerson className="h-5 w-5" />}
              link="/"
              loading={false}
              number={0}
            /> */}
            <p>
              {!isSignedIn ? (
                <Link href="/sign-up">Sign up</Link>
              ) : (
                <SignOutButton />
              )}
            </p>
          </div>
        </div>
      </div>
      <MegaMenu type={type} show={showMegaMenu} setShow={setShowMegaMenu} />
      <ShoppingBagModal />
    </nav>
  );
};

export default Nav;
