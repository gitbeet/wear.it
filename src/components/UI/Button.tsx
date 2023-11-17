interface Props {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ghost?: boolean;
  icon?: JSX.Element;
  disabled?: boolean;
  width?: "FULL" | "FIT";
  size?: "SM" | "MD";
  light?: boolean;
}

const Button = ({
  text,
  onClick,
  icon,
  ghost = false,
  disabled = false,
  width = "FULL",
  size = "MD",
  light = false,
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={`${
        ghost
          ? light
            ? "border-slate-100 bg-transparent text-slate-50 hover:border-slate-50 hover:bg-slate-100 hover:text-violet-500"
            : "border-slate-300 bg-transparent text-slate-800 hover:border-slate-800"
          : "border-transparent bg-slate-800 text-slate-50 hover:bg-slate-600"
      } flex ${
        width === "FULL" ? "w-full" : "w-fit"
      }  min-w-fit items-center justify-center rounded-full border ${
        size === "SM" && "px-5 py-2.5"
      }  ${
        size === "MD" && "px-8 py-4"
      } font-semibold transition-all duration-200`}
      onClick={onClick}
    >
      {icon} <span className={icon ? "pl-2" : ""}>{text}</span>
    </button>
  );
};

export default Button;
