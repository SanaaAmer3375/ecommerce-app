"use client";

import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/api";
import { Product } from "@/types";
import ProductCard from "@/components/home/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeaturedProductsProps {
  initialData: {
    products: Product[];
    total: number;
  };
  wishlist: number[];
}

export default function FeaturedProducts({ initialData, wishlist }: FeaturedProductsProps) {
  const { data } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => productsApi.getAll(16),
    initialData,
    staleTime: 60 * 1000,
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Our Top Picks</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight">
            Featured Products
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-md font-medium">
            Discover our most loved items, handpicked for their exceptional quality and design.
          </p>
        </div>
        
        <Link 
          href="/products" 
          className="group flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
        >
          View All Products
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {data?.products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlist.includes(product.id)}
          />
        ))}
      </div>

      {/* Bottom CTA (Optional) */}
      <div className="mt-16 text-center">
        <p className="text-gray-400 text-sm font-medium">
          Showing {data?.products.length} of {data?.total} premium products
        </p>
      </div>
    </section>
  );
}