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

export const ButtonSkeleton = ({
  width = "FULL",
  size = "MD",
  animate = false,
}: {
  width?: "FULL" | "FIT";
  size?: "SM" | "MD";
  animate?: boolean;
}) => (
  <div
    className={` flex ${
      width === "FULL" ? "w-full" : "w-fit"
    }  min-w-fit items-center justify-center rounded-full border ${
      size === "SM" && "px-5 py-2.5"
    }  ${size === "MD" && "px-8 py-4"}  ${
      animate && "animate-pulse"
    } bg-slate-300 font-semibold text-transparent transition-all duration-200 `}
  >
    Text
  </div>
);

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
            ? "hover-hover:hover:border-slate-50 hover-hover:hover:bg-slate-100 hover-hover:hover:text-indigo-500 border-slate-50 bg-transparent text-slate-50"
            : "hover-hover:hover:border-slate-800 border-slate-300 bg-transparent text-slate-800"
          : "hover-hover:hover:bg-slate-600 border-transparent bg-slate-700 text-slate-50 shadow-md shadow-slate-800/10"
      } flex ${
        width === "FULL" ? "w-full" : "w-fit"
      }  min-w-fit items-center justify-center rounded-full border ${
        size === "SM" && "px-5 py-2.5"
      }  ${
        size === "MD" && "px-8 py-4"
      } font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-75`}
      onClick={onClick}
    >
      {icon} <span className={icon ? "pl-2" : ""}>{text}</span>
    </button>
  );
};

export default Button;
