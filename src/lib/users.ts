import bcrypt from "bcryptjs";
import { readDB, writeDB, UserRecord } from "./db";

export type { UserRecord };

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const db = readDB();
  return db.users.find((u) => u.email === email) || null;
}

export async function createUser(name: string, email: string, password: string): Promise<UserRecord> {
  const db = readDB();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: UserRecord = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };
  db.users.push(newUser);
  writeDB(db);
  return newUser;
}

export async function verifyUser(email: string, password: string): Promise<UserRecord | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return user;
}