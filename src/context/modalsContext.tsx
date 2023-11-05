import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type ModalsContextType = {
  showMegaMenu: boolean;
  showBagModal: boolean;
  setShowMegaMenu: Dispatch<SetStateAction<boolean>>;
  setShowBagModal: Dispatch<SetStateAction<boolean>>;
};

const modalContext = createContext<ModalsContextType | null>(null);

export const useModalsContext = () => {
  const context = useContext(modalContext);
  if (!context) throw new Error("No modals context found.");
  return context;
};

const ModalsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showBagModal, setShowBagModal] = useState(false);
  return (
    <modalContext.Provider
      value={{ showMegaMenu, showBagModal, setShowMegaMenu, setShowBagModal }}
    >
      {children}
    </modalContext.Provider>
  );
};

export default ModalsProvider;
