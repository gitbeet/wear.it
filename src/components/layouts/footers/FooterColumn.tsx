import { useState } from "react";
import ExpandArrow from "../../uis/ExpandArrow";
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
    <div className="relative grow space-y-3">
      <div className="flex items-center gap-4">
        <p className="font-display font-bold text-slate-600">{footerHeader}</p>
        <div onClick={toggleDropdown} className="xs:hidden">
          <ExpandArrow expanded={isOpen} disabled={footerItems.length === 0} />
        </div>
      </div>
      {isOpen && (
        <ul className={`space-y-3`}>
          {footerItems.map((footerItem, i) => (
            <li key={i}>
              <FooterTextLink href={footerItem.link}>
                {footerItem.text}
              </FooterTextLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FooterColumn;
