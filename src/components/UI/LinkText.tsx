import Link from "next/link";
import type { LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

export type LinkTextProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    className?: string;
    children?: React.ReactNode;
  };

const LinkText = (props: LinkTextProps) => {
  return (
    <Link
      {...props}
      className={`cursor-pointer text-slate-700 hover:text-slate-900  active:opacity-50 ${props.className} transition-all`}
    >
      {props.children}
    </Link>
  );
};

export default LinkText;
