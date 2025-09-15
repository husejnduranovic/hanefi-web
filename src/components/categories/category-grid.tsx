"use client";

import Link from "next/link";
import Image from "next/image";

export type Category = {
  slug: string;
  title: string;
  blurb: string;
  img: string; // public/… path
  accent: "indigo" | "amber" | "emerald" | "teal" | "rose"; // extensible
  count: number;
};

export default function CategoryGrid({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section aria-labelledby="kategorije" className="mt-10">
      <div className="mb-6">
        <h2 id="kategorije" className="text-2xl font-semibold tracking-tight">
          Kategorije
        </h2>
        <div className="mt-2 h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((c) => (
          <CategoryCard key={c.slug} c={c} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ c }: { c: Category }) {
  // Accent helpers — keep explicit classes so Tailwind picks them up
  const accentRing =
    c.accent === "amber"
      ? "ring-amber-400/30"
      : c.accent === "emerald"
      ? "ring-emerald-400/30"
      : c.accent === "teal"
      ? "ring-teal-400/30"
      : c.accent === "rose"
      ? "ring-rose-400/30"
      : "ring-indigo-400/30";

  const accentGrad =
    c.accent === "amber"
      ? "from-amber-400/70 to-amber-400/0"
      : c.accent === "emerald"
      ? "from-emerald-400/70 to-emerald-400/0"
      : c.accent === "teal"
      ? "from-teal-400/70 to-teal-400/0"
      : c.accent === "rose"
      ? "from-rose-400/70 to-rose-400/0"
      : "from-indigo-400/70 to-indigo-400/0";

  const badgeTint =
    c.accent === "amber"
      ? "bg-amber-400/15 text-amber-200 border-amber-400/25"
      : c.accent === "emerald"
      ? "bg-emerald-400/15 text-emerald-200 border-emerald-400/25"
      : c.accent === "teal"
      ? "bg-teal-400/15 text-teal-200 border-teal-400/25"
      : c.accent === "rose"
      ? "bg-rose-400/15 text-rose-200 border-rose-400/25"
      : "bg-indigo-400/15 text-indigo-200 border-indigo-400/25";

  return (
    <Link
      href={`/kategorije/${c.slug}`}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition 
                  hover:translate-y-0.5 hover:ring-1 ${accentRing}`}
      aria-label={`${c.title} – ${c.count} članaka`}
    >
      {/* background image + soft vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={c.img}
          alt={c.title}
          fill
          className="object-cover opacity-20 mix-blend-luminosity"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
      </div>

      {/* inner panel (card inside card) */}
      <div className="relative m-2 rounded-xl border border-white/10 bg-slate-950/40 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
          <span
            className={`shrink-0 text-[11px] px-2 py-0.5 rounded-full border ${badgeTint}`}
          >
            {c.count} čl.
          </span>
        </div>

        {/* accent underline */}
        <div className={`mt-1 h-[2px] w-14 bg-gradient-to-r ${accentGrad}`} />

        <p className="mt-3 text-sm text-slate-300/85 line-clamp-2">{c.blurb}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-slate-300/80">Pregledaj članke</span>
          {/* subtle “glow” lozenge */}
          <div
            className={`h-6 w-10 rounded-md bg-gradient-to-br ${accentGrad} opacity-20 group-hover:opacity-40 transition`}
          />
        </div>
      </div>
    </Link>
  );
}
