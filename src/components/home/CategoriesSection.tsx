import Link from "next/link";

interface Category {
    slug: string;
    name: string;
    url: string;
}

export default function CategoriesSection({ categories }: { categories: Category[] }) {
    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-text mb-6">Shop by Category</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {categories.slice(0, 6).map((cat: Category) => (
            <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="bg-white border border-gray-200 px-4 py-4 rounded-xl text-sm font-medium text-text text-center hover:border-primary hover:text-primary transition-colors capitalize shadow-sm"
            >
                {cat.name}
            </Link>
            ))}
        </div>
        </section>
    );
}