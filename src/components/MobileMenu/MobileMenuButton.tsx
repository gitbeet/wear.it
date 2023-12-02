import React from "react";
import { useModalsContext } from "~/context/modalsContext";

const MobileMenuButton = () => {
  const { setShowMobileMenu } = useModalsContext();
  return (
    <button
      onClick={() => setShowMobileMenu((prev) => !prev)}
      className="relative h-5 w-7 xl:hidden "
    >
      <div className="absolute top-0 h-0.5 w-full rounded-full bg-slate-600"></div>
      <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-slate-600"></div>
      <div className="absolute bottom-0 h-0.5 w-full rounded-full bg-slate-600"></div>
    </button>
  );
};

export default MobileMenuButton;
