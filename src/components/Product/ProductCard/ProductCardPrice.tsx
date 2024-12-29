import { formatCurrency } from "~/utilities/formatCurrency";

const ProductCardPrice = ({
  type,
  amount,
}: {
  type: "normal" | "discount" | "beforeDiscount" | "afterDiscount" | "skeleton";
  amount: number;
}) => {
  const commonCssClasses =
    "inline-block rounded-sm px-3 py-1 font-display shadow-sm transition-transform duration-300 text-sm";
  return (
    <span
      className={`
         ${commonCssClasses}
      ${type === "normal" ? "bg-white font-bold" : ""}
      ${type === "beforeDiscount" ? "bg-white text-slate-400 line-through" : ""}
      ${type === "afterDiscount" ? "bg-white font-bold text-pink-500" : ""}
      ${type === "discount" ? "bg-teal-500 font-bold text-white" : ""}
      ${type === "skeleton" ? "h-8 w-20 bg-slate-300" : ""}
         
      `}
    >
      {type !== "skeleton"
        ? type === "discount"
          ? `-${amount}%`
          : formatCurrency(amount)
        : ""}
    </span>
  );
};

export default ProductCardPrice;
