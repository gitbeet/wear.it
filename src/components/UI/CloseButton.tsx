import React from "react";
import NavIcon from "../Nav/NavIcon";
import { VscChromeClose } from "react-icons/vsc";

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <NavIcon
      as="button"
      icon={<VscChromeClose role="button" className="h-5 w-5" />}
      onClick={onClick}
    />
  );
};

export default CloseButton;
