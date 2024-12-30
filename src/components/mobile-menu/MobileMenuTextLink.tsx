import TextLink, { type TextLinkProps } from "../uis/TextLink";

const MobileMenuTextLink = ({ children, ...rest }: TextLinkProps) => {
  return (
    <TextLink
      {...rest}
      className="text-lg  font-semibold text-slate-700 hover:text-slate-950"
    >
      {children}
    </TextLink>
  );
};

export default MobileMenuTextLink;
