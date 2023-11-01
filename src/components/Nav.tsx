import React, { useState } from "react";
import MegaMenu from "./MegaMenu";

const Nav = () => {
  const [type, setType] = useState<"men" | "women" | null>(null);
  return (
    <nav>
      <ul role="navigation" className="flex gap-32">
        <li onClick={() => setType("men")}>Men</li>
        <li onClick={() => setType("women")}>Women</li>
        <li>Kids</li>
      </ul>
      <div className="h-8"></div>
      <MegaMenu type={type} />
    </nav>
  );
};

export default Nav;
