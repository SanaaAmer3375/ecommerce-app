"use client";

import { useState } from "react";
import { useCart } from "@/providers/CartProvider";
import { placeOrder } from "@/actions/orders";
import { useRouter } from "next/navigation";
import { MapPin, CheckCircle, ArrowRight, ShieldCheck, Truck } from "lucide-react";
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
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-50 rounded-[2.5rem] flex items-center justify-center mb-8 relative">
                    <CheckCircle size={48} className="text-green-500 relative z-10" />
                    <div className="absolute inset-0 bg-green-200 rounded-[2.5rem] animate-ping opacity-20" />
                </div>
                <h2 className="text-3xl font-black text-text tracking-tighter mb-3">Order Confirmed!</h2>
                <p className="text-text-muted max-w-sm mb-10 font-medium">
                    Thank you for your purchase. We have sent a confirmation email to <span className="text-text font-bold">{form.email}</span>.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    <button
                        onClick={() => router.push("/profile")}
                        className="flex-1 bg-text text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-200"
                    >
                        Track Order
                    </button>
                    <button
                        onClick={() => router.push("/products")}
                        className="flex-1 border border-gray-100 text-text px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
            {/* Left Column - Form (8 Columns) */}
            <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100">
                <div className="max-w-xl mx-auto space-y-12">
                    
                    {/* Shipping Address */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <MapPin size={20} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-xl font-extrabold text-text tracking-tight">Shipping Address</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                            {[
                                { label: "Full Name", name: "name", placeholder: "e.g. John Doe", span: "sm:col-span-2" },
                                { label: "Email Address", name: "email", placeholder: "john@example.com", span: "sm:col-span-1" },
                                { label: "Phone Number", name: "phone", placeholder: "+1 (555) 000-0000", span: "sm:col-span-1" },
                                { label: "Street Address", name: "address", placeholder: "123 Main St, Apt 4B", span: "sm:col-span-2" },
                                { label: "City", name: "city", placeholder: "New York", span: "sm:col-span-1" },
                                { label: "State", name: "state", placeholder: "NY", span: "sm:col-span-1" },
                            ].map(({ label, name, placeholder, span }) => (
                                <div key={name} className={`flex flex-col gap-2 ${span}`}>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text/40 ml-1">{label}</label>
                                    <input
                                        type="text"
                                        name={name}
                                        placeholder={placeholder}
                                        value={form[name as keyof typeof form]}
                                        onChange={handleChange}
                                        className={`w-full px-5 py-4 rounded-2xl text-sm font-bold transition-all border-2 ${
                                            errors[name]
                                            ? "border-red-100 bg-red-50 focus:border-red-200"
                                            : "border-transparent bg-gray-50 focus:bg-white focus:border-primary/20"
                                        } outline-none`}
                                    />
                                    {errors[name] && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors[name]}</p>}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Shipping Method */}
                    <section className="space-y-6 pt-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Truck size={20} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-xl font-extrabold text-text tracking-tight">Shipping Method</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {shippingOptions.map((option) => (
                                <label
                                    key={option.id}
                                    className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                        selectedShipping.id === option.id
                                            ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                            : "border-gray-50 hover:border-gray-100 bg-gray-50/50"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                            selectedShipping.id === option.id ? "border-primary bg-primary" : "border-gray-300 bg-white"
                                        }`}>
                                            {selectedShipping.id === option.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-bold ${selectedShipping.id === option.id ? "text-primary" : "text-text"}`}>
                                                {option.label}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-black text-text">${option.price.toFixed(2)}</span>
                                    <input type="radio" className="hidden" onChange={() => setSelectedShipping(option)} checked={selectedShipping.id === option.id} />
                                </label>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Right Column - Summary (5 Columns) */}
            <div className="lg:col-span-5 bg-gray-50/50 p-8 md:p-12">
                <div className="max-w-md mx-auto h-full flex flex-col">
                    <h2 className="text-xl font-extrabold text-text tracking-tight mb-8">Order Summary</h2>
                    
                    {/* Items List */}
                    <div className="flex-1 space-y-6 overflow-y-auto max-h-100 pr-2 mb-8 custom-scrollbar">
                        {items.map(({ product, quantity }) => (
                            <div key={product.id} className="flex gap-4 items-center animate-in slide-in-from-right duration-300">
                                <div className="relative w-16 h-16 bg-white rounded-xl border border-gray-100 overflow-hidden shrink-0 shadow-sm">
                                    <Image src={product.thumbnail} alt={product.title} fill className="object-contain p-2" />
                                    <div className="absolute top-0 right-0 bg-text text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-bl-lg">
                                        {quantity}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-text truncate">{product.title}</h4>
                                    <p className="text-[10px] font-bold text-text/40 uppercase tracking-widest">{product.category}</p>
                                </div>
                                <p className="text-sm font-black text-text">
                                    ${(product.price * quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="space-y-4 pt-8 border-t border-gray-200">
                        <div className="flex justify-between text-sm font-bold">
                            <span className="text-text/40 uppercase tracking-widest text-[10px]">Subtotal</span>
                            <span className="text-text font-black">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold">
                            <span className="text-text/40 uppercase tracking-widest text-[10px]">Shipping</span>
                            <span className="text-text font-black">${selectedShipping.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold">
                            <span className="text-text/40 uppercase tracking-widest text-[10px]">Estimated Tax</span>
                            <span className="text-text font-black">${tax.toFixed(2)}</span>
                        </div>
                        
                        <div className="pt-6 mt-2 border-t-2 border-dashed border-gray-200 flex justify-between items-end">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Total to Pay</p>
                                <span className="text-4xl font-black text-text tracking-tighter italic">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-text/40 mb-1">
                                <ShieldCheck size={16} />
                                <span className="text-[10px] font-black uppercase">Secure</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className="w-full bg-primary text-white py-6 rounded-2xl font-black text-lg hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 mt-8 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 group"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Complete Order
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}