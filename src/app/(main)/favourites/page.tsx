import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getWishlistProducts, getWishlist } from "@/actions/wishlist";
import ProductCard from "@/components/home/ProductCard";
import { Heart } from "lucide-react";
import Link from "next/link";

export default async function FavouritesPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const [products, wishlist] = await Promise.all([
    getWishlistProducts(),
    getWishlist(),
  ]);

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Heart size={28} className="text-primary fill-primary" />
          <div>
            <h1 className="text-3xl font-bold text-text">My Favourites</h1>
            <p className="text-text-muted text-sm">{products.length} saved items</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Heart size={64} className="text-gray-200" />
            <p className="text-text font-medium text-lg">No favourites yet</p>
            <p className="text-text-muted text-sm">Start adding products you love!</p>
            <Link
              href="/products"
              className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
  );
}