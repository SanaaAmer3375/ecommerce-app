import { readDB, writeDB, Order, OrderItem } from "./db";

export function createOrder(
  userId: string,
  items: OrderItem[],
  subtotal: number,
  shipping: number,
  tax: number,
  shippingOption: string,
  address: Order["address"]
): Order {
  const db = readDB();
  const order: Order = {
    id: `ORD-${Date.now()}`,
    userId,
    items,
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
    shippingOption,
    address,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  db.orders.push(order);
  writeDB(db);
  return order;
}

export function getUserOrders(userId: string): Order[] {
  const db = readDB();
  return db.orders
    .filter((o) => o.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}