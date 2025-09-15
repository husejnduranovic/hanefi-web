// app/components/HomeCategoryRows.tsx
import Link from "next/link";
import { fetchCategories } from "@/lib/api";

/** Shape from your API (adjust if different) */
type Category = {
  slug: string;
  title: string;
  count: number;
  blurb?: string | null;
};

const ACCENTS = {
  kuran: {
    line: "from-cyan-300 to-emerald-300",
    text: "from-cyan-300 to-emerald-300",
    theme: "theme-kuran",
  },
  sunnet: {
    line: "from-amber-300 to-orange-400",
    text: "from-amber-300 to-orange-400",
    theme: "theme-sunnet",
  },
  akida: {
    line: "from-fuchsia-300 to-pink-400",
    text: "from-fuchsia-300 to-pink-400",
    theme: "theme-akida",
  },
  fikh: {
    line: "from-indigo-400 to-cyan-300",
    text: "from-indigo-400 to-cyan-300",
    theme: "theme-fikh",
  },
  pobijanja: {
    line: "from-rose-300 to-amber-300",
    text: "from-rose-300 to-amber-300",
    theme: "theme-pobijanja",
  },
  default: {
    line: "from-slate-200 to-slate-400",
    text: "from-slate-50 to-slate-300",
    theme: "",
  },
} as const;

function getAccent(slug: string | undefined) {
  const key = (slug ?? "").toLowerCase();
  if (key in ACCENTS) {
    return ACCENTS[key as keyof typeof ACCENTS];
  }
  return ACCENTS.default;
}

const nf = new Intl.NumberFormat("bs-BA");

export default async function HomeCategoryRows() {
  const cats: Category[] = await fetchCategories();

  return (
    <section
      aria-labelledby="home-categories-title"
      className="relative py-14 sm:py-16"
    >
      <div className="container-soft">
        {/* Section header with subtle geometric cue */}
        <header className="mb-8 max-w-3xl">
          <h2
            id="home-categories-title"
            className="text-balance text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Kategorije
          </h2>
          <div aria-hidden className="mt-3 flex items-center gap-3">
            <span className="h-[2px] w-24 rounded-full bg-gradient-to-r from-indigo-300/90 to-cyan-300/90" />
            {/* 8-point star micro-icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="opacity-75"
            >
              <path
                d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z"
                fill="url(#g)"
              />
              <defs>
                <linearGradient
                  id="g"
                  x1="0"
                  y1="0"
                  x2="24"
                  y2="24"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#a5b4fc" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="mt-4 text-slate-300">
            Brzi pregled — izaberi oblast i pretraži članke.
          </p>
        </header>

        {!cats?.length ? (
          <p className="text-slate-400">Trenutno nema dostupnih kategorija.</p>
        ) : (
          <ul role="list" className="space-y-5 sm:space-y-6">
            {cats.map((c, idx) => {
              const slug = c.slug?.toLowerCase() ?? "";
              const acc = getAccent(slug);
              const href = slug
                ? `/articles?category=${encodeURIComponent(slug)}&sort=latest`
                : "/categories";

              return (
                <li key={slug || `cat-${idx}`}>
                  {/* Row “card” with veil + animated accent */}
                  <div
                    className={[
                      "row-card group relative overflow-hidden ring-tinted-2 shadow-lift hover:shadow-lift-hover",
                      "bg-[rgba(255,255,255,0.04)]",
                      acc.theme, // hooks hero/card veils if you reuse them
                    ].join(" ")}
                  >
                    {/* top accent bar that wakes on focus/hover */}
                    <div
                      aria-hidden
                      className={[
                        "row-accent article-accent",
                        "bg-gradient-to-r",
                        acc.line,
                      ].join(" ")}
                    />

                    {/* content */}
                    <div className="relative p-5 sm:p-6 md:p-7">
                      <div className="sm:flex sm:items-start sm:gap-8">
                        {/* Left: title + count chip */}
                        <div className="min-w-0 sm:w-[42%]">
                          <div className="flex items-center gap-3">
                            {/* Gradient title for stronger identity per category */}
                            <h3
                              className={[
                                "text-balance text-3xl md:text-4xl font-extrabold tracking-tight",
                                "text-transparent bg-clip-text bg-gradient-to-r",
                                acc.text,
                              ].join(" ")}
                            >
                              {c.title}
                            </h3>

                            {/* Count chip (glass) */}
                            <span
                              className="chip-lg glass-strong text-slate-200/90"
                              aria-label={`${c.title}: ${nf.format(
                                c.count
                              )} članaka`}
                              title={`${nf.format(c.count)} članaka`}
                            >
                              {nf.format(c.count)}
                            </span>
                          </div>

                          {/* category accent line (thicker, shorter) */}
                          <span
                            aria-hidden
                            className={[
                              "mt-3 block h-[3px] w-28 rounded-full bg-gradient-to-r",
                              acc.line,
                            ].join(" ")}
                          />
                        </div>

                        {/* Middle: blurb with improved rhythm */}
                        <p className="mt-4 sm:mt-0 sm:flex-1 text-slate-300 leading-7 md:leading-8">
                          {c.blurb ?? ""}
                        </p>

                        {/* Right: primary action (ghosty, clearer affordance) */}
                        <div className="mt-5 sm:mt-0 sm:ml-auto">
                          <Link
                            href={href}
                            className="btn-cta-glass btn-cta-glass--accent soft-trans focus:outline-none"
                          >
                            <span>Pretraži članke</span>
                            {/* arrow icon */}
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              className="opacity-90"
                            >
                              <path
                                d="M13.5 6l6 6-6 6M19.5 12H4.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* faint geometric background hint (non-intrusive) */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none opacity-[0.12] bg-hex bg-mask-wide"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
