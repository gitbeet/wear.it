import React, { useState } from "react";
import FooterLink from "./FooterLink";
import { FaChevronDown, FaMinus } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";

export type FooterLinkType = {
  text: string;
  link: string;
};

export type FooterColumnType = {
  footerHeader: string | JSX.Element;
  footerItems: FooterLinkType[];
};

const FooterColumn = ({ footerHeader, footerItems }: FooterColumnType) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <ul className="relative grow space-y-3">
      <div
        onClick={toggleDropdown}
        className="flex cursor-pointer items-center gap-4"
      >
        <p className="font-display font-bold text-slate-600">{footerHeader}</p>

        <FaChevronDown
          className={` ${
            isOpen && "-rotate-180"
          }  duration-250 xs:hidden relative h-4  w-4 text-indigo-500 transition-transform`}
        />
      </div>
      {isOpen && (
        <div className={`space-y-3`}>
          {footerItems.map((footerItem, i) => (
            <FooterLink
              key={i}
              link={footerItem.link}
              linkText={footerItem.text}
            />
          ))}
        </div>
      )}
    </ul>
  );
};

export default FooterColumn;