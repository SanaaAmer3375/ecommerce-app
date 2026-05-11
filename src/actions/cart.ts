"use server";

import { auth } from "@/auth";
import fs from "fs/promises";
import path from "path";
import { CartItem } from "@/types";
import { revalidatePath } from "next/cache";

interface CartEntry {
    userId: string;
    items: CartItem[];
}

interface Database {
    orders: unknown[];
    users: unknown[];
    wishlist: unknown[];
    cart: CartEntry[];
}

const dbPath = path.resolve(process.cwd(), "db.json");

async function getDb(): Promise<Database> {
    const fileData = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(fileData);
}

export async function updateCartAction(cartItems: CartItem[]): Promise<{ success: boolean; error?: string }> {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) return { success: false, error: "Not authenticated" };

    const db = await getDb();

    if (!db.cart || !Array.isArray(db.cart)) {
        db.cart = [];
    }

    const userCartIndex = db.cart.findIndex((entry: CartEntry) => entry.userId === email);

    if (userCartIndex !== -1) {
        db.cart[userCartIndex].items = cartItems;
    } else {
        db.cart.push({ userId: email, items: cartItems });
    }

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");
    revalidatePath("/"); 
    return { success: true };
}

export async function getCartAction(): Promise<CartItem[]> {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) return [];

    const db = await getDb();
    if (!db.cart || !Array.isArray(db.cart)) return [];

    const userCart = db.cart.find((entry: CartEntry) => entry.userId === email);
    return userCart ? userCart.items : [];
}