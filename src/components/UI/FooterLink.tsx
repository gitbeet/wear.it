import Link from "next/link";
import React from "react";

const FooterLink = ({ link, linkText }: { link: string; linkText: string }) => {
  return (
    <ul className="font-semibold text-slate-900 transition-colors duration-150 hover:text-slate-600">
      <Link href={link}>{linkText}</Link>
    </ul>
  );
};

export default FooterLink;
