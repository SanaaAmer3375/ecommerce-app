"use server";

import { auth } from "@/auth";
import { toggleWishlistItem, getUserWishlist } from "@/lib/wishlist";
import { revalidatePath } from "next/cache";
import { productsApi } from "@/lib/api";
import { Product } from "@/types";

export async function toggleWishlist(productId: number) {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Not authenticated");

    const userId = session.user.email;
    const updatedWishlist = toggleWishlistItem(userId, Number(productId));
    revalidatePath("/products");
    revalidatePath("/favourites");
    revalidatePath(`/products/${productId}`);
    return updatedWishlist;
}

export async function getWishlist() {
    const session = await auth();
    if (!session?.user?.email) return [];
    return getUserWishlist(session.user.email);
}

export async function getWishlistProducts(): Promise<Product[]> {
    const session = await auth();
    if (!session?.user?.email) return [];

    const productIds = getUserWishlist(session.user.email);
    if (productIds.length === 0) return [];

    const products = await Promise.all(
        productIds.map((id) => productsApi.getById(id))
    );
    return products.filter(Boolean);
}