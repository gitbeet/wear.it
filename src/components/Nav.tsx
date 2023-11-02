import React, { useState } from "react";
import MegaMenu from "./MegaMenu";
import Link from "next/link";

const Nav = () => {
  const [type, setType] = useState<"men" | "women" | null>(null);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  return (
    <nav className="relative z-50 ">
      <ul
        role="navigation"
        className="relative z-20 flex cursor-pointer  justify-center  bg-slate-100"
      >
        <li className="cursor-pointer p-4">
          <Link href="/">Home</Link>
        </li>
        <li
          className="cursor-pointer p-4"
          onClick={() => setShowMegaMenu(false)}
          onMouseOver={() => {
            setShowMegaMenu(true);
            setType("men");
          }}
          onMouseLeave={() => {
            setShowMegaMenu(false);
          }}
        >
          <Link href={`/products/men`}>Men</Link>
        </li>
        <li
          className="cursor-pointer p-4"
          onClick={() => setShowMegaMenu(false)}
          onMouseOver={() => {
            setShowMegaMenu(true);
            setType("women");
          }}
          onMouseLeave={() => {
            setShowMegaMenu(false);
          }}
        >
          <Link href={`/products/women`}>Women</Link>
        </li>
        <li className="cursor-pointer p-4">
          <Link href={`/products/kids`}>Kids</Link>
        </li>
        <li className="cursor-pointer p-4">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      <MegaMenu type={type} show={showMegaMenu} setShow={setShowMegaMenu} />
    </nav>
  );
};

export default Nav;
