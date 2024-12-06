import Link from "next/link";
import React from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useModalsContext } from "~/context/modalsContext";
import NavIcon from "../Nav/NavIcon";

const MobileMenu = () => {
  const { setShowMobileMenu, showMobileMenu } = useModalsContext();
  return (
    <>
      <div
        className={`${
          showMobileMenu ? "" : "translate-x-full"
        } fixed bottom-0 right-0 top-0 z-[100] h-screen w-[min(70%,350px)] bg-slate-50 transition-transform duration-500`}
      >
        <div className="absolute right-8 top-8 h-10">
          <NavIcon
            as="button"
            icon={<VscChromeClose role="button" className="h-5 w-5" />}
            onClick={() => setShowMobileMenu(false)}
          />
        </div>
        <div className="h-24"></div>
        <div className="flex flex-col gap-8 pl-12">
          <Link
            onClick={() => setShowMobileMenu(false)}
            href="/"
            className="text-xl font-semibold"
          >
            Home
          </Link>
          <Link
            onClick={() => setShowMobileMenu(false)}
            href="/products/men"
            className="text-xl font-semibold"
          >
            Men
          </Link>
          <Link
            onClick={() => setShowMobileMenu(false)}
            href="/products/women"
            className="text-xl font-semibold"
          >
            Women
          </Link>
          <Link
            onClick={() => setShowMobileMenu(false)}
            href="/products/kids"
            className="text-xl font-semibold"
          >
            Kids
          </Link>
          <Link
            onClick={() => setShowMobileMenu(false)}
            href="/contact"
            className="text-xl font-semibold"
          >
            Contact
          </Link>
        </div>
      </div>

      <div
        onClick={() => setShowMobileMenu(false)}
        className={`${
          showMobileMenu
            ? "bg-slate-900/40 backdrop-blur "
            : "pointer-events-none opacity-0"
        }  fixed inset-0 z-[90]  min-h-screen transition-all duration-300 `}
      ></div>
    </>
  );
};

export default MobileMenu;
