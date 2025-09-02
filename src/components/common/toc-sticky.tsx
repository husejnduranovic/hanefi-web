"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { id: string; label: string; href: string };

export default function TOCSticky({
  items,
  offset = 88,
}: {
  items: Item[];
  offset?: number;
}) {
  const [top, setTop] = useState(offset);
  useEffect(() => {
    const h = document.querySelector("header");
    if (h) setTop((h as HTMLElement).offsetHeight + 12);
  }, []);
  return (
    <aside className="sticky" style={{ top }}>
      <div className="relative toc-veil">
        {/* Glow behind the “Sadržaj” heading */}
        <div aria-hidden className="glow-oval glow-indigo" />
        <div className="toc-title-lg text-base md:text-lg mb-2">Sadržaj</div>
        <ol className="text-sm text-slate-300/90 space-y-1.5">
          {items.map((i) => (
            <li key={i.id} className="toc-item">
              <Link
                href={i.href}
                className="hover:text-white u-acc focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 rounded"
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
