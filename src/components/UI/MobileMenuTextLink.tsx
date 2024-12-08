import React from "react";
import TextLink, { type TextLinkProps } from "./TextLink";

const MobileMenuTextLink = ({ children, ...rest }: TextLinkProps) => {
  return (
    <TextLink
      {...rest}
      className="text-lg  font-semibold !text-slate-500 hover:!text-slate-800"
    >
      {children}
    </TextLink>
  );
};

export default MobileMenuTextLink;
