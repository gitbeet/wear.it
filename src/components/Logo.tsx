import Link from "next/link";

const Logo = () => (
  <Link href="/">
    <h1 className="font-display text-xl font-black text-gray-800">
      e.<span className="hidden md:inline">fashion</span>
    </h1>
  </Link>
);

export default Logo;
