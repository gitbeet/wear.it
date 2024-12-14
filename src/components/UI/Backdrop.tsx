import { useIsBrowser } from "~/hooks/useIsBrowser";
import { createPortal } from "react-dom";

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
  const { isBrowser } = useIsBrowser();

  const jsx = (
    <div
      onClick={onClose}
      className={`${
        show ? "bg-slate-900/30 backdrop-blur" : "pointer-events-none opacity-0"
      } min-w-screen  fixed inset-0 bottom-0 left-0 right-0 top-0  z-20 h-screen min-h-screen w-screen transition-[opacity] duration-300 ${className}`}
      style={{ zIndex }}
    />
  );

  if (!isBrowser) return null;

  const portalJsx = createPortal(
    jsx,
    document.getElementById("modal-root") as Element,
  );

  return portalJsx;
};

export default Backdrop;
