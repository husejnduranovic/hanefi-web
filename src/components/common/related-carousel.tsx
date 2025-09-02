"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay"; // optional; remove if not needed
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function RelatedCarousel({
  items,
}: {
  items: { id: string; title: string; img: string }[];
}) {
  const autoplay = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", dragFree: true, containScroll: "trimSnaps" },
    [autoplay.current]
  );

  useEffect(() => {
    if (!emblaApi) return;
    // You can respond to events if you want to show/hide hints
    // emblaApi.on("select", () => {});
  }, [emblaApi]);

  return (
    <div className="relative glass rounded-xl border border-white/10 shadow-[0_12px_36px_rgba(15,23,42,.5)] p-3 md:p-4">
      {/* Edge fades */}
      <div className="edge-fade-l rounded-xl"></div>
      <div className="edge-fade-r rounded-xl"></div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {items.map((it) => (
            <article
              key={it.id}
              className="basis-[68%] sm:basis-[360px] max-w-[420px] shrink-0 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-transform duration-150 ease-out hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-indigo-400/40"
            >
              <div className="relative h-40">
                <Image
                  src={it.img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-slate-50 text-[1.02rem] leading-6 line-clamp-2 mb-3">
                  {it.title}
                </h3>
                <Link
                  href="#"
                  className="glass-strong px-3 py-1.5 rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 hover:bg-white/15 transition"
                >
                  Pročitaj
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
