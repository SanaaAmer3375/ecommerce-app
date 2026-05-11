"use client";

import { useCart } from "@/providers/CartProvider";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartItems() {
  const { items, removeFromCart, updateQuantity, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 py-20 bg-gray-50/50 rounded-4xl border border-dashed border-gray-200">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm">
          <ShoppingBag size={40} className="text-gray-200" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-text">Your cart is empty</h2>
          <p className="text-text-muted text-sm max-w-62.5">Looks like you have not added anything to your cart yet.</p>
        </div>
        <Link
          href="/products"
          className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group"
        >
          Explore Collection
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-6">
      {items.map(({ product, quantity }) => (
        <div
          key={product.id}
          className="group relative flex flex-col sm:flex-row gap-6 items-center p-4 rounded-4xl transition-all border border-transparent hover:border-gray-100 hover:bg-gray-50/30"
        >
          {/* Image Container */}
          <div className="relative w-32 h-32 bg-[#F9FBFA] rounded-2xl overflow-hidden shrink-0 border border-gray-50">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-contain p-3 group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left space-y-1">
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{product.category}</p>
            <Link href={`/products/${product.id}`}>
              <h3 className="font-bold text-text text-lg hover:text-primary transition-colors line-clamp-1">
                {product.title}
              </h3>
            </Link>
            <p className="text-sm text-text-muted font-medium">${product.price.toFixed(2)} each</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
            <button
              onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}
              className="text-text/40 hover:text-primary transition-colors disabled:opacity-30"
              disabled={quantity <= 1}
            >
              <Minus size={16} strokeWidth={3} />
            </button>
            <span className="text-text font-bold text-base min-w-5 text-center">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="text-text/40 hover:text-primary transition-colors"
            >
              <Plus size={16} strokeWidth={3} />
            </button>
          </div>

          {/* Price & Remove */}
          <div className="flex flex-col items-end gap-2 sm:min-w-25">
            <p className="font-extrabold text-text text-lg">
              ${(product.price * quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeFromCart(product.id)}
              className="text-text/20 hover:text-red-500 transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}