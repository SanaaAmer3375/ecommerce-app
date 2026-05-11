"use client";

import Link from "next/link";
import { ShoppingCart, User, LogOut, Heart } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useWishlist } from "@/providers/WishlistProvider"; 

export default function Navbar() {
    const { totalItems } = useCart();
    const { data: session } = useSession();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const { wishlistCount } = useWishlist();

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
        setMounted(true);
        });
        return () => cancelAnimationFrame(frame);
    }, []);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-semibold text-text">Serenity Shop</span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-8">
            {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                <Link
                    key={href}
                    href={href}
                    className={`text-sm font-medium transition-colors relative pb-1 ${
                    isActive ? "text-primary" : "text-text hover:text-primary"
                    }`}
                >
                    {label}
                    {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                    )}
                </Link>
                );
            })}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Link
                href="/favourites"
                className={`relative p-2 transition-colors ${
                pathname === "/favourites" ? "text-primary" : "text-text hover:text-primary"
                }`}
            >
                <Heart size={22} />
                {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                </span>
                )}
            </Link>

            {/* Cart */}
            <Link
                href="/cart"
                className={`relative p-2 transition-colors ${
                pathname === "/cart" ? "text-primary" : "text-text hover:text-primary"
                }`}
            >
                <ShoppingCart size={22} />
                {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalItems}
                </span>
                )}
            </Link>

            {/* User Section */}
            {mounted && (
            <div className="flex items-center gap-4">
                {session ? (
                <>
                    <Link
                    href="/profile"
                    className={`flex items-center gap-2 transition-colors ${
                        pathname === "/profile" ? "text-primary" : "text-text hover:text-primary"
                    }`}
                    >
                    <User size={22} />
                    <span className="hidden md:block text-sm font-medium">{session.user?.name}</span>
                    </Link>
                    <button
                    onClick={async () => {
                        await signOut({ callbackUrl: "/login" });
                    }}
                    className="p-2 text-text-muted hover:text-red-500 transition-colors"
                    title="Logout"
                    >
                    <LogOut size={20} />
                    </button>
                </>
                ) : (
                <Link
                    href="/login"
                    className="bg-primary text-white px-5 py-2 rounded-xl text-xs font-medium hover:opacity-90 transition-all hover:shadow-md hover:shadow-primary/20 active:scale-95"
                >
                    Login
                </Link>
                )}
            </div>
            )}
        </div>
        </div>
        </nav>
    );
}