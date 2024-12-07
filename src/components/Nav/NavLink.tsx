import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link, { type LinkProps } from "next/link";

type NavLinkButtonProps = {
  as: "button";
  className?: string;
  size?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type NavLinkLinkProps = {
  as: "link";
  href: string;
  size?: number;
  className?: string;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export type NavLinkProps = NavLinkButtonProps | NavLinkLinkProps;

const NavLink = (props: NavLinkProps) => {
  const { as, className = "", children, ...rest } = props;
  const baseClass = `grid grow place-content-center border-b-[6px] border-b-transparent px-4  !text-slate-800  hover:!border-indigo-400 hover:!text-indigo-400 ${className}`;
  if (as === "button") {
    const { type = "button", ...buttonProps } =
      rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        className={`${baseClass} disabled:opacity-25  `}
        type={type}
        {...buttonProps}
      >
        <li className="relative top-[6px]">{children}</li>
      </button>
    );
  }

  if (as === "link") {
    const { href, ...linkProps } = rest as LinkProps &
      AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link className={baseClass} href={href} {...linkProps}>
        <li className="relative top-[6px]">{children}</li>
      </Link>
    );
  }
  // <LinkText
  //   {...props}
  //   className={`grid grow place-content-center border-b-[6px] border-b-transparent px-4  !text-slate-800  hover:!border-indigo-400 hover:!text-indigo-400 ${props.className}`}
  // >
  //   <li className="relative top-[6px]">{props.children}</li>
  // </LinkText>
};

export default NavLink;
