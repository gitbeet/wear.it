import React, { useState } from "react";
import MegaMenu from "./MegaMenu";
import Link from "next/link";

const Nav = () => {
  const [type, setType] = useState<"men" | "women" | null>(null);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  return (
    <nav>
      <ul role="navigation" className="flex  cursor-pointer border">
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
          <Link href={`/men`}>Men</Link>
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
          <Link href={`/men`}>Women</Link>
        </li>
        <li className="cursor-pointer p-4">
          <Link href={`/men`}>Kids</Link>
        </li>
      </ul>
      <MegaMenu type={type} show={showMegaMenu} setShow={setShowMegaMenu} />
    </nav>
  );
};

export default Nav;
