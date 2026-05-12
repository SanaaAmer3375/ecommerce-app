"use server";

import { auth } from "@/auth";
import { toggleWishlistItem, getUserWishlist } from "@/lib/wishlist";
import { revalidatePath } from "next/cache";
import { productsApi } from "@/lib/api";
import { Product } from "@/types";

export async function toggleWishlist(productId: number) {
    const session = await auth();
    const userId = session?.user?.email || session?.user?.id;

    if (!userId) throw new Error("Not authenticated");

    const updatedWishlist = toggleWishlistItem(userId, Number(productId));
    
    revalidatePath("/products");
    revalidatePath("/favourites");
    revalidatePath(`/products/${productId}`);
    revalidatePath("/");

    return updatedWishlist;
}

export async function getWishlist() {
    const session = await auth();
    const userId = session?.user?.email || session?.user?.id;

    if (!userId) return [];
    
    return getUserWishlist(userId);
}

export async function getWishlistProducts(): Promise<Product[]> {
    const session = await auth();
    const userId = session?.user?.email || session?.user?.id;

    if (!userId) return [];

    const productIds = getUserWishlist(userId);
    if (productIds.length === 0) return [];

    const products = await Promise.all(
        productIds.map((id) => productsApi.getById(id))
    );
    
    return products.filter(Boolean);
}