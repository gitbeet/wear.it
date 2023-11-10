import Link from "next/link";
import React from "react";

interface Props {
  link: string;
  icon: JSX.Element;
  number: number;
  loading: boolean;
}

const NavIcon = ({ link, icon, number, loading }: Props) => {
  return (
    <>
      <Link href={link}>
        <div
          role="button"
          className="group  relative z-0 rounded-full  bg-transparent p-2.5 hover:bg-gray-300"
        >
          {icon}

          {!loading && number > 0 && (
            <div className="absolute left-1 top-5 flex  h-[19px] w-[19px] items-center justify-center rounded-full bg-teal-500 text-white outline outline-2 outline-white group-hover:outline-gray-300">
              <p className="text-xs">{number}</p>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default NavIcon;
