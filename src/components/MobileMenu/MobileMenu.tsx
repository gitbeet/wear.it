import { VscChromeClose } from "react-icons/vsc";
import { useModalsContext } from "~/context/modalsContext";
import NavIcon from "../Nav/NavIcon";
import LinkText from "../UI/LinkText";
import Backdrop from "../UI/Backdrop";

const MobileMenu = () => {
  const { setShowMobileMenu, showMobileMenu } = useModalsContext();
  const linkTextClass = "text-xl font-semibold";
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
          <LinkText
            onClick={() => setShowMobileMenu(false)}
            href="/"
            className={linkTextClass}
          >
            <li>Home</li>
          </LinkText>
          <LinkText
            onClick={() => setShowMobileMenu(false)}
            href="/products/men"
            className={linkTextClass}
          >
            <li>Men</li>
          </LinkText>
          <LinkText
            onClick={() => setShowMobileMenu(false)}
            href="/products/women"
            className={linkTextClass}
          >
            <li>Women</li>
          </LinkText>
          <LinkText
            onClick={() => setShowMobileMenu(false)}
            href="/products/kids"
            className={linkTextClass}
          >
            <li>Kids</li>
          </LinkText>
          <LinkText
            onClick={() => setShowMobileMenu(false)}
            href="/contact"
            className={linkTextClass}
          >
            <li>Contact</li>
          </LinkText>
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
