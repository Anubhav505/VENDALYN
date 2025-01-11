import Link from "next/link";
import NavIcon from "./NavIcon";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className=" sticky top-0 h-[10vh] flex justify-between items-center px-8 md:px-10 border-black border-b border-opacity-20 z-20 bg-white overflow-hidden">
      <Link href="/" className="h-full w-28 text-3xl font-semibold relative">
        <Image src="/favicon.png" alt="logo" layout="fill" objectFit="cover" />
      </Link>
      <Link href="/about">ABOUT US</Link>
      
      <div>
        <NavIcon />
      </div>
    </div>
  );
};

export default Navbar;
