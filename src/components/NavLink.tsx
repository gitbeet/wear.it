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
        className={`cursor-pointer  border-b-[5px] border-b-transparent  p-4 text-slate-700 hover:border-b-gray-900 hover:text-gray-900`}
      >
        {text}
      </li>
    </Link>
  );
};

export default NavLink;
