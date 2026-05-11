import { CartItem, Product } from "@/types";

export function getCartKey(email: string) {
  return `cart_${email}`;
}

export function getCartFromStorage(email: string): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(getCartKey(email));
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(email: string, items: CartItem[]) {
  localStorage.setItem(getCartKey(email), JSON.stringify(items));
}

export function addItemToCart(items: CartItem[], product: Product): CartItem[] {
  const existing = items.find((i) => i.product.id === product.id);
  if (existing) {
    return items.map((i) =>
      i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
    );
  }
  return [...items, { product, quantity: 1 }];
}

export function removeItemFromCart(items: CartItem[], productId: number): CartItem[] {
  return items.filter((i) => i.product.id !== productId);
}

export function updateItemQuantity(items: CartItem[], productId: number, quantity: number): CartItem[] {
  if (quantity < 1) return removeItemFromCart(items, productId);
  return items.map((i) => (i.product.id === productId ? { ...i, quantity } : i));
}