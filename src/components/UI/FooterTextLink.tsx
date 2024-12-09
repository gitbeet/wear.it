import TextLink, { type TextLinkProps } from "./TextLink";

const FooterTextLink = ({ children, ...rest }: TextLinkProps) => {
  return (
    <TextLink
      {...rest}
      className="text-sm font-semibold !text-slate-500 hover:!text-slate-800"
    >
      {children}
    </TextLink>
  );
};

export default FooterTextLink;
