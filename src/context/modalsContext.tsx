import { type CategoryType } from "@prisma/client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { disableScrolling, enableScrolling } from "~/utilities/toggleScrolling";

type ModalsContextType = {
  showMegaMenu: { type: CategoryType; show: boolean; active: boolean }[];
  showBagModal: {
    type: "cart" | "favorite" | null;
    show: boolean;
  };
  showMobileMenu: boolean;
  showMobileFiltersMenu: boolean;
  setShowMegaMenu: Dispatch<
    SetStateAction<{ type: CategoryType; show: boolean; active: boolean }[]>
  >;
  setShowBagModal: Dispatch<
    SetStateAction<{
      type: "cart" | "favorite" | null;
      show: boolean;
    }>
  >;
  setShowMobileMenu: Dispatch<SetStateAction<boolean>>;
  setShowMobileFiltersMenu: Dispatch<SetStateAction<boolean>>;
  toggleMegaMenu: (type: CategoryType) => void;
  openMegaMenu: (type: CategoryType) => void;
  hideMegamenu: () => void;
  setMegaMenuActiveType: (type: CategoryType) => void;
};

const modalContext = createContext<ModalsContextType | null>(null);

export const useModalsContext = () => {
  const context = useContext(modalContext);
  if (!context) throw new Error("No modals context found.");
  return context;
};

const ModalsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  /*  
  type is for the content of the mega menu
  show is for whather to show or not the menga menu (in order to not render several menus)
  active is in order to make the navlink component text into a link (IOS touch event)  
  */
  const [showMegaMenu, setShowMegaMenu] = useState<
    { type: CategoryType; show: boolean; active: boolean }[]
  >([
    // TODO : dynamic types, not hard coded
    { type: "MEN", show: false, active: false },
    { type: "WOMEN", show: false, active: false },
  ]);
  const [showBagModal, setShowBagModal] = useState<{
    type: "cart" | "favorite" | null;
    show: boolean;
  }>({ type: null, show: false });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileFiltersMenu, setShowMobileFiltersMenu] = useState(false);

  const toggleMegaMenu = (type: CategoryType) => {
    setShowMegaMenu((prev) =>
      prev.map((e) => (e.type === type ? { ...e, show: !e.show } : e)),
    );
  };

  const openMegaMenu = (type: CategoryType) => {
    setShowMegaMenu((prev) =>
      prev.map((e) =>
        e.type === type ? { ...e, show: true } : { ...e, show: false },
      ),
    );
  };

  const hideMegamenu = () => {
    setShowMegaMenu((prev) => prev.map((e) => ({ ...e, show: false })));
  };

  const setMegaMenuActiveType = (type: CategoryType) => {
    setShowMegaMenu((prev) =>
      prev.map((e) =>
        e.type === type ? { ...e, active: true } : { ...e, active: false },
      ),
    );
  };

  useEffect(() => {
    if (showBagModal.show || showMobileMenu) {
      disableScrolling();
      return;
    }
    if (!showBagModal.show || !showMobileMenu) {
      enableScrolling();
      return;
    }
  }, [showBagModal, showMobileMenu]);

  return (
    <modalContext.Provider
      value={{
        showMegaMenu,
        showBagModal,
        setShowMegaMenu,
        setShowBagModal,
        // MOBILE MENU
        showMobileMenu,
        setShowMobileMenu,
        showMobileFiltersMenu,
        setShowMobileFiltersMenu,
        // MEGAMENU
        toggleMegaMenu,
        openMegaMenu,
        hideMegamenu,
        setMegaMenuActiveType,
      }}
    >
      {children}
    </modalContext.Provider>
  );
};

export default ModalsProvider;
