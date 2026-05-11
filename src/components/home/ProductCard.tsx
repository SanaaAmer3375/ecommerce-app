import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import AddToCartButton from "../../components/home/AddToCartButton";
import WishlistButton from "../../components/home/WishlistButton";
import SeeMoreText from "./SeeMoreText";

export default function ProductCard({
    product,
    isWishlisted = false,
    }: {
    product: Product;
    isWishlisted?: boolean;
    }) {
    return (
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 group relative">
            <Link href={`/products/${product.id}`}>
                <div className="relative h-60 bg-[#F9FBFA] overflow-hidden">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {product.discountPercentage > 5 && (
                        <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-primary/20 uppercase tracking-wider z-10">
                            {Math.round(product.discountPercentage)}% OFF
                        </span>
                    )}
                    <div className="absolute top-4 right-4 z-10">
                        <WishlistButton productId={product.id} initialWishlisted={isWishlisted} />
                    </div>
                </div>
            </Link>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <Link href={`/products/${product.id}`} className="flex-1">
                        <h3 className="font-bold text-text text-base hover:text-primary transition-colors line-clamp-1">
                            {product.title}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-1 ml-3 bg-primary/5 px-2 py-1 rounded-lg shrink-0">
                        <Star size={12} className="text-primary fill-primary" />
                        <span className="text-[11px] text-primary font-bold">{product.rating}</span>
                    </div>
                </div>

                <p className="text-[10px] text-primary/60 uppercase tracking-[0.15em] mb-3 font-bold">{product.category}</p>
                
                <div className="text-gray-500 text-xs leading-relaxed mb-5">
                    <SeeMoreText text={product.description} limit={60} />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                    <div className="flex flex-col">
                        <span className="font-extrabold text-text text-xl">${product.price}</span>
                        {product.discountPercentage > 5 && (
                            <span className="text-[10px] text-gray-400 line-through font-medium">
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