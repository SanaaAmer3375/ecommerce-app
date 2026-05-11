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
      className={`p-2 rounded-full transition-all ${
        wishlisted
          ? "bg-red-50 text-red-500"
          : "bg-white/80 text-gray-400 hover:text-red-400"
      } shadow-sm`}
    >
      <Heart
        size={16}
        className={wishlisted ? "fill-red-500" : ""}
      />
    </button>
  );
}