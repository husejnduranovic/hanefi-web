// components/articles/TableOfContents.tsx
"use client";
import { useEffect, useState } from "react";

type Item = { id: string; text: string };

export function TableOfContents({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        // Choose the heading closest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 1] }
    );

    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-white/10 bg-white/5 p-3"
    >
      <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-300/80">
        Na ovoj stranici
      </p>
      <ul className="space-y-1">
        {items.map((i) => {
          const isActive = active === i.id;
          return (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                className={`block rounded-xl px-2 py-1.5 text-sm transition ${
                  isActive
                    ? "bg-cyan-400/10 text-cyan-200"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                {i.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
