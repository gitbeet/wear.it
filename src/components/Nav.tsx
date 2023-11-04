import React, { useState } from "react";
import MegaMenu from "./MegaMenu";
import NavLink from "./NavLink";
import ShoppingBagIcon from "./Cart/ShoppingBagIcon";
import { FiUser } from "react-icons/fi";
import { BsHeart, BsSearch } from "react-icons/bs";

const Nav = () => {
  const [type, setType] = useState<"men" | "women" | null>(null);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  return (
    <nav className="bg-slate-50 ">
      <div className="relative z-50 bg-slate-50  ">
        <div className=" mx-auto flex max-w-[1600px] items-center justify-between">
          <h1 className="text-xl font-black">e.fashion</h1>
          <ul
            role="navigation"
            className="flex cursor-pointer  justify-center  shadow-sm"
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
              <input className="h-full rounded-full border border-slate-300 bg-slate-200 pl-8" />
            </div>
            <BsHeart role="button" className="pointer-events-none h-5 w-5" />
            <ShoppingBagIcon />
            <FiUser className="pointer-events-none  h-5 w-5" />
          </div>
        </div>
      </div>
      <MegaMenu type={type} show={showMegaMenu} setShow={setShowMegaMenu} />
    </nav>
  );
};

export default Nav;
