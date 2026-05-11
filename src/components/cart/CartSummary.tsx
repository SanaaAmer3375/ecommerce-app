"use client";

import { useCart } from "@/providers/CartProvider";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, ArrowRight } from "lucide-react";

interface ShippingOption {
  id: string;
  label: string;
  price: number;
}

interface CartSummaryProps {
  shippingOptions: ShippingOption[];
  taxRate: number;
}

export default function CartSummary({ shippingOptions, taxRate }: CartSummaryProps) {
  const router = useRouter();
  const { items, totalPrice } = useCart();
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

  const tax = totalPrice * taxRate;
  const total = totalPrice + selectedShipping.price + tax;

  if (items.length === 0) return null;

  return (
    <div className="p-8 space-y-8">
      <h2 className="font-extrabold text-text text-2xl tracking-tight">Order Summary</h2>

      {/* Shipping Selector */}
      <div className="space-y-4">
        <p className="text-xs font-bold text-text/40 uppercase tracking-widest">Shipping Method</p>
        <div className="flex flex-col gap-3">
          {shippingOptions.map((option) => (
            <label
              key={option.id}
              className={`group flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedShipping.id === option.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-gray-100 hover:border-gray-200 bg-gray-50/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedShipping.id === option.id ? "border-primary bg-primary" : "border-gray-300 bg-white"
                }`}>
                  {selectedShipping.id === option.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <input
                  type="radio"
                  name="shipping"
                  className="hidden"
                  checked={selectedShipping.id === option.id}
                  onChange={() => setSelectedShipping(option)}
                />
                <span className={`text-sm font-bold ${selectedShipping.id === option.id ? "text-primary" : "text-text/70"}`}>
                  {option.label.split('(')[0]}
                </span>
              </div>
              <span className="text-sm font-extrabold text-text">${option.price.toFixed(2)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Calculations */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-text-muted font-medium">Subtotal</span>
          <span className="text-text font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted font-medium">Shipping</span>
          <span className="text-text font-bold">${selectedShipping.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted font-medium">Estimated Tax</span>
          <span className="text-text font-bold">${tax.toFixed(2)}</span>
        </div>
        
        <div className="pt-4 mt-2 border-t border-gray-100 flex justify-between items-end">
          <div>
            <p className="text-[10px] font-bold text-text/30 uppercase tracking-[0.2em] mb-1">Total Amount</p>
            <span className="text-3xl font-black text-text tracking-tighter">${total.toFixed(2)}</span>
          </div>
          <div className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-md mb-1">
            USD
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() => router.push("/checkout")}
          className="w-full bg-primary text-white py-5 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          <CreditCard size={20} />
          Proceed to Checkout
        </button>
        
        <Link
          href="/products"
          className="w-full flex items-center justify-center gap-2 py-4 text-sm font-bold text-text/40 hover:text-primary transition-colors"
        >
          Keep Shopping
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}