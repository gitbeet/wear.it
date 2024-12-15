import Icon, { type IconProps } from "../UI/Icon";

export type NavIconProps = IconProps & {
  shape?: "circle" | "square";
  variant?: "normal" | "danger";
};

const NavIcon = ({
  className,
  shape = "circle",
  variant = "normal",
  ...props
}: NavIconProps) => {
  return (
    <Icon
      {...props}
      className={`${className} relative h-full w-auto shrink-0 ${
        shape === "circle" ? "rounde-full" : "rounded-md"
      } bg-transparent hover:bg-slate-200 ${
        variant === "danger" ? "hover:text-red-400" : ""
      } `}
    />
  );
};

export default NavIcon;
