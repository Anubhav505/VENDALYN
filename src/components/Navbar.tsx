import Link from "next/link";
import NavIcon from "./NavIcon";
// import Image from "next/image";

const Navbar = () => {
  return (
    <div className="bg-white-500 nav sticky top-0 h-[10vh] flex justify-between items-center px-8 md:px-10 z-20 overflow-hidden">
      <div></div>
      {/* <Link href="/" className="h-full w-28 text-3xl font-semibold relative">
        <Image src="/favicon.png" alt="logo" layout="fill" objectFit="cover" />
        
      </Link> */}
      <div className="text-6xl ">
        <Link href='/'>VENDALYN</Link>
      </div>
      
      <div>
        {/* <NavIcon /> */}
      </div>
    </div>
  );
};

export default Navbar;
