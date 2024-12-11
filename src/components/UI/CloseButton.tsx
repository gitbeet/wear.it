import NavIcon from "../Nav/NavIcon";
import { VscChromeClose } from "react-icons/vsc";
import { type IconButtonProps } from "./Icon";

type CloseButtonProps = Omit<IconButtonProps, "as" | "icon"> & {
  positionClass?: string;
  arrowDirectionClass?: "-rotate-90" | "rotate-90" | "rotate-180";
};

const CloseButton = ({ ...props }: CloseButtonProps) => {
  return (
    <NavIcon
      {...props}
      as="button"
      icon={<VscChromeClose role="button" className="h-5 w-5" />}
    />
  );
};

export default CloseButton;
