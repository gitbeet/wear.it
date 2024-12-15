import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import ListItem from "./ListItem";
import Backdrop from "../Backdrop";

const ListMenu = ({
  items,
  show,
  onClose,
  start,
  className,
  backdropZIndex,
}: {
  items: { text: string; onClick: () => void; selected: boolean }[];
  show: boolean;
  onClose: () => void;
  start: "top" | "bottom";
  className?: string;
  backdropZIndex: number;
}) => {
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(
    start === "top" ? 0 : items.length - 1,
  );

  // Focus first/last item depending on arrow pressed
  useEffect(() => {
    if (!show) return;
    const idx = start === "top" ? 0 : items.length - 1;
    setCurrentIndex(idx);
    buttonsRef.current[idx]?.focus();
  }, [start, show, items.length]);

  // Navigate using arrows
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      setCurrentIndex(nextIndex);
      buttonsRef?.current?.[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      setCurrentIndex(prevIndex);
      buttonsRef?.current?.[prevIndex]?.focus();
    }
  };

  // Close the menu onBlur
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!menuRef.current?.contains(e.relatedTarget as Node)) {
      onClose();
    }
  };

  return (
    <>
      <div
        ref={menuRef}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        role="menu"
        className={`${
          show ? "" : "pointer-events-none opacity-0"
        } flex w-max flex-col gap-2 rounded-lg bg-white p-6 font-semibold shadow-md transition-all duration-500 ${className}`}
      >
        {items.map((item, i) => (
          <ListItem
            key={i}
            ref={(el) => (buttonsRef.current[i] = el)}
            {...item}
          />
        ))}
      </div>
      <Backdrop
        show={show}
        onClose={onClose}
        zIndex={backdropZIndex}
        className="!bg-transparent !backdrop-blur-none"
      />
    </>
  );
};

export default ListMenu;
