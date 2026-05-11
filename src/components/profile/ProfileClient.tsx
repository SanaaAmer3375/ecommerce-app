"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, Package, Settings, Heart } from "lucide-react";
import { getWishlistProducts } from "@/actions/wishlist";
import { fetchUserOrders } from "@/actions/orders";
import Image from "next/image";
import Link from "next/link";

interface UserData {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

async function fetchProfile(email: string): Promise<ProfileData> {
    const saved = localStorage.getItem(`profile_${email}`);
    return saved
        ? JSON.parse(saved)
        : { name: "", email, phone: "", address: "", city: "", state: "" };
}

async function saveProfile(email: string, data: ProfileData): Promise<ProfileData> {
    localStorage.setItem(`profile_${email}`, JSON.stringify(data));
    return data;
}

export default function ProfileClient({ user }: { user: UserData | undefined }) {
    const [activeTab, setActiveTab] = useState<"settings" | "orders" | "favourites">("settings");
    const [editing, setEditing] = useState(false);
    const queryClient = useQueryClient();
    const email = user?.email || "";

    const { data: profile, isLoading } = useQuery({
        queryKey: ["profile", email],
        queryFn: () => fetchProfile(email),
        enabled: !!email,
        staleTime: 60 * 1000,
    });

    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: (data: ProfileData) => saveProfile(email, data),
        onSuccess: (data) => {
        queryClient.setQueryData(["profile", email], data);
        setEditing(false);
        },
    });

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        updateProfile({
        name: formData.get("name") as string,
        email,
        phone: formData.get("phone") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        });
    };

    return (
        <div className="min-h-screen bg-bg">
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-text mb-1">My Account</h1>
            <p className="text-text-muted text-sm mb-8">Manage your profile and orders</p>

            <div className="flex gap-6 flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-4">
                    <div className="w-10 h-10 bg-bg rounded-full flex items-center justify-center">
                    <User size={20} className="text-text-muted" />
                    </div>
                    <div>
                    <p className="font-medium text-text text-sm">{user?.name}</p>
                    <p className="text-xs text-text-muted truncate max-w-35">{user?.email}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <button
                    onClick={() => setActiveTab("settings")}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === "settings" ? "bg-primary text-white" : "text-text hover:bg-bg"
                    }`}
                    >
                    <Settings size={16} />
                    Profile Settings
                    </button>
                    <button
                    onClick={() => setActiveTab("orders")}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === "orders" ? "bg-primary text-white" : "text-text hover:bg-bg"
                    }`}
                    >
                    <Package size={16} />
                    Order History
                    </button>
                    <button
                    onClick={() => setActiveTab("favourites")}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === "favourites" ? "bg-primary text-white" : "text-text hover:bg-bg"
                    }`}
                    >
                    <Heart size={16} />
                    Favourites
                    </button>
                </div>
                </div>
            </aside>

            {/* Content */}
            <div className="flex-1">
                {/* Settings Tab */}
                {activeTab === "settings" && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-text text-lg">Profile Information</h2>
                    {!editing && (
                        <button
                        onClick={() => setEditing(true)}
                        className="text-sm text-primary font-medium hover:underline"
                        >
                        Edit Profile
                        </button>
                    )}
                    </div>

                    {isLoading ? (
                    <div className="grid grid-cols-2 gap-5">
                        {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-12 bg-bg rounded-lg animate-pulse" />
                        ))}
                    </div>
                    ) : (
                    <form onSubmit={handleSave}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                            { label: "Full Name", name: "name", value: profile?.name || user?.name || "" },
                            { label: "Email Address", name: "email", value: email },
                            { label: "Phone Number", name: "phone", value: profile?.phone || "" },
                            { label: "Address", name: "address", value: profile?.address || "" },
                            { label: "City", name: "city", value: profile?.city || "" },
                            { label: "State", name: "state", value: profile?.state || "" },
                        ].map(({ label, name, value }) => (
                            <div key={name} className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-muted">{label}</label>
                            <input
                                type="text"
                                name={name}
                                defaultValue={value}
                                disabled={!editing || name === "email"}
                                className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-text bg-bg focus:outline-none focus:border-primary disabled:opacity-60 transition-colors"
                            />
                            </div>
                        ))}
                        </div>

                        {editing && (
                        <div className="flex gap-3 mt-6">
                            <button
                            type="submit"
                            disabled={isPending}
                            className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-70"
                            >
                            {isPending ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                            type="button"
                            onClick={() => setEditing(false)}
                            className="border border-gray-200 text-text px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-bg transition-colors"
                            >
                            Cancel
                            </button>
                        </div>
                        )}
                    </form>
                    )}
                </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && <OrderHistory />}

                {/* Favourites Tab */}
                {activeTab === "favourites" && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-text text-lg">My Favourites</h2>
                    <Link href="/favourites" className="text-sm text-primary font-medium hover:underline">
                        View All →
                    </Link>
                    </div>
                    <FavouritesPreview />
                </div>
                )}
            </div>
            </div>
        </div>
        </div>
    );
}

// Order History Component
function OrderHistory() {
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchUserOrders,
        staleTime: 30 * 1000,
    });

    if (isLoading) {
        return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-text text-lg mb-6">Order History</h2>
            <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-bg rounded-xl animate-pulse" />
            ))}
            </div>
        </div>
        );
    }

    if (orders.length === 0) {
        return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-text text-lg mb-6">Order History</h2>
            <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Package size={48} className="text-gray-200" />
            <p className="text-text font-medium">No orders yet</p>
            <p className="text-text-muted text-sm">Your orders will appear here</p>
            </div>
        </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-text text-lg mb-6">Order History</h2>
        <div className="flex flex-col gap-4">
            {orders.map((order) => (
            <div key={order.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                <div>
                    <p className="font-medium text-text text-sm">{order.id}</p>
                    <p className="text-xs text-text-muted">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
                    order.status === "delivered" ? "bg-green-100 text-green-600" :
                    order.status === "shipped" ? "bg-blue-100 text-blue-600" :
                    order.status === "processing" ? "bg-yellow-100 text-yellow-600" :
                    "bg-gray-100 text-gray-600"
                    }`}>
                    {order.status}
                    </span>
                    <span className="font-bold text-text">${order.total.toFixed(2)}</span>
                </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                {order.items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-2 bg-bg rounded-lg px-3 py-2">
                    <div className="relative w-8 h-8 shrink-0">
                        <Image src={item.thumbnail} alt={item.title} fill className="object-contain" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-text line-clamp-1 max-w-25">{item.title}</p>
                        <p className="text-xs text-text-muted">x{item.quantity} • ${item.price}</p>
                    </div>
                    </div>
                ))}
                </div>

                <p className="text-xs text-text-muted mt-3">
                📦 {order.shippingOption} → {order.address.city}, {order.address.state}
                </p>
            </div>
            ))}
        </div>
        </div>
    );
    }

    // Favourites Preview Component
    function FavouritesPreview() {
    const { data: products = [], isLoading } = useQuery({
        queryKey: ["wishlist-products"],
        queryFn: getWishlistProducts,
        staleTime: 30 * 1000,
    });

    if (isLoading) {
        return (
        <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-bg rounded-xl animate-pulse" />
            ))}
        </div>
        );
    }

    if (products.length === 0) {
        return (
        <div className="flex flex-col items-center py-8 gap-2">
            <Heart size={32} className="text-gray-200" />
            <p className="text-text-muted text-sm">No favourites yet</p>
            <Link href="/products" className="text-primary text-sm font-medium hover:underline">
            Browse Products
            </Link>
        </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-3">
        {products.slice(0, 4).map((product) => (
            <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="flex items-center gap-3 bg-bg rounded-xl p-3 hover:bg-gray-100 transition-colors"
            >
            <div className="relative w-12 h-12 shrink-0">
                <Image src={product.thumbnail} alt={product.title} fill className="object-contain" />
            </div>
            <div className="min-w-0">
                <p className="text-xs font-medium text-text line-clamp-1">{product.title}</p>
                <p className="text-xs text-primary font-bold">${product.price}</p>
            </div>
            </Link>
        ))}
        </div>
    );
}