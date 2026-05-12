import fs from "fs";
import path from "path";
import { UserRecord } from "./users";

interface DB {
  users: UserRecord[];
  wishlist: { userId: string; productIds: number[] }[];
}

const DB_PATH = path.join(process.cwd(), "db.json");

function readDB(): DB {
  try {
    if (!fs.existsSync(DB_PATH)) return { users: [], wishlist: [] };
    const data = fs.readFileSync(DB_PATH, "utf-8");
    const parsed = JSON.parse(data);
    return {
      users: parsed.users || [],
      wishlist: parsed.wishlist || []
    };
  } catch {
    return { users: [], wishlist: [] };
  }
}

function writeDB(data: DB) {
  const currentDB = readDB();
  const updatedDB = { ...currentDB, ...data };
  fs.writeFileSync(DB_PATH, JSON.stringify(updatedDB, null, 2));
}

export function getUserWishlist(userId: string): number[] {
  const db = readDB();
  return db.wishlist.find((w) => w.userId === userId)?.productIds || [];
}

export function toggleWishlistItem(userId: string, productId: number): number[] {
  const db = readDB();
  const userIndex = db.wishlist.findIndex((w) => w.userId === userId);

  if (userIndex === -1) {
    db.wishlist.push({ userId, productIds: [productId] });
  } else {
    const ids = db.wishlist[userIndex].productIds;
    const exists = ids.includes(productId);
    db.wishlist[userIndex].productIds = exists
      ? ids.filter((id) => id !== productId)
      : [...ids, productId];
  }

  writeDB(db);
  return db.wishlist.find((w) => w.userId === userId)?.productIds || [];
}