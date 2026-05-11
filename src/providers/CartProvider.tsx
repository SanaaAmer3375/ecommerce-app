"use client";

import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CartItem, Product } from "@/types";
import { getCartAction, updateCartAction } from "@/actions/cart";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  handleClearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const email: string = session?.user?.email || "";

  const { data: items = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ["cart", email],
    queryFn: async (): Promise<CartItem[]> => {
      if (status !== "authenticated") return [];
      return await getCartAction();
    },
    enabled: status === "authenticated",
  });

  const cartMutation = useMutation({
    mutationFn: async (newItems: CartItem[]): Promise<CartItem[]> => {
      if (status !== "authenticated" || !email || email.length < 5) {
        return items;
      }
      const response = await updateCartAction(newItems);
      if (!response.success) throw new Error(response.error);
      return newItems;
    },
    onSuccess: (newItems: CartItem[]) => {
      queryClient.setQueryData(["cart", email], newItems);
    },
  });

  const addToCart = (product: Product, qty: number = 1): void => {
    if (status !== "authenticated") return;
    const existing = items.find((i: CartItem) => i.product.id === product.id);
    const newItems = existing
      ? items.map((i: CartItem) => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i)
      : [...items, { product, quantity: qty }];
    cartMutation.mutate(newItems);
  };

  const removeFromCart = (productId: number): void => {
    if (status !== "authenticated") return;
    const newItems = items.filter((i: CartItem) => i.product.id !== productId);
    cartMutation.mutate(newItems);
  };

  const updateQuantity = (productId: number, quantity: number): void => {
    if (status !== "authenticated") return;
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    const newItems = items.map((i: CartItem) => i.product.id === productId ? { ...i, quantity } : i);
    cartMutation.mutate(newItems);
  };
  const handleClearCart = (): void => {
    if (status === "authenticated" && email) {
      cartMutation.mutate([]);
    }
  };

  const totalItems: number = items.reduce((sum: number, i: CartItem) => sum + i.quantity, 0);
  const totalPrice: number = items.reduce((sum: number, i: CartItem) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, handleClearCart, totalItems, totalPrice, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}