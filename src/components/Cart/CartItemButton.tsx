import { type ButtonHTMLAttributes, cloneElement } from "react";

type CartItemButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: JSX.Element;
  text: string;
};

const CartItemButton = ({ icon, text, ...props }: CartItemButtonProps) => {
  const scaledIcon = cloneElement(icon, {
    className: "w-full h-full",
  });

  return (
    <button
      {...props}
      className="flex items-center gap-2 text-slate-500 transition-colors duration-150 hover:text-slate-800 active:opacity-25 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className="h-5 w-5">{scaledIcon}</div>

      <span className="pl-2">{text}</span>
    </button>
  );
};

export default CartItemButton;
