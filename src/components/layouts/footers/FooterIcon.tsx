import Icon, { type IconProps } from "../../uis/Icon";

const FooterIcon = ({ className, ...props }: IconProps) => {
  return <Icon {...props} className={`${className} hover:text-slate-600`} />;
};

export default FooterIcon;
