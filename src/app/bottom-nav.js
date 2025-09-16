"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "./cart-context";

export default function BottomNav() {
  const pathname = usePathname();
  const { cart } = useContext(CartContext);

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: "/cart",
      label: "Cart",
      badge: cart.length > 0 ? cart.length : null,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 7H3m4 6v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="bottom-nav">
      <div className="container">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}