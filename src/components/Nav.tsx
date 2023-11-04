import React, { useState } from "react";
import MegaMenu from "./MegaMenu";
import NavLink from "./NavLink";
import ShoppingBagIcon from "./Cart/ShoppingBagIcon";

const Nav = () => {
  const [type, setType] = useState<"men" | "women" | null>(null);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  return (
    <nav className="bg-slate-50">
      <div className="relative z-50 mx-auto flex max-w-[1400px] items-center justify-between bg-slate-50  ">
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
        <ShoppingBagIcon />
      </div>
      <MegaMenu type={type} show={showMegaMenu} setShow={setShowMegaMenu} />
    </nav>
  );
};

export default Nav;
