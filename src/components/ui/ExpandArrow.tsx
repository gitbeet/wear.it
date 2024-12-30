import NavIcon from "../layout/nav/NavIcon";
import { FaChevronDown } from "react-icons/fa";

const ExpandArrow = ({
  onClick,
  disabled,
  expanded,
}: {
  onClick?: () => void;
  disabled?: boolean;
  expanded: boolean;
}) => {
  return (
    <div className="h-5 w-5">
      <NavIcon
        disabled={disabled}
        as="button"
        icon={
          <FaChevronDown
            onClick={onClick}
            role="button"
            className={`${
              expanded && "rotate-180"
            } h-full w-full p-0.5 transition-transform duration-150`}
          />
        }
      />
    </div>
  );
};

export default ExpandArrow;
