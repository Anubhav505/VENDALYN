"use client";
import Link from "next/link";
import Whatsapp from "./Whatsapp";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                VENDALYN
              </span>
            </Link>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <motion.div whileHover={{ x: 5 }}>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }}>
                <Link href="/contactUs" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Policies Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Policies
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                { label: "Terms", href: "/terms-and-conditions" },
                { label: "Shipping", href: "/shipping-policy" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Return Policy", href: "/return-policy" },
              ].map((link, idx) => (
                <motion.li whileHover={{ x: 5 }} key={idx}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Returns Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Returns
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <motion.div whileHover={{ x: 5 }}>
                <Link href="/return" className="hover:text-white transition-colors">
                  Place Exchange/Return Request
                </Link>
              </motion.div>
              <div className="pt-4">
                <Whatsapp />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 py-8">
          <div className="text-center text-sm text-gray-500">
            © 2025 VENDALYN. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
