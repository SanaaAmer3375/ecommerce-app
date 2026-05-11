"use client";

import { useState } from "react";
import { useCart } from "@/providers/CartProvider";
import { placeOrder } from "@/actions/orders";
import { useRouter } from "next/navigation";
import { ShoppingBag, MapPin, CreditCard, CheckCircle } from "lucide-react";
import Image from "next/image";

const shippingOptions = [
    { id: "standard", label: "Standard Shipping (5-7 days)", price: 5.99 },
    { id: "express", label: "Express Shipping (2-3 days)", price: 12.99 },
    { id: "overnight", label: "Overnight Shipping (1 day)", price: 24.99 },
];

const TAX_RATE = 0.08;

interface UserData {
    name?: string | null;
    email?: string | null;
}

export default function CheckoutClient({ user }: { user: UserData | undefined }) {
    const { items, totalPrice, handleClearCart } = useCart();
    const router = useRouter();
    const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        address: "",
        city: "",
        state: "",
    });

    const tax = totalPrice * TAX_RATE;
    const total = totalPrice + selectedShipping.price + tax;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
        setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.name) newErrors.name = "Full name is required";
        if (!form.email) newErrors.email = "Email is required";
        if (!form.phone) newErrors.phone = "Phone number is required";
        if (!form.address) newErrors.address = "Address is required";
        if (!form.city) newErrors.city = "City is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
        const orderItems = items.map((i) => ({
            productId: i.product.id,
            title: i.product.title,
            thumbnail: i.product.thumbnail,
            price: i.product.price,
            quantity: i.quantity,
        }));

        await placeOrder(
            orderItems,
            totalPrice,
            selectedShipping.price,
            tax,
            selectedShipping.label,
            form
        );

        handleClearCart();
        setSuccess(true);
        } catch (error) {
        console.error(error);
        }
        setLoading(false);
    };

    if (success) {
        return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-text">Order Placed Successfully!</h2>
            <p className="text-text-muted">Your order has been placed and is being processed.</p>
            <div className="flex gap-3 mt-4">
            <button
                onClick={() => router.push("/profile")}
                className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
            >
                View Orders
            </button>
            <button
                onClick={() => router.push("/products")}
                className="border border-gray-200 text-text px-6 py-3 rounded-xl font-medium hover:bg-bg transition-colors"
            >
                Continue Shopping
            </button>
            </div>
        </div>
        );
    }

    if (items.length === 0) {
        router.push("/cart");
        return null;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left - Form */}
        <div className="flex flex-col gap-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
                <MapPin size={18} className="text-primary" />
                <h2 className="font-bold text-text">Shipping Address</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                { label: "Full Name", name: "name", placeholder: "John Doe" },
                { label: "Email", name: "email", placeholder: "you@example.com" },
                { label: "Phone", name: "phone", placeholder: "+1 555 000 0000" },
                { label: "Address", name: "address", placeholder: "123 Main St" },
                { label: "City", name: "city", placeholder: "New York" },
                { label: "State", name: "state", placeholder: "NY" },
                ].map(({ label, name, placeholder }) => (
                <div key={name} className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-muted">{label}</label>
                    <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={form[name as keyof typeof form]}
                    onChange={handleChange}
                    className={`border rounded-lg px-4 py-3 text-sm text-text bg-bg focus:outline-none transition-colors ${
                        errors[name]
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-200 focus:border-primary"
                    }`}
                    />
                    {errors[name] && (
                    <p className="text-xs text-red-500">{errors[name]}</p>
                    )}
                </div>
                ))}
            </div>
            </div>

            {/* Shipping Options */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
                <ShoppingBag size={18} className="text-primary" />
                <h2 className="font-bold text-text">Shipping Method</h2>
            </div>
            <div className="flex flex-col gap-2">
                {shippingOptions.map((option) => (
                <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                    selectedShipping.id === option.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                    <div className="flex items-center gap-3">
                    <input
                        type="radio"
                        name="shipping"
                        checked={selectedShipping.id === option.id}
                        onChange={() => setSelectedShipping(option)}
                        className="accent-primary"
                    />
                    <span className="text-sm text-text">{option.label}</span>
                    </div>
                    <span className="text-sm font-medium text-text">${option.price.toFixed(2)}</span>
                </label>
                ))}
            </div>
            </div>

            {/* Payment - Mock */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
                <CreditCard size={18} className="text-primary" />
                <h2 className="font-bold text-text">Payment</h2>
            </div>
            <div className="bg-bg rounded-xl p-4 text-sm text-text-muted text-center">
                💳 Demo mode - No real payment required
            </div>
            </div>
        </div>

        {/* Right - Order Summary */}
        <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-bold text-text text-lg mb-5">Order Summary</h2>

            <div className="flex flex-col gap-3 mb-5 max-h-64 overflow-y-auto">
                {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 items-center">
                    <div className="relative w-14 h-14 bg-bg rounded-lg overflow-hidden shrink-0">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-contain p-1"
                    />
                    </div>
                    <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text line-clamp-1">{product.title}</p>
                    <p className="text-xs text-text-muted">x{quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-text shrink-0">
                    ${(product.price * quantity).toFixed(2)}
                    </p>
                </div>
                ))}
            </div>

            <div className="border-t border-gray-100 pt-4 flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                <span className="text-text-muted">Subtotal</span>
                <span className="text-text font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-text-muted">Shipping</span>
                <span className="text-text font-medium">${selectedShipping.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-text-muted">Tax (8%)</span>
                <span className="text-text font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-bold text-text">Total</span>
                <span className="font-bold text-text text-lg">${total.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-colors mt-6 disabled:opacity-70"
            >
                {loading ? "Placing Order..." : `Place Order • $${total.toFixed(2)}`}
            </button>
            </div>
        </div>
        </div>
    );
}