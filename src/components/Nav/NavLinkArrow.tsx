import { useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import MegaMenu from "./MegaMenu";
import { type CategoryType } from "@prisma/client";

const NavLinkArrow = ({
  type,
  isOpen,
}: {
  isOpen: boolean;

  type: CategoryType | null;
}) => {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  const handleOnBlur = () => {
    setTimeout(() => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(document.activeElement)
      ) {
        detailsRef.current.open = false;
      }
    }, 0);
  };

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.open = isOpen;
    }
  }, [isOpen]);
  return (
    <li>
      <details ref={detailsRef} onBlur={handleOnBlur} className="group">
        <summary className="pointer-events-none flex h-full cursor-pointer items-center opacity-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
          <FiChevronDown className="grid w-3 text-xs group-open:rotate-180" />
        </summary>

        <div
          className={`
             ${
               isOpen ||
               "group-focus-within:pointer-events-auto group-focus-within:opacity-100"
             } ${
               isOpen
                 ? "pointer-events-auto opacity-100"
                 : "pointer-events-none opacity-0"
             }
             `}
        >
          <MegaMenu type={type} show={true} setShow={() => void 0} />
        </div>
      </details>
    </li>
  );
};

export default NavLinkArrow;
