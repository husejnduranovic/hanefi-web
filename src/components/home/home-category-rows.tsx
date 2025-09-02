import Link from "next/link";
import { fetchCategories } from "@/lib/api";

/** Per-category accents (line gradients). Tweak to taste. */
const ACCENTS: Record<string, { line: string; text?: string }> = {
  kuran: {
    line: "bg-gradient-to-r from-cyan-300 to-emerald-300",
    text: "bg-gradient-to-r from-cyan-300 to-emerald-300",
  },
  sunnet: {
    line: "bg-gradient-to-r from-amber-300 to-orange-400",
    text: "bg-gradient-to-r from-amber-300 to-orange-400",
  },
  akida: {
    line: "bg-gradient-to-r from-fuchsia-300 to-pink-400",
    text: "bg-gradient-to-r from-fuchsia-300 to-pink-400",
  },
  fikh: {
    line: "bg-gradient-to-r from-indigo-400 to-cyan-300",
    text: "bg-gradient-to-r from-indigo-400 to-cyan-300",
  },
  pobijanja: {
    line: "bg-gradient-to-r from-rose-300 to-amber-300",
    text: "bg-gradient-to-r from-rose-300 to-amber-300",
  },
  default: {
    line: "bg-gradient-to-r from-slate-200 to-slate-400",
    text: "bg-gradient-to-r from-slate-50 to-slate-300",
  },
};

export default async function HomeCategoryRows() {
  const cats = await fetchCategories();

  return (
    <section className="relative py-14 sm:py-16">
      <div className="container-soft">
        <header className="max-w-3xl mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Kategorije
          </h2>
          <p className="mt-3 text-slate-300">
            Brzi pregled — izaberi oblast i pretraži članke.
          </p>
        </header>

        <ul role="list" className="divide-y divide-white/10">
          {cats.map((c, idx) => {
            const slug = (c.slug || "").toLowerCase();
            const acc = ACCENTS[slug] ?? ACCENTS.default;
            return (
              <li key={c.slug} className="py-9 md:py-12">
                <div className="sm:flex sm:items-start sm:gap-8">
                  {/* Left: title + count (bigger + accent line) */}
                  <div className="min-w-0 sm:w-[42%]">
                    <div className="flex items-baseline gap-3">
                      <h3
                        className={
                          // Keep title white for contrast.
                          // If you want gradient titles later:
                          // `text-transparent bg-clip-text ${acc.text}`
                          "text-4xl md:text-5xl font-extrabold tracking-tight text-white"
                        }
                      >
                        {c.title}
                      </h3>
                      <span className="text-sm text-slate-400 whitespace-nowrap">
                        {c.count} članaka
                      </span>
                    </div>
                    {/* Accent line per category */}
                    <span
                      aria-hidden
                      className={`mt-3 block h-[3px] w-28 rounded-full ${acc.line}`}
                    />
                  </div>

                  {/* Middle: blurb with more room */}
                  <p className="mt-4 sm:mt-0 sm:flex-1 text-slate-300 leading-7 md:leading-8 max-w-3xl">
                    {c.blurb}
                  </p>

                  {/* Right: CTA (transparent/half-transparent) */}
                  <div className="mt-5 sm:mt-0 sm:ml-auto">
                    <Link
                      href={`/articles?category=${encodeURIComponent(
                        c.slug
                      )}&sort=latest`}
                      className="btn-ghost"
                    >
                      Pretraži članke
                    </Link>
                  </div>
                </div>

                {/* Extra breathing room between rows on small screens */}
                {idx !== cats.length - 1 && <div className="mt-6 sm:mt-8" />}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
