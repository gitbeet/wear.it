import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import Link, { type LinkProps } from "next/link";
import NavLinkDetails from "./NavLinkDetails";
import { type CategoryType } from "@prisma/client";
import { useModalsContext } from "~/context/modalsContext";

type NavLinkLinkProps = {
  categoryType?: CategoryType;
  details?: boolean;
  disabled?: boolean;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLLIElement>;

const NavLink = (props: NavLinkLinkProps) => {
  const {
    categoryType,
    details = false,
    className = "",
    children,
    href,
    disabled,
  } = props;
  const { openMegaMenu, setMegaMenuActiveType, hideMegamenu, showMegaMenu } =
    useModalsContext();

  const baseClass = ` ${
    disabled ? "opacity-50 pointer-events-none" : ""
  } z-50  grid grow place-content-center  border-b-[6px] border-b-transparent px-4  !text-slate-800  hover:!border-indigo-400 hover:!text-indigo-400 relative ${className} active:opacity-50 `;

  const elementClass =
    "absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2";

  const activeClass = "z-[3]";
  const inactiveClass = "z-[1] pointer-events-none opacity-0";

  const isDetailsVisible =
    showMegaMenu.find((e) => e.type === categoryType)?.show ?? false;

  const active = categoryType
    ? showMegaMenu.find((e) => e.type === categoryType)?.active ?? false
    : true;

  return (
    <li
      className={baseClass}
      onTouchStart={() => {
        if (!categoryType) return;
        openMegaMenu(categoryType ?? "MEN");
      }}
      onTouchEnd={() => {
        if (!categoryType) return;
        setMegaMenuActiveType(categoryType ?? "MEN");
      }}
      onMouseEnter={() => {
        if (!categoryType) return;
        openMegaMenu(categoryType ?? "MEN");
        setMegaMenuActiveType(categoryType ?? "MEN");
      }}
      onMouseLeave={() => {
        if (!categoryType) return;
        hideMegamenu();
      }}
    >
      <span className={`pointer-events-none relative top-[6px] opacity-0 `}>
        {children}
      </span>
      <div
        className={`${elementClass} ${active ? inactiveClass : activeClass}`}
      >
        {children}
      </div>
      <Link
        tabIndex={disabled ? -1 : 0}
        onFocus={() => {
          setMegaMenuActiveType(categoryType ?? "MEN");
        }}
        onBlur={hideMegamenu}
        onClick={hideMegamenu}
        href={href}
        className={`${elementClass} ${active ? activeClass : inactiveClass} `}
      >
        {children}
      </Link>
      {details && categoryType && (
        <NavLinkDetails type={categoryType} isOpen={isDetailsVisible} />
      )}
    </li>
  );
};

export default NavLink;
