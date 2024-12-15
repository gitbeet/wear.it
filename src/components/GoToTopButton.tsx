import { useState, useEffect } from "react";
import { FiChevronUp } from "react-icons/fi";

function GoToTopButton() {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <button
      aria-label="Go to the top of the page"
      className={`${
        showButton
          ? "hidden opacity-100 md:block"
          : "pointer-events-none opacity-0"
      }  fixed  left-[calc(100dvw-80px)] top-[calc(100dvh-80px)] z-[1000] flex h-14 w-14 -translate-x-full -translate-y-full cursor-pointer flex-col items-center justify-center rounded-full border-2 border-slate-100 bg-white  p-2 text-slate-600 shadow-sm transition-[opacity,background-color,border] duration-150  hover:border-slate-200 hover:bg-slate-50 active:opacity-50`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FiChevronUp className="h-full w-full" />
    </button>
  );
}

export default GoToTopButton;
