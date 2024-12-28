import Link from "next/link";
import NavIcon from "./NavIcon";

const Navbar = () => {
  return (
    <div className="h-[10vh] flex justify-between items-center px-8 md:px-10 border-black border-b border-opacity-20">
      <div></div>
        <Link href="/" className="text-3xl font-semibold">
          VENDALYN
        </Link>
        <div>
            <NavIcon />
        </div>
    </div>
  )
}

export default Navbar
