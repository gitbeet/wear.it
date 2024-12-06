import React from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";

type NavIconButtonProps = {
  as: "button";
  className?: string;
  size?: number;
  icon: JSX.Element;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type NavIconLinkProps = {
  as: "link";
  href: string;
  size?: number;
  icon: JSX.Element;
  className?: string;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export type NavIconProps = NavIconButtonProps | NavIconLinkProps;

const NavIcon: React.FC<NavIconProps> = (props) => {
  const { as, className = "", children, ...rest } = props;

  const baseClass = `relative aspect-square h-full w-auto shrink-0 
  flex justify-center items-center
  rounded-full bg-transparent hover:bg-slate-200 active:opacity-50 ${className} `;

  const iconContent = (
    <div
      style={{
        width: `${props.size ?? 20}px`,
        height: `${props.size ?? 20}px`,
      }}
    >
      {props.icon}
    </div>
  );

  if (as === "button") {
    const { type = "button", ...buttonProps } =
      rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        className={`${baseClass} disabled:opacity-25  `}
        type={type}
        {...buttonProps}
      >
        {iconContent}
        {children}
      </button>
    );
  }

  if (as === "link") {
    const { href, ...linkProps } = rest as LinkProps &
      AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link className={baseClass} href={href} {...linkProps}>
        {iconContent}
        {children}
      </Link>
    );
  }

  return null;
};

export default NavIcon;
