"use client";

import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/api";
import { Product } from "@/types";
import ProductCard from "@/components/home/ProductCard";

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
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-text">Featured Products</h2>
        <a href="/products" className="text-primary text-sm font-medium hover:underline">
          View All →
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlist.includes(product.id)}
          />
        ))}
      </div>
    </section>
  );
}