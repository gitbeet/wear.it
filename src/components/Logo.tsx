import Link from "next/link";

const Logo = ({ light }: { light?: boolean }) => (
  <Link href="/">
    <h1
      className={`${
        light ? "text-slate-50" : "text-slate-800"
      } flex items-center rounded-md 
  py-1  font-display text-xl  font-black`}
    >
      Logo
    </h1>
  </Link>
);

export default Logo;
