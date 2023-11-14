interface Props {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ghost?: boolean;
  icon?: JSX.Element;
  disabled?: boolean;
  width?: "FULL" | "FIT";
  size?: "SM" | "MD";
}

const Button = ({
  text,
  onClick,
  icon,
  ghost = false,
  disabled = false,
  width = "FULL",
  size = "MD",
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={`${
        ghost
          ? "border-gray-300 bg-transparent text-gray-800 hover:border-gray-800"
          : "border-transparent bg-gray-800 text-slate-100 hover:bg-gray-600"
      } flex ${
        width === "FULL" ? "w-full" : "w-fit"
      }  min-w-fit items-center justify-center rounded-full border ${
        size === "SM" && "px-5 py-2.5"
      }  ${
        size === "MD" && "px-8 py-4"
      } font-semibold transition-all duration-150`}
      onClick={onClick}
    >
      {icon} <span className={icon ? "pl-2" : ""}>{text}</span>
    </button>
  );
};

export default Button;
