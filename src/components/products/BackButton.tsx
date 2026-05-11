"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all mb-6"
    >
      <ChevronLeft size={18} />
      Back
    </button>
  );
}