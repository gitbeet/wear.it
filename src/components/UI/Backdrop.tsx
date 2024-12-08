import React from "react";

const Backdrop = ({
  show,
  zIndex,
  onClose,
  className = "",
}: {
  show: boolean;
  zIndex?: number;
  onClose?: () => void;
  className?: string;
}) => {
  return (
    <div
      onClick={onClose}
      className={`${
        show ? "bg-slate-900/30 backdrop-blur" : "opacity-0"
      } min-w-screen pointer-events-none fixed inset-0 bottom-0 left-0 right-0 top-0  z-20 h-screen min-h-screen w-screen transition-[opacity] duration-300 ${className}`}
      style={{ zIndex }}
    />
  );
};

export default Backdrop;
