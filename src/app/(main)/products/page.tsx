import { productsApi } from "@/lib/api";
import { Product } from "@/types";
import ProductCard from "@/components/home/ProductCard";
import ProductsFilters from "@/components/products/ProductsFilters";
import { getWishlist } from "@/actions/wishlist";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "";
  const search = params.search || "";

  const [productsData, categories, wishlist] = await Promise.all([
    category
      ? productsApi.getByCategory(category, 12)
      : productsApi.getAll(12, 0, search),
    productsApi.getCategories(),
    getWishlist(),
  ]);

  let products: Product[] = productsData.products;

  if (params.sort === "price-asc") products = [...products].sort((a, b) => a.price - b.price);
  if (params.sort === "price-desc") products = [...products].sort((a, b) => b.price - a.price);
  if (params.sort === "rating") products = [...products].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-text mb-1">All Products</h1>
        <p className="text-text-muted text-sm mb-8">{productsData.total} products found</p>

        <div className="flex gap-8">
          <ProductsFilters categories={categories} currentCategory={category} />
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <p className="text-text font-medium text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}