import React, { useState } from "react";
import MegaMenu from "./MegaMenu";
import NavLink from "./NavLink";
import ShoppingBagIcon from "./Cart/ShoppingBagIcon";
import { FiUser } from "react-icons/fi";
import { BsHeart, BsSearch } from "react-icons/bs";
import Link from "next/link";
import ShoppingBagModal from "./Cart/ShoppingBagModal";

const Nav = () => {
  const [type, setType] = useState<"men" | "women" | null>(null);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  return (
    <nav className="bg-slate-50 ">
      <div className="relative z-50 bg-slate-50 py-4 ">
        <div className="relative mx-auto flex max-w-[1600px] items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-black">e.fashion</h1>
          </Link>
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
          <div className="flex items-center gap-4 ">
            <div className="pointer-events-none relative h-8 pr-4">
              <BsSearch className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input className="h-full w-40  rounded-full border border-slate-200 bg-slate-100 pl-8" />
            </div>
            <BsHeart role="button" className="pointer-events-none h-5 w-5" />
            <ShoppingBagIcon />
            <FiUser className="pointer-events-none  h-5 w-5" />
          </div>
        </div>
      </div>
      <MegaMenu type={type} show={showMegaMenu} setShow={setShowMegaMenu} />
      <ShoppingBagModal />
    </nav>
  );
};

export default Nav;
