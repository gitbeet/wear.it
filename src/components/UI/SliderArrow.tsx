import NavIcon from "../Nav/NavIcon";
import { FiChevronLeft } from "react-icons/fi";

const arrowContainerClass =
  "absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center";
const arrowIconClass = "bg-slate-200 hover:bg-slate-300";

const SliderArrow = ({
  disabled,
  onClick,
  positionClass,
  className,
  arrowDirectionClass,
}: {
  disabled?: boolean;
  onClick?: () => void;
  positionClass?: string;
  className?: string;
  arrowDirectionClass?: "-rotate-90" | "rotate-90" | "rotate-180";
}) => {
  return (
    <div className={`${arrowContainerClass} ${positionClass}`}>
      <NavIcon
        className={`${arrowIconClass} ${className} `}
        onClick={onClick}
        as="button"
        size={32}
        icon={
          <FiChevronLeft className={`h-full w-full ${arrowDirectionClass}`} />
        }
        disabled={disabled}
      />
    </div>
  );
};

export default SliderArrow;
