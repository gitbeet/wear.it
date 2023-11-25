import Link from "next/link";
import React from "react";

const FooterLink = ({ link, linkText }: { link: string; linkText: string }) => {
  return (
    <li className="w-fit text-sm font-semibold text-slate-500 transition-colors duration-150 hover:text-slate-800">
      <Link href={link}>{linkText}</Link>
    </li>
  );
};

export default FooterLink;
