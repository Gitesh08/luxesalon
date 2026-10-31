"use client";

import React from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";

export function Gallery() {
  const images = IMAGES.gallery;

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 border-b border-[var(--color-border)] bg-[var(--ground)]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 border-b border-[var(--color-border)] pb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] font-semibold block mb-2">
            Visual Anthology
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[var(--ink)] leading-tight mb-4">
            The Atelier Gallery
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-xl">
            A quiet visual study of form, light, balance, and precision hair
            architecture captured inside our private styling chambers.
          </p>
        </div>

        {/* Asymmetric Editorial Collage (NOT a generic card grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Large Portrait (Spans 7 cols) */}
          <div className="md:col-span-7 relative aspect-[4/5] border border-[var(--color-border)] overflow-hidden group">
            <Image
              src={images[0].url}
              alt={images[0].caption}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-[#F5F0E8]">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold)] font-mono block">
                {images[0].category}
              </span>
              <span className="font-serif text-xl sm:text-2xl font-light">
                {images[0].caption}
              </span>
            </div>
          </div>

          {/* Right Column Staggered Pair (Spans 5 cols) */}
          <div className="md:col-span-5 space-y-8">
            <div className="relative aspect-[3/2] border border-[var(--color-border)] overflow-hidden group">
              <Image
                src={images[1].url}
                alt={images[1].caption}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-[#F5F0E8]">
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold)] font-mono block">
                  {images[1].category}
                </span>
                <span className="font-serif text-lg font-light">
                  {images[1].caption}
                </span>
              </div>
            </div>

            <div className="relative aspect-[4/3] border border-[var(--color-border)] overflow-hidden group">
              <Image
                src={images[2].url}
                alt={images[2].caption}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-[#F5F0E8]">
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold)] font-mono block">
                  {images[2].category}
                </span>
                <span className="font-serif text-lg font-light">
                  {images[2].caption}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
