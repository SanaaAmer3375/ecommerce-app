"use client";

import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToCartButton({
  product,
  full = false,
}: {
  product: Product;
  full?: boolean;
}) {
  const { addToCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const handleAction = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    addToCart(product);
  };

  return (
    <button
      onClick={handleAction}
      className={`bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2 active:scale-95 ${
        full ? "w-full justify-center px-6 py-3 text-base" : "px-4 py-2 text-sm"
      }`}
    >
      <ShoppingCart size={full ? 18 : 14} />
      {full ? "Add to Cart" : "Add"}
    </button>
  );
}