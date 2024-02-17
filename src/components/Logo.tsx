import Link from "next/link";
import { logoIcon } from "public/assets/icons";

const Logo = ({ light }: { light?: boolean }) => (
  <Link href="/">
    <h1 className="py-1s flex items-end gap-1">
      <span className="text-indigo-400">{logoIcon}</span>
      <span className="hidden font-display text-xl  font-black leading-none text-slate-600 sm:block">
        wear<span className="text-indigo-400">.</span>it
      </span>
    </h1>
  </Link>
);

export default Logo;
