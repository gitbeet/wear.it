import NavIcon from "../layout/nav/NavIcon";
import { FiChevronLeft } from "react-icons/fi";
import { type IconButtonProps } from "./Icon";

const arrowContainerClass =
  "absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center";
const arrowIconClass = "bg-slate-200 hover:bg-slate-300";

type SliderArrowProps = Omit<IconButtonProps, "as" | "icon"> & {
  containerClass?: string;
  arrowDirectionClass?: "-rotate-90" | "rotate-90" | "rotate-180";
};

const SliderArrow = ({
  containerClass,
  arrowDirectionClass,
  className,
  onClick,
  disabled,
  ...props
}: SliderArrowProps) => {
  return (
    <div className={`${arrowContainerClass} ${containerClass}`}>
      <NavIcon
        {...props}
        shape="square"
        as="button"
        icon={
          <FiChevronLeft className={`h-full w-full ${arrowDirectionClass}`} />
        }
        className={`${arrowIconClass} ${className} `}
        onClick={onClick}
        size={32}
        disabled={disabled}
      />
    </div>
  );
};

export default SliderArrow;
