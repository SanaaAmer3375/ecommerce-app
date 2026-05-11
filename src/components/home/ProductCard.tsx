import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/home/AddToCartButton";
import WishlistButton from "@/components/ui/WishlistButton";
import SeeMoreText from "@/components/ui/SeeMoreText";

export default function ProductCard({
    product,
    isWishlisted = false,
    }: {
    product: Product;
    isWishlisted?: boolean;
    }) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300 group">
        <Link href={`/products/${product.id}`}>
            <div className="relative h-52 bg-bg-hero overflow-hidden">
            <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.discountPercentage > 5 && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                -{Math.round(product.discountPercentage)}%
                </span>
            )}
            <div className="absolute top-3 right-3">
                <WishlistButton productId={product.id} initialWishlisted={isWishlisted} />
            </div>
            </div>
        </Link>

        <div className="p-4">
            <div className="flex justify-between items-start mb-1">
            <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-text text-sm hover:text-primary transition-colors line-clamp-1 flex-1">
                {product.title}
                </h3>
            </Link>
            <div className="flex items-center gap-1 ml-2 shrink-0 bg-bg-hero px-2 py-0.5 rounded-full">
                <Star size={11} className="text-primary fill-primary" />
                <span className="text-xs text-text font-medium">{product.rating}</span>
            </div>
            </div>

            <p className="text-xs text-text-muted capitalize mb-2 font-medium">{product.category}</p>
            <SeeMoreText text={product.description} limit={60} />

            <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-3">
            <div>
                <span className="font-bold text-text text-lg">${product.price}</span>
                {product.discountPercentage > 5 && (
                <span className="text-xs text-text-muted line-through ml-2">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
                )}
            </div>
            <AddToCartButton product={product} />
            </div>
        </div>
        </div>
    );
}