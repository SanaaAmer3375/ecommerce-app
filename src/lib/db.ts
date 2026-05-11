import fs from "fs";
import path from "path";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface WishlistRecord {
  userId: string;
  productIds: number[];
}

export interface OrderItem {
  productId: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingOption: string;
  address: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
}

export interface DB {
  users: UserRecord[];
  wishlist: WishlistRecord[];
  orders: Order[];
}

const DB_PATH = path.join(process.cwd(), "db.json");

export function readDB(): DB {
  try {
    if (!fs.existsSync(DB_PATH)) return { users: [], wishlist: [], orders: [] };
    const data = fs.readFileSync(DB_PATH, "utf-8");
    const parsed = JSON.parse(data);
    return { orders: [], ...parsed };
  } catch {
    return { users: [], wishlist: [], orders: [] };
  }
}

export function writeDB(data: DB) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}