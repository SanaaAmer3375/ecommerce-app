"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductImages({
  images = [],
  title,
  thumbnail,
}: {
  images: string[];
  title: string;
  thumbnail: string;
}) {
  const allImages = [
    thumbnail, 
    ...(images?.filter((img) => img !== thumbnail) || [])
  ];
  
  const [selected, setSelected] = useState(0);

  // Fallback if no images at all
  if (!allImages[0]) {
    return <div className="h-96 bg-gray-100 rounded-xl animate-pulse" />;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative h-96 bg-bg rounded-xl overflow-hidden">
        <Image
          src={allImages[selected] || thumbnail}
          alt={title}
          fill
          priority
          className="object-contain p-6"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {allImages.slice(0, 4).map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`relative h-20 bg-bg rounded-lg overflow-hidden border-2 transition-colors ${
              selected === i ? "border-primary" : "border-transparent"
            }`}
          >
            <Image src={img} alt={`${title} ${i}`} fill className="object-contain p-2" />
          </button>
        ))}
      </div>
    </div>
  );
}