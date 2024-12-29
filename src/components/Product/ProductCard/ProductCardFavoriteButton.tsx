import { type HTMLAttributes } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

type BaseProps = Omit<HTMLAttributes<HTMLButtonElement>, "onClick"> & {
  favorited: boolean;
  type: "normal" | "skeleton";
};

type Props =
  | (BaseProps & { interactive: true; onClick: () => void })
  | (BaseProps & { interactive: false });

const ProductCardFavoriteButton = ({
  favorited,
  type,
  interactive,
  ...props
}: Props) => {
  const commonCssClasses =
    "border rounded-full p-1.5 h-8 w-8 @2xs:h-10 @2xs:w-10 @2xs:p-2  absolute right-[4%] top-[4%] z-10 shadow-sm";
  return (
    <button
      {...props}
      className={`
        ${commonCssClasses} 
        ${favorited ? "border-indigo-100" : "border-transparent"}
        ${type === "normal" ? "flex items-center justify-center bg-white" : ""} 
        ${type === "skeleton" ? "bg-slate-300" : ""} 
    ${props.className} ${!interactive ? "pointer-events-none" : ""} transition  
    ${
      favorited && type === "normal"
        ? "text-indigo-400  hover:text-indigo-300"
        : ""
    }
        ${
          !favorited && type === "normal"
            ? "text-slate-400  hover:text-slate-500"
            : ""
        }
    }`}
      disabled={!interactive}
    >
      {favorited && type === "normal" && (
        <BsHeartFill className="h-full w-full " />
      )}
      {!favorited && type === "normal" && <BsHeart className="h-full w-full" />}
    </button>
  );
};

export default ProductCardFavoriteButton;
