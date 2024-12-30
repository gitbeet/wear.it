import React from "react";
import { useModalsContext } from "~/context/modalsContext";
import NavIcon from "../Layout/Nav/NavIcon";
import { CiMenuBurger } from "react-icons/ci";

const MobileMenuButton = () => {
  const { setShowMobileMenu } = useModalsContext();

  const burger = <CiMenuBurger className="h-5 w-5" />;

  return (
    <div className="relative h-10 xl:hidden">
      <NavIcon
        aria-label="Mobile menu"
        as="button"
        icon={burger}
        onClick={() => setShowMobileMenu((prev) => !prev)}
      />
    </div>
  );
};

export default MobileMenuButton;
