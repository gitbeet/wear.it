import Link from "next/link";
import { PiTShirt } from "react-icons/pi";

const Logo = () => (
  <Link href="/">
    <h1
      className="flex items-center rounded-md 
     px-3 py-1  font-display text-xl  font-black text-gray-800"
    >
      <PiTShirt className="h-6 w-6" />
      <span className="relative pl-0.5 ">rendy</span>
    </h1>
  </Link>
);

export default Logo;
