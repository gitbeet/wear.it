import { useState } from "react";
import ExpandArrow from "./ExpandArrow";
import FooterTextLink from "./FooterTextLink";

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
      <div className="flex items-center gap-4">
        <p className="font-display font-bold text-slate-600">{footerHeader}</p>
        <div onClick={toggleDropdown} className="xs:hidden">
          <ExpandArrow expanded={isOpen} disabled={footerItems.length === 0} />
        </div>
      </div>
      {isOpen && (
        <div className={`space-y-3`}>
          {footerItems.map((footerItem, i) => (
            <FooterTextLink key={i} href={footerItem.link}>
              {footerItem.text}
            </FooterTextLink>
          ))}
        </div>
      )}
    </ul>
  );
};

export default FooterColumn;
