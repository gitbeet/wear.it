import Link from "next/link";
import React from "react";
import NavIcon, { NavIconProps } from "./NavIcon";

// interface Props {
//   link?: string;
//   icon: JSX.Element;
//   number?: number;
//   loading?: boolean;
//   color?: string;
//   onClick?: () => void;
// }

type NavIconWithNumberProps = NavIconProps & {
  loading: boolean;
  color: string;
  number: number;
};

const NavIconWithNumber = ({
  number = 0,
  loading,
  color = "bg-indigo-400",
  ...props
}: NavIconWithNumberProps) => {
  const numberJsx = !loading && number > 0 && (
    <div
      className={`${color} absolute right-1.5 top-6 flex  h-4 w-4 items-center justify-center rounded-full text-white outline outline-2 outline-white group-hover:outline-slate-300`}
    >
      <p className="font-display text-[11px] leading-none">{number}</p>
    </div>
  );
  return (
    <>
      {/* extend props and add number, loading and color*/}
      <NavIcon {...props}>{numberJsx}</NavIcon>
    </>
  );
};

export default NavIconWithNumber;
