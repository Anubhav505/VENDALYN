"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

const NavIcon = () => {
    const [cartCount, setCartCount] = useState(0);

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(cart.length);
    };

    useEffect(() => {
        // Initial load
        updateCartCount();

        // Event listeners with debouncing
        const handleCartEvent = () => {
            requestAnimationFrame(updateCartCount);
        };

        window.addEventListener("cart-updated", handleCartEvent);
        window.addEventListener("storage", handleCartEvent);

        return () => {
            window.removeEventListener("cart-updated", handleCartEvent);
            window.removeEventListener("storage", handleCartEvent);
        };
    }, []);

    return (
        <Link href={"/cart"} className="relative">
            <ShoppingCart className="cursor-pointer" />
            {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {cartCount}
                </div>
            )}
        </Link>
    )
}

export default NavIcon;