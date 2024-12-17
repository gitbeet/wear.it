import Link from "next/link";
import { logoIcon } from "public/assets/icons";

const Logo = ({
  responsive = false,
  tabIndex = 0,
}: {
  responsive?: boolean;
  tabIndex?: number;
}) => (
  <Link
    aria-label="Wear.it homepage"
    tabIndex={tabIndex}
    href="/"
    className={` ${
      tabIndex === -1 ? "pointer-events-none" : ""
    } w-fit px-1 py-0.5 transition hover:opacity-[.85] active:opacity-50`}
  >
    <h1 className="flex items-end gap-1 py-1">
      <span className="text-indigo-400">{logoIcon}</span>
      <span
        className={` ${
          responsive ? "hidden sm:block" : ""
        } font-display text-xl  font-black leading-none text-slate-600 `}
      >
        wear<span className="text-indigo-400">.</span>it
      </span>
    </h1>
  </Link>
);

export default Logo;
