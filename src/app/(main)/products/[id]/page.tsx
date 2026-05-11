import { productsApi } from "@/lib/api";
import { getWishlist } from "@/actions/wishlist";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import BackButton from "@/components/products/BackButton";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  const [product, wishlist] = await Promise.all([
    productsApi.getById(productId),
    getWishlist(),
  ]);

  if (!product || !product.id || isNaN(productId)) {
    notFound();
  }

  const isWishlisted = wishlist.includes(productId);

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <BackButton />
        <ProductDetailClient
          initialProduct={product}
          isWishlisted={isWishlisted}
        />
      </div>
    </div>
  );
}