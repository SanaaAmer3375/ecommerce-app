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
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <span className="text-xl font-bold text-text tracking-tight">Serenity Shop</span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ href, label }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`text-sm font-semibold transition-all relative pb-1 ${
                                    isActive ? "text-primary" : "text-text/70 hover:text-primary"
                                }`}
                            >
                                {label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Icons & User Section */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Wishlist */}
                    <Link
                        href="/favourites"
                        className={`relative p-2.5 rounded-xl transition-all ${
                            pathname === "/favourites" 
                            ? "bg-primary/10 text-primary" 
                            : "text-text/70 hover:bg-gray-50 hover:text-primary"
                        }`}
                    >
                        <Heart size={20} strokeWidth={2.5} />
                        {mounted && wishlistCount > 0 && (
                            <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    {/* Cart */}
                    <Link
                        href="/cart"
                        className={`relative p-2.5 rounded-xl transition-all ${
                            pathname === "/cart" 
                            ? "bg-primary/10 text-primary" 
                            : "text-text/70 hover:bg-gray-50 hover:text-primary"
                        }`}
                    >
                        <ShoppingCart size={20} strokeWidth={2.5} />
                        {mounted && totalItems > 0 && (
                            <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {/* Vertical Divider */}
                    <div className="w-1px h-6 bg-gray-100 mx-1 hidden sm:block" />

                    {/* Auth Section */}
                    {mounted && (
                        <div className="flex items-center gap-2">
                            {session ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className={`flex items-center gap-2 p-1.5 pr-3 rounded-xl transition-all ${
                                            pathname === "/profile" 
                                            ? "bg-primary/10 text-primary" 
                                            : "text-text/70 hover:bg-gray-50 hover:text-primary"
                                        }`}
                                    >
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <User size={18} strokeWidth={2.5} />
                                        </div>
                                        <span className="hidden lg:block text-sm font-bold tracking-tight">
                                            {session.user?.name?.split(' ')[0]}
                                        </span>
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            await signOut({ callbackUrl: "/login" });
                                        }}
                                        className="p-2.5 text-text/40 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        title="Logout"
                                    >
                                        <LogOut size={20} strokeWidth={2.5} />
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95 ml-2"
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