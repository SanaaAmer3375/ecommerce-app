import Link from "next/link";

interface Category {
    slug: string;
    name: string;
    url: string;
}

export default function CategoriesSection({ categories }: { categories: Category[] }) {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-10">
                <div className="space-y-1">
                    <h2 className="text-3xl font-extrabold text-text tracking-tight">Shop by Category</h2>
                    <p className="text-text-muted text-sm font-medium">Explore our curated collections</p>
                </div>
                <Link 
                    href="/products" 
                    className="text-primary font-bold text-sm hover:underline underline-offset-4 transition-all"
                >
                    View All Categories
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
                {categories.slice(0, 6).map((cat: Category, index: number) => {
                    const bgs = [
                        'bg-[#F2F7F5]', // Soft Green
                        'bg-[#FDF8F2]', // Soft Sand
                        'bg-[#F5F3FF]', // Soft Lavender
                        'bg-[#F0F9FF]', // Soft Sky
                        'bg-[#FFF1F2]', // Soft Rose
                        'bg-[#F8FAFC]', // Soft Slate
                    ];

                    return (
                        <Link
                            key={cat.slug}
                            href={`/products?category=${cat.slug}`}
                            className={`${bgs[index % bgs.length]} group relative flex flex-col items-center justify-center p-8 rounded-4xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-2 overflow-hidden border border-transparent hover:border-primary/10`}
                        >
                            {/* Decorative Circle Background */}
                            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/40 rounded-full group-hover:scale-[3] transition-transform duration-700 ease-out" />
                            
                            <span className="relative z-10 text-sm font-extrabold text-text group-hover:text-primary transition-colors text-center capitalize tracking-wide">
                                {cat.name}
                            </span>
                            
                            <div className="mt-2 relative z-10 w-6 h-1 bg-primary/20 rounded-full group-hover:w-12 group-hover:bg-primary transition-all duration-500" />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}