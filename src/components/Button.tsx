import React from "react";

interface Props {
  text: string;
  onClick: () => void;
  ghost?: boolean;
}

const Button = ({ text, onClick, ghost = false }: Props) => {
  return (
    <button
      className={`${
        ghost
          ? "border-slate-800 bg-transparent text-slate-800"
          : "border-transparent bg-slate-800 font-semibold text-slate-100"
      } rounded-full border px-4 py-3`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
