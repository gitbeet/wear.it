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
    <FiChevronUp
      className={`${
        showButton
          ? "hidden opacity-100 md:block"
          : "pointer-events-none opacity-0"
      }  fixed  left-[calc(100dvw-60px)] top-[calc(100dvh-60px)] z-[1000]   flex h-[56px] w-[56px] -translate-x-full -translate-y-full cursor-pointer flex-col items-center justify-center rounded-full border-2 border-indigo-400 bg-indigo-500 p-1 text-white shadow-sm transition-[opacity,background-color,border] duration-200 hover:border-indigo-300 hover:bg-indigo-400  `}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    />
  );
}

export default GoToTopButton;
