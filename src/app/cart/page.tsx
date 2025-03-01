"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Plus, Minus, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size: string;
}

const CartPage: React.FC = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(storedCart);
    }, []);

    const triggerCartUpdate = () => {
        setTimeout(() => {
            window.dispatchEvent(new Event("cart-updated"));
            window.dispatchEvent(new Event("storage"));
        }, 0);
    };

    const updateQuantity = (id: string, size: string, quantity: number) => {
        setCartItems(prevItems => {
            const updatedCart = prevItems.map(item =>
                item.id === id && item.size === size ? {
                    ...item,
                    quantity: Math.max(1, quantity)
                } : item
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            triggerCartUpdate();
            return updatedCart;
        });
    };

    const removeItem = (id: string, size: string) => {
        setCartItems(prevItems => {
            const updatedCart = prevItems.filter(item =>
                !(item.id === id && item.size === size)
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            triggerCartUpdate();
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cart");
        triggerCartUpdate();
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(price);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        localStorage.setItem("checkoutData", JSON.stringify({ products: cartItems }));
        router.push("/cartCheckout");
    };

    return (
        <div className="bg-white min-h-screen mb-36">
            {cartItems.length > 0 ? (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <tr key={`${item.id}-${item.size}`}>
                                        <td className="px-6 py-4 flex items-center">
                                            <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-md border" />
                                            <span className="ml-4 text-sm font-medium text-gray-900">{item.name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.size}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{formatPrice(item.price)}</td>
                                        <td className="px-6 py-4 flex items-center space-x-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                className="p-1 rounded-md hover:bg-gray-100"
                                            >
                                                <Minus className="h-4 w-4 text-gray-500" />
                                            </button>
                                            <span className="text-sm text-gray-900 w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                className="p-1 rounded-md hover:bg-gray-100"
                                            >
                                                <Plus className="h-4 w-4 text-gray-500" />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <button
                                                onClick={() => removeItem(item.id, item.size)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile List */}
                    <div className="md:hidden">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="border-b p-4">
                                <div className="flex items-start gap-4">
                                    <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded-md border" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-medium text-gray-900">{item.name}</span>
                                            <button
                                                onClick={() => removeItem(item.id, item.size)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">Size: {item.size}</div>
                                        <div className="text-sm text-gray-900 mt-1">{formatPrice(item.price)}</div>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                    className="p-1 rounded-md hover:bg-gray-100"
                                                >
                                                    <Minus className="h-4 w-4 text-gray-500" />
                                                </button>
                                                <span className="text-sm text-gray-900 w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                    className="p-1 rounded-md hover:bg-gray-100"
                                                >
                                                    <Plus className="h-4 w-4 text-gray-500" />
                                                </button>
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {formatPrice(item.price * item.quantity)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Subtotal Section */}
                    <div className="p-4 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                            <button
                                onClick={clearCart}
                                className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center"
                            >
                                <Trash2 className="h-5 w-5 mr-2" /> Clear Cart
                            </button>
                            <div>
                                <span className="text-lg font-medium text-gray-900">Subtotal: {formatPrice(calculateTotal())}</span>
                                <p className="text-sm text-gray-500 mt-1">Shipping and taxes calculated at checkout</p>
                            </div>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center"
                        >
                            <CreditCard className="h-5 w-5 mr-2" /> Checkout
                        </button>
                    </div>
                </>
            ) : (
                <div className="h-screen flex items-center justify-center flex-col">
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <Link href="/" className="px-4 py-2 bg-black text-white rounded-md hover:bg-[#1f1f1f] transition-colors">
                        Continue Shopping
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;