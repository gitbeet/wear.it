import { useModalsContext } from "~/context/modalsContext";
import Backdrop from "../UI/Backdrop";
import MobileMenuTextLink from "../UI/MobileMenuTextLink";
import FocusTrap from "focus-trap-react";
import CloseButton from "../UI/CloseButton";

const MobileMenu = () => {
  const { setShowMobileMenu, showMobileMenu } = useModalsContext();
  return (
    <>
      <FocusTrap
        focusTrapOptions={{ allowOutsideClick: true }}
        active={showMobileMenu}
      >
        <div>
          <div
            className={`${
              showMobileMenu ? "" : "translate-x-full"
            } fixed bottom-0 right-0 top-0 z-[100] h-screen w-[min(70%,350px)] bg-slate-50 transition-transform duration-500`}
          >
            <div className="absolute right-8 top-8 h-10">
              <CloseButton
                aria-label="Close mobile menu"
                onClick={() => setShowMobileMenu(false)}
              />
            </div>
            <div className="h-24"></div>
            <ul className="flex flex-col gap-8 pl-12">
              <li>
                {" "}
                <MobileMenuTextLink
                  onClick={() => setShowMobileMenu(false)}
                  href="/"
                >
                  Home
                </MobileMenuTextLink>
              </li>
              <li>
                <MobileMenuTextLink
                  onClick={() => setShowMobileMenu(false)}
                  href="/products/men"
                >
                  Men
                </MobileMenuTextLink>
              </li>
              <li>
                <MobileMenuTextLink
                  onClick={() => setShowMobileMenu(false)}
                  href="/products/women"
                >
                  Women
                </MobileMenuTextLink>
              </li>
              <li>
                <MobileMenuTextLink
                  onClick={() => setShowMobileMenu(false)}
                  href="/products/kids"
                >
                  Kids
                </MobileMenuTextLink>
              </li>
              <li>
                <MobileMenuTextLink
                  onClick={() => setShowMobileMenu(false)}
                  href="/contact"
                >
                  Contact
                </MobileMenuTextLink>
              </li>
            </ul>
          </div>
          <Backdrop
            show={showMobileMenu}
            zIndex={90}
            onClose={() => setShowMobileMenu(false)}
          />
        </div>
      </FocusTrap>
    </>
  );
};

export default MobileMenu;
