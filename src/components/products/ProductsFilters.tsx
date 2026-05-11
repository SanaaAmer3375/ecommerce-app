"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

interface Category {
    slug: string;
    name: string;
}

export default function ProductsFilters({
    categories,
    currentCategory,
    }: {
    categories: Category[];
    currentCategory: string;
    }) {
    const searchParams = useSearchParams();
    const currentSort = searchParams.get("sort") || "";

    const buildUrl = (category: string) => {
        const params = new URLSearchParams();
        if (category) params.set("category", category);
        if (currentSort) params.set("sort", currentSort);
        return `/products?${params.toString()}`;
    };

    const buildSortUrl = (sort: string) => {
        const params = new URLSearchParams();
        if (currentCategory) params.set("category", currentCategory);
        if (sort) params.set("sort", sort);
        return `/products?${params.toString()}`;
    };

    return (
        <aside className="w-64 shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal size={18} className="text-primary" />
            <h2 className="font-semibold text-text">Filters</h2>
            </div>

            {/* Sort By */}
            <div className="mb-6">
            <p className="text-sm font-medium text-text mb-3">Sort By</p>
            <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-text bg-bg focus:outline-none focus:border-primary"
                value={currentSort}
                onChange={(e) => {
                window.location.href = buildSortUrl(e.target.value);
                }}
            >
                <option value="">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
            </select>
            </div>

            {/* Categories */}
            <div>
            <p className="text-sm font-medium text-text mb-3">Categories</p>
            <div className="flex flex-col gap-1">
                <Link
                href="/products"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !currentCategory
                    ? "bg-primary text-white"
                    : "text-text hover:bg-bg"
                }`}
                >
                All Products
                </Link>
                {categories.map((cat: Category) => (
                <Link
                    key={cat.slug}
                    href={buildUrl(cat.slug)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    currentCategory === cat.slug
                        ? "bg-primary text-white"
                        : "text-text hover:bg-bg"
                    }`}
                >
                    {cat.name}
                </Link>
                ))}
            </div>
            </div>
        </div>
        </aside>
    );
}