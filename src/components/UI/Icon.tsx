import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";

type IconButtonProps = {
  as: "button";
  className?: string;
  size?: number;
  icon: JSX.Element;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type IconLinkProps = {
  as: "link";
  href: string;
  size?: number;
  icon: JSX.Element;
  className?: string;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export type IconProps = IconButtonProps | IconLinkProps;

const Icon: React.FC<IconProps> = (props) => {
  const { as, className = "", children, ...rest } = props;

  const baseClass = `aspect-square flex justify-center items-center
  text-slate-700 transition active:opacity-50 disabled:opacity-25 ${className}`;

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
      <button className={`${baseClass}`} type={type} {...buttonProps}>
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

export default Icon;
