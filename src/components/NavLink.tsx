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
    <Link href={link}>
      <li
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        className={`cursor-pointer  border-[5px]  border-transparent p-4  font-bold text-slate-800 hover:border-t-indigo-400 hover:text-indigo-400`}
      >
        {text}
      </li>
    </Link>
  );
};

export default NavLink;
