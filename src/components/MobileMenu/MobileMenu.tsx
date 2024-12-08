import { VscChromeClose } from "react-icons/vsc";
import { useModalsContext } from "~/context/modalsContext";
import NavIcon from "../Nav/NavIcon";
import TextLink from "../UI/TextLink";
import Backdrop from "../UI/Backdrop";
import MobileMenuTextLink from "../UI/MobileMenuTextLink";

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
        <ul className="flex flex-col gap-8 pl-12">
          <MobileMenuTextLink onClick={() => setShowMobileMenu(false)} href="/">
            <li>Home</li>
          </MobileMenuTextLink>
          <MobileMenuTextLink
            onClick={() => setShowMobileMenu(false)}
            href="/products/men"
          >
            <li>Men</li>
          </MobileMenuTextLink>
          <MobileMenuTextLink
            onClick={() => setShowMobileMenu(false)}
            href="/products/women"
          >
            <li>Women</li>
          </MobileMenuTextLink>
          <MobileMenuTextLink
            onClick={() => setShowMobileMenu(false)}
            href="/products/kids"
          >
            <li>Kids</li>
          </MobileMenuTextLink>
          <MobileMenuTextLink
            onClick={() => setShowMobileMenu(false)}
            href="/contact"
          >
            <li>Contact</li>
          </MobileMenuTextLink>
        </ul>
      </div>
      <Backdrop
        show={showMobileMenu}
        zIndex={90}
        onClose={() => setShowMobileMenu(false)}
      />
    </>
  );
};

export default MobileMenu;
