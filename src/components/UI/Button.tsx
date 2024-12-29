import { type ButtonHTMLAttributes } from "react";

type Props = {
  text: string;
  ghost?: boolean;
  icon?: JSX.Element;
  width?: "FULL" | "FIT";
  size?: "SM" | "MD";
  light?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

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
  icon,
  ghost = false,
  width = "FULL",
  size = "MD",
  light = false,
  ...props
}: Props) => {
  return (
    <button
      className={`${
        ghost
          ? light
            ? "border-slate-50 bg-transparent text-slate-50 hover:border-slate-50 hover:bg-slate-100 hover:text-slate-800"
            : "border-slate-300 bg-transparent text-slate-800 hover:border-slate-800"
          : " border-transparent bg-slate-700 text-slate-50 shadow-md hover:bg-slate-600"
      } flex ${
        width === "FULL" ? "w-full" : "w-fit"
      }  min-w-fit items-center justify-center rounded-full border ${
        size === "SM" && "px-5 py-2.5"
      }  ${
        size === "MD" && "px-8 py-4"
      } font-semibold transition-all duration-200 active:opacity-25 disabled:cursor-not-allowed disabled:opacity-50`}
      {...props}
    >
      {icon} <span className={icon ? "pl-2" : ""}>{text}</span>
    </button>
  );
};

export default Button;
