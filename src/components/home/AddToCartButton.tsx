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
      className={`bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2 active:scale-90 shadow-md shadow-primary/10 group ${
        full ? "w-full justify-center px-8 py-4 text-base" : "px-5 py-2.5 text-xs"
      }`}
    >
      <ShoppingCart 
        size={full ? 20 : 16} 
        strokeWidth={2.5} 
        className="group-hover:-translate-y-0.5 transition-transform" 
      />
      {full ? "Add to Cart" : "Add"}
    </button>
  );
}