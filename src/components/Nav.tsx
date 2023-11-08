import React, { useState } from "react";
import MegaMenu from "./MegaMenu";
import NavLink from "./NavLink";
import ShoppingBagIcon from "./Cart/ShoppingBagIcon";
import { BsHeart, BsPerson, BsSearch } from "react-icons/bs";
import ShoppingBagModal from "./Cart/ShoppingBagModal";
import { useModalsContext } from "~/context/modalsContext";
import Logo from "./Logo";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

const Nav = () => {
  const [type, setType] = useState<"men" | "women" | null>(null);
  const { showMegaMenu, setShowMegaMenu } = useModalsContext();
  const { user, isLoaded, isSignedIn } = useUser();
  console.log(user?.id);
  return (
    <nav className="bg-slate-50 ">
      <div className="relative z-50 bg-slate-50   ">
        {/* <div className="w-full bg-gray-700 py-1 text-sm text-gray-100">
          <div className="mx-auto flex max-w-[1600px] justify-end gap-2">
            <a className="">info@efashion.com</a>
            <a className="">048 155 22</a>
          </div>
        </div> */}

        <div className="relative mx-auto flex max-w-[1600px] items-center justify-between py-2">
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
              <input className="h-full w-40  rounded-full border border-slate-200 bg-slate-100 pl-8" />
            </div>
            <div
              role="button"
              className="flex items-center justify-center rounded-full bg-transparent p-2.5 hover:bg-gray-300"
            >
              <BsHeart className=" h-5 w-5" />
            </div>
            <ShoppingBagIcon />
            <div
              role="button"
              className="flex items-center justify-center rounded-full bg-transparent p-2.5 hover:bg-gray-300"
            >
              <BsPerson className="h-5 w-5 text-gray-700" />
            </div>
            <p>
              {!isSignedIn ? (
                <Link href="/sign-up">Sign in</Link>
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
