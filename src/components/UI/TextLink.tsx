import Link from "next/link";
import type { LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

export type TextLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    className?: string;
    children?: React.ReactNode;
  };

const TextLink = (props: TextLinkProps) => {
  return (
    <Link
      {...props}
      className={`block cursor-pointer text-slate-700 transition-all  hover:text-slate-900  active:opacity-50 ${props.className}`}
    >
      {props.children}
    </Link>
  );
};

export default TextLink;
