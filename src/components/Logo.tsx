import Link from "next/link";
import { logoIcon } from "public/assets/icons";

const Logo = ({ light }: { light?: boolean }) => (
  <Link href="/">
    <h1
      className={`${
        light ? "text-indigo-500" : "text-slate-700"
      } py-1s flex items-end gap-1`}
    >
      <span className="text-indigo-400">{logoIcon}</span>
      <span className="font-display text-xl font-bold leading-none">
        wear<span className="text-indigo-400">.</span>it
      </span>
    </h1>
  </Link>
);

export default Logo;
