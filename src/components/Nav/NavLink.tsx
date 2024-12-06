import LinkText, { type LinkTextProps } from "../UI/LinkText";

const NavLink = (props: LinkTextProps) => {
  return (
    <LinkText
      {...props}
      className={`grid grow place-content-center border-b-[6px] border-b-transparent px-4  !text-slate-800  hover:!border-indigo-400 hover:!text-indigo-400 ${props.className}`}
    >
      <li className="relative top-[6px]">{props.children}</li>
    </LinkText>
  );
};

export default NavLink;
