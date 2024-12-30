import { type SelectHTMLAttributes } from "react";

type Option = {
  value: string | number;
  label: string;
};

type CartItemSelectElementProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
};

const CartItemSelectElement = ({
  options,
  ...props
}: CartItemSelectElementProps) => {
  return (
    <select
      className="cursor-pointer rounded-sm  bg-slate-200 py-0.5 pl-4 disabled:opacity-25"
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CartItemSelectElement;
