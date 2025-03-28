"use client";

import Image from "next/image";

interface ParallaxHeroProps {
  imageUrl: string;
  title: string;
  children: React.ReactNode;
}

export default function ParallaxHero({
  imageUrl,
  title,
  children,
}: ParallaxHeroProps) {
  return (
    <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL={`${imageUrl}?w=50&blur=50`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}
