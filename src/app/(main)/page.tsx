import { productsApi } from "@/lib/api";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { getWishlist } from "../../../src/actions/wishlist";

export default async function HomePage() {
  const [productsData, categories, wishlist] = await Promise.all([
    productsApi.getAll(16),
    productsApi.getCategories(),
    getWishlist(),
  ]);

  return (
    <div className="min-h-screen bg-bg">
      <HeroSection />
      <CategoriesSection categories={categories} />
      <FeaturedProducts initialData={productsData} wishlist={wishlist} />
    </div>
  );
}