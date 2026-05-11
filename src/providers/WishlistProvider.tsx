"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "@/actions/wishlist";

interface WishlistContextType {
    wishlistIds: number[];
    wishlistCount: number;
    isLoading: boolean;
    refreshWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function useWishlist() {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
    return ctx;
}

export default function WishlistProvider({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const email = session?.user?.email || "";

    const { data: wishlistIds = [], isLoading, refetch } = useQuery<number[]>({
        queryKey: ["wishlist", email],
        queryFn: async () => {
        if (status !== "authenticated") return [];
        return await getWishlist();
        },
        enabled: status === "authenticated" && !!email,
        staleTime: 0,
    });

    return (
        <WishlistContext.Provider 
        value={{ 
            wishlistIds, 
            wishlistCount: wishlistIds.length, 
            isLoading, 
            refreshWishlist: () => {
            refetch();
            } 
        }}
        >
        {children}
        </WishlistContext.Provider>
    );
}