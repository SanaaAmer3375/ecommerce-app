"use server";

import { auth } from "@/auth";
import { createOrder, getUserOrders } from "@/lib/orders";
import { OrderItem, Order } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function placeOrder(
    items: OrderItem[],
    subtotal: number,
    shipping: number,
    tax: number,
    shippingOption: string,
    address: Order["address"]
    ) {
    const session = await auth();
    if (!session?.user?.email) throw new Error("Not authenticated");

    const order = createOrder(
        session.user.email,
        items,
        subtotal,
        shipping,
        tax,
        shippingOption,
        address
    );

    revalidatePath("/profile");
    return order;
}

export async function fetchUserOrders() {
    const session = await auth();
    if (!session?.user?.email) return [];
    return getUserOrders(session.user.email);
}