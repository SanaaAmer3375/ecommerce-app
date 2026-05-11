"use client";

import { Heart } from "lucide-react";
import { useState, useTransition } from "react";
import { toggleWishlist } from "@/actions/wishlist";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useWishlist } from "../../providers/WishlistProvider";
import { useQueryClient } from "@tanstack/react-query";

export default function WishlistButton({
  productId,
  initialWishlisted = false,
}: {
  productId: number;
  initialWishlisted?: boolean;
}) {
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { refreshWishlist } = useWishlist();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }

    setWishlisted((prev) => !prev);

    startTransition(async () => {
      try {
        await toggleWishlist(productId);
        await queryClient.invalidateQueries({ queryKey: ["wishlist", session?.user?.email] });
        refreshWishlist(); 
      } catch (error) {
        setWishlisted(!wishlisted);
        console.error("Failed to toggle wishlist", error);
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`group p-2.5 rounded-xl transition-all duration-300 backdrop-blur-md shadow-sm border ${
        wishlisted
          ? "bg-red-500 border-red-500 text-white shadow-red-200"
          : "bg-white/90 border-transparent text-gray-400 hover:text-red-500 hover:bg-white"
      }`}
    >
      <Heart
        size={18}
        strokeWidth={2.5}
        className={`${wishlisted ? "fill-white" : "group-hover:scale-110 transition-transform duration-300"}`}
      />
    </button>
  );
}