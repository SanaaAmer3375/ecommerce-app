"use client";

import { useCart } from "@/providers/CartProvider";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="w-full lg:w-80 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
        <h2 className="font-bold text-text text-lg mb-6">Order Summary</h2>

        <div className="mb-5">
          <p className="text-sm font-medium text-text mb-3">Shipping Options</p>
          <div className="flex flex-col gap-2">
            {shippingOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                  selectedShipping.id === option.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={selectedShipping.id === option.id}
                    onChange={() => setSelectedShipping(option)}
                    className="accent-primary"
                  />
                  <span className="text-xs text-text">{option.label}</span>
                </div>
                <span className="text-xs font-medium text-text">${option.price.toFixed(2)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="flex flex-col gap-3 text-sm border-t border-gray-100 pt-4">
          <div className="flex justify-between">
            <span className="text-text-muted">Subtotal</span>
            <span className="text-text font-medium">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Shipping</span>
            <span className="text-text font-medium">${selectedShipping.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Tax ({(taxRate * 100).toFixed(0)}%)</span>
            <span className="text-text font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between">
            <span className="font-bold text-text">Total</span>
            <span className="font-bold text-text">${total.toFixed(2)}</span>
          </div>
        </div>

        <button
        onClick={() => router.push("/checkout")}
        className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors mt-6"
        >
        Proceed to Checkout
        </button>
        <Link
          href="/products"
          className="w-full border border-gray-200 text-text py-3 rounded-lg font-medium hover:bg-bg transition-colors mt-3 flex items-center justify-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}