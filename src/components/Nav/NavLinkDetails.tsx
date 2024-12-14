import { useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import MegaMenu from "./MegaMenu";
import { type CategoryType } from "@prisma/client";

const NavLinkDetails = ({
  type,
  isOpen,
}: {
  isOpen: boolean;

  type: CategoryType | null;
}) => {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const summaryRef = useRef<HTMLElement | null>(null);

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

    if (summaryRef.current) {
      const ariaLabel = `${isOpen ? "Close" : "Open"} ${
        type?.toLowerCase() ?? "category"
      }'s megamenu`;
      summaryRef.current.ariaLabel = ariaLabel;
      summaryRef.current.ariaExpanded = isOpen.toString();
    }
  }, [isOpen, type]);

  return (
    <>
      <details
        ref={detailsRef}
        onBlur={handleOnBlur}
        className="group flex items-center justify-center"
        open={isOpen}
      >
        <summary
          ref={summaryRef}
          className="pointer-events-none relative top-2  flex  cursor-pointer justify-center opacity-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
        >
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
          <MegaMenu type={type ?? "MEN"} />
        </div>
      </details>
    </>
  );
};

export default NavLinkDetails;
