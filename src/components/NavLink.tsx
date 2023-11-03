import Link from "next/link";
import React from "react";

interface Props {
  link: string;
  text: string;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const NavLink = ({ link, text, onMouseOver, onMouseLeave, onClick }: Props) => {
  return (
    <li
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      className="cursor-pointer border-b-2 border-b-transparent p-4 text-slate-700 hover:border-b-slate-900 hover:text-slate-900"
    >
      <Link href={link}>{text}</Link>
    </li>
  );
};

export default NavLink;