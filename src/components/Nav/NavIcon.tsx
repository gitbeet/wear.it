import Link from "next/link";
import React from "react";

interface Props {
  link?: string;
  icon: JSX.Element;
  number?: number;
  loading?: boolean;
  color?: string;
  onClick?: () => void;
}

const NavIcon = ({
  link,
  icon,
  number = 0,
  loading,
  color = "bg-indigo-400",
  onClick,
}: Props) => {
  return (
    <>
      <Link href={link ?? "#"} onClick={onClick}>
        <div
          role="button"
          className="group  relative z-0 rounded-full  bg-transparent p-3 hover:bg-slate-200"
        >
          {icon}

          {!loading && number > 0 && (
            <div
              className={`${color} absolute right-1.5 top-6 flex  h-[17px] w-[17px] items-center justify-center rounded-full text-white outline outline-2 outline-white group-hover:outline-slate-300`}
            >
              <p className="font-display text-[11px] leading-none">{number}</p>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default NavIcon;
