import Link from "next/link"

const Footer = () => {

  return (
    <footer className="border-t flex flex-col text-center text-[9px]">
      <div className="flex flex-col font-semibold text-[#757575] gap-2 my-8">
        <h3 className="font-semibold text-xs text-black">CUSTOMER SERVICES</h3>
        <Link href="/return">PLACE AN EXCHANGE / RETURN REQUEST</Link>
        <Link href="/return-policy">EXCHANGE / RETURN POLCY</Link>
        <Link href="/privacy-policy">PRIVACY POLICY</Link>
        <Link href="/contactUs">CONTACT US</Link>
        <Link href="/shipping-policy">SHIPPING</Link>
        <Link href="/shipping-policy">TERMS</Link>
      </div>
      <div className="border-t text-center text-sm py-4">
        <p>&copy; 2025 Store. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer