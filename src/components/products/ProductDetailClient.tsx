"use client";

import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/api";
import { Product } from "@/types";
import { useState } from "react";
import { useCart } from "@/providers/CartProvider";
import { Star, ShoppingCart, Package, RotateCcw, Shield, Minus, Plus } from "lucide-react";
import WishlistButton from "@/components/ui/WishlistButton";
import ProductImages from "@/components/products/ProductImages";

export default function ProductDetailClient({
    initialProduct,
    isWishlisted,
    }: {
    initialProduct: Product;
    isWishlisted: boolean;
    }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart, items } = useCart();

    const { data: product } = useQuery({
        queryKey: ["product", initialProduct.id],
        queryFn: () => productsApi.getById(initialProduct.id),
        initialData: initialProduct,
        staleTime: 60 * 1000,
    });

    const cartItem = items.find((i) => i.product.id === product.id);

    const handleAddToCart = () => {
    addToCart(product, quantity);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Images */}
            <ProductImages
            images={product.images}
            title={product.title}
            thumbnail={product.thumbnail}
            />

            {/* Info */}
            <div className="flex flex-col gap-5">
            <div>
                <p className="text-sm text-primary font-medium capitalize mb-1">{product.category}</p>
                <h1 className="text-3xl font-bold text-text mb-2">{product.title}</h1>
                <p className="text-sm text-text-muted">by {product.brand}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                    key={i}
                    size={16}
                    className={
                        i < Math.round(product.rating)
                        ? "text-primary fill-primary"
                        : "text-gray-200 fill-gray-200"
                    }
                    />
                ))}
                </div>
                <span className="text-sm text-text-muted">{product.rating} rating</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-text">${product.price}</span>
                {product.discountPercentage > 5 && (
                <span className="bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full">
                    -{Math.round(product.discountPercentage)}% OFF
                </span>
                )}
            </div>

            <p className="text-text-muted text-sm leading-relaxed">{product.description}</p>

            {/* Stock */}
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? "bg-green-500" : "bg-orange-400"}`} />
                <span className="text-sm text-text-muted">
                {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
                </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text">Quantity</label>
                <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 hover:bg-bg transition-colors text-text"
                    >
                    <Minus size={16} />
                    </button>
                    <span className="px-6 py-3 font-semibold text-text border-x border-gray-200 min-w-15 text-center">
                    {quantity}
                    </span>
                    <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-4 py-3 hover:bg-bg transition-colors text-text"
                    >
                    <Plus size={16} />
                    </button>
                </div>
                {cartItem && (
                    <span className="text-sm text-text-muted">
                    {cartItem.quantity} already in cart
                    </span>
                )}
                </div>
            </div>

            {/* Add to Cart + Wishlist */}
            <div className="flex gap-3">
                <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                >
                <ShoppingCart size={18} />
                Add {quantity > 1 ? `${quantity} items` : ""} to Cart
                </button>
                <div className="border border-gray-200 rounded-xl flex items-center justify-center px-4">
                <WishlistButton productId={product.id} initialWishlisted={isWishlisted} />
                </div>
            </div>

            {/* Total Price */}
            {quantity > 1 && (
                <div className="bg-bg rounded-xl p-4 flex justify-between items-center">
                <span className="text-sm text-text-muted">Total for {quantity} items</span>
                <span className="font-bold text-text text-lg">
                    ${(product.price * quantity).toFixed(2)}
                </span>
                </div>
            )}

            {/* Features */}
            <div className="border-t border-gray-100 pt-5 grid grid-cols-3 gap-4">
                {[
                { icon: Package, text: "Free Shipping" },
                { icon: RotateCcw, text: "Easy Returns" },
                { icon: Shield, text: "Secure Payment" },
                ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-2 text-center">
                    <Icon size={20} className="text-primary" />
                    <span className="text-xs text-text-muted">{text}</span>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
}