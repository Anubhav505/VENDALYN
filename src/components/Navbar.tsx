import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-white nav sticky top-0 py-2 border-b border-black flex justify-between items-center px-8 md:px-10 z-20 overflow-hidden sm:h-[7vh]">
      <div></div>
      <div className="text-[7vw] sm:text-4xl">
        <Link href='/'>VENDALYN</Link>
      </div>
      
      <div>
        {/* <NavIcon /> */}
      </div>
    </div>
  );
};

export default Navbar;
