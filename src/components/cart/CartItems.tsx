"use client";

import { useCart } from "@/providers/CartProvider";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartItems() {
  const { items, removeFromCart, updateQuantity, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
        <ShoppingBag size={64} className="text-gray-200" />
        <h2 className="text-xl font-bold text-text">Your cart is empty</h2>
        <p className="text-text-muted text-sm">Add some products to get started</p>
        <Link
          href="/products"
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      {items.map(({ product, quantity }) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4 items-center"
        >
          <div className="relative w-20 h-20 bg-bg rounded-xl overflow-hidden shrink-0">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-contain p-1"
            />
          </div>

          <div className="flex-1">
            <p className="font-semibold text-text text-sm">{product.title}</p>
            <p className="text-xs text-text-muted capitalize">{product.category}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="text-text font-medium w-4 text-center">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          <p className="font-bold text-text w-20 text-right">
            ${(product.price * quantity).toFixed(2)}
          </p>

          <button
            onClick={() => removeFromCart(product.id)}
            className="text-gray-300 hover:text-red-400 transition-colors ml-2"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}