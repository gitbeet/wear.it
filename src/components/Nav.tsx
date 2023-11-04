import React, { useState } from "react";
import MegaMenu from "./MegaMenu";
import NavLink from "./NavLink";

const Nav = () => {
  const [type, setType] = useState<"men" | "women" | null>(null);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  return (
    <nav className="relative z-50 ">
      <ul
        role="navigation"
        className="relative z-20 flex cursor-pointer  justify-center  bg-slate-50 shadow-sm"
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
      <MegaMenu type={type} show={showMegaMenu} setShow={setShowMegaMenu} />
    </nav>
  );
};

export default Nav;
