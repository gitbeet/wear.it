import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import Link, { type LinkProps } from "next/link";
import { type Url } from "next/dist/shared/lib/router/router";

type NavLinkLinkProps = {
  href: Url;
  active?: boolean;
  disabled?: boolean;
  onClose: () => void;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLDivElement>;

const NavLink = (props: NavLinkLinkProps) => {
  const {
    className = "",
    children,
    active,
    href,
    disabled,
    onClose,
    onFocus,
    onBlur,
    onMouseOver,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
  } = props;

  const baseClass = ` ${
    disabled ? "opacity-50 pointer-events-none" : ""
  } z-50  grid grow place-content-center  border-b-[6px] border-b-transparent px-4  !text-slate-800  hover:!border-indigo-400 hover:!text-indigo-400 relative ${className} `;

  const elementClass =
    "absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2";

  const activeClass = "z-[3]";
  const inactiveClass = "z-[1] pointer-events-none opacity-0";

  return (
    <div
      className={baseClass}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <span className={`pointer-events-none relative top-[6px] opacity-0 `}>
        {children}
      </span>
      <button
        tabIndex={-1}
        className={`${elementClass} ${active ? inactiveClass : activeClass}`}
      >
        {children}
      </button>
      <Link
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClose}
        href={href}
        className={`${elementClass} ${active ? activeClass : inactiveClass} `}
      >
        {children}
      </Link>
    </div>
  );
};

export default NavLink;
