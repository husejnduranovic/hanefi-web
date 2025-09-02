// components/HomeArticlesStacked.tsx
import Link from "next/link";

export type SimpleArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  imageUrl?: string | null;
  date: string; // ISO (unused now, kept for later)
  views: number;
};

function Views({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
      {/* Eye icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        aria-hidden
        className="opacity-80"
      >
        <path
          d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
      {n?.toLocaleString("bs-BA")} pregleda
    </span>
  );
}

function ArticleCard({
  a,
  accentClass,
}: {
  a: SimpleArticle;
  accentClass: string;
}) {
  return (
    <Link
      href={`/articles/${a.slug}`}
      aria-label={a.title}
      className="article-card group relative overflow-hidden rounded-2xl glass shadow-tinted ring-tinted soft-trans
                 transform-gpu hover:scale-[1.02] focus-visible:scale-[1.02] hover:z-10 focus-visible:z-10
                 hover:shadow-tinted-2 ring-focus-article p-5"
      style={{ willChange: "transform" }}
    >
      {/* BG image + veil */}
      {a.imageUrl && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <img
            src={a.imageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-60 transition-opacity duration-300 ease-out"
          />
          <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-black/60" />
        </div>
      )}

      {/* Subtle lift gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,.06), transparent 10%), linear-gradient(to top, rgba(2,6,23,.25), transparent 35%)",
        }}
      />

      {/* Top accent */}
      <span
        aria-hidden
        className={`article-accent absolute left-5 right-5 top-0 h-[2px] rounded-full ${accentClass}`}
      />

      <h3 className="text-white font-semibold tracking-tight">{a.title}</h3>
      {a.excerpt && (
        <p className="mt-2 text-slate-300 line-clamp-2">{a.excerpt}</p>
      )}

      <div className="mt-4 flex items-center justify-end">
        <Views n={a.views} />
      </div>
    </Link>
  );
}

function SectionHeader({
  title,
  href,
  accent = "bg-[linear-gradient(90deg,rgba(129,140,248,.9),rgba(56,189,248,.9))]",
}: {
  title: string;
  href: string;
  accent?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        <div
          aria-hidden
          className={`mt-2 h-[2px] w-24 rounded-full ${accent}`}
        />
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                   text-slate-900 bg-white/90 ring-1 ring-white/20 shadow-tinted soft-trans hover:bg-white"
      >
        Vidi sve
      </Link>
    </div>
  );
}

export default function HomeArticlesStacked({
  latest,
  popular,
}: {
  latest: SimpleArticle[];
  popular: SimpleArticle[];
}) {
  // Accent lines: pick two distinct bright looks
  const accentLatest =
    "bg-[linear-gradient(90deg,rgba(129,140,248,.95),rgba(56,189,248,.95))]"; // indigo→cyan
  const accentPopular =
    "bg-[linear-gradient(90deg,rgba(245,158,11,.95),rgba(129,140,248,.95))]"; // amber→indigo

  return (
    <section className="relative py-10 sm:py-14 mt-20">
      <div className="container-soft">
        {/* Najnovije */}
        <div className="mb-30">
          <SectionHeader
            title="Najnovije"
            href="/articles?sort=novo"
            accent={accentLatest}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {latest.map((a) => (
              <ArticleCard key={a.id} a={a} accentClass={accentLatest} />
            ))}
          </div>
        </div>

        {/* Najčitanije */}
        <div>
          <SectionHeader
            title="Najčitanije"
            href="/articles?sort=najcitanije"
            accent={accentPopular}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {popular.map((a) => (
              <ArticleCard key={a.id} a={a} accentClass={accentPopular} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
