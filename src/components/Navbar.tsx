import Link from "next/link";
// import NavIcon from "./NavIcon";
// import Image from "next/image";

const Navbar = () => {
  return (
    <div className="bg-white-500 nav sticky top-0 h-[8vh] flex justify-between items-center px-8 md:px-10 z-20 overflow-hidden">
      <div></div>
      <div className="text-3xl sm:text-5xl">
        <Link href='/'>VENDALYN</Link>
      </div>
      
      <div>
        {/* <NavIcon /> */}
      </div>
    </div>
  );
};

export default Navbar;
