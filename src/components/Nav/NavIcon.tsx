import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import type { LinkProps } from "next/link";
import Icon, { type IconProps } from "../UI/Icon";

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

const NavIcon = ({ className, ...props }: IconProps) => {
  return (
    <Icon
      {...props}
      className={`${className} relative h-full w-auto shrink-0 rounded-full bg-transparent hover:bg-slate-200 `}
    />
  );
};

export default NavIcon;
