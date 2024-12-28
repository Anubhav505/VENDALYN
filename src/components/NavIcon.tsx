"use client"
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import CartModal from "./CartModal";

const NavIcon = () => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    return (
        <div>
            <div className="relative">
                <ShoppingCart className="cursor-pointer" onClick={() => setIsCartOpen((prev => !prev))} />
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-red-500 rounded-full text-white text-sm flex items-center justify-center">2</div>
            </div>
            {isCartOpen && <CartModal />}
        </div>
    )
}

export default NavIcon