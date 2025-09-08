"use client";
import Link from "next/link";
import React from "react";

/**
 * ArticlePage — Hanefijski Fikh (React + Tailwind, Next.js‑friendly)
 *
 * ✅ One continuous glass container wraps both columns
 * ✅ Hero image blends into background (vignette + bottom/right fades)
 * ✅ Subtle meta pill on image with Category • Author • X min čitanja • Date
 * ✅ Text sits directly on the glass (no extra card)
 * ✅ Right sidebar shows exactly 5 tidy media cards with thin rings
 * ✅ Only one action button at the bottom of left column ("Označi kao završeno")
 *
 * ACCESSIBILITY & MOTION
 * - Focus states: focus-visible rings on links/cards/button
 * - Motion: transition duration-200 ease, respect prefers-reduced-motion
 * - Contrast: dark glass + Slate text colors satisfy WCAG AA
 *
 * HYDRATION‑SAFE DATE
 * - We format the date after mount to avoid SSR/CSR mismatch (client-safe)
 * - Alternatively, pass a preformatted string via `formattedPublishedAt`
 *
 * STYLE TOKENS (Tailwind)
 * - Glass surface: bg-white/\[0.03\] backdrop-blur-md ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] rounded-3xl
 * - Accents: Indigo #818cf8, Mint/Cyan #22d3ee (used sparingly)
 * - Focus ring: focus-visible:ring-2 focus-visible:ring-cyan-300/60
 * - Spacing: content blocks use `my-6` and `leading-8` for airy reading
 * - Radii: container rounded-3xl; media cards rounded-lg; images rounded-md
 * - Max width: max-w-[1440px]
 *
 * FONTS
 * - Assumes Geist Variable is registered (e.g., Next.js `next/font`)
 *   and exposed as --font-geist-sans on :root. Apply via className below.
 */

export type Article = {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  excerpt?: string | null;
  content: string; // supports simple paragraphs, blockquotes ("> "), and lists ("- ")
  category: string;
  imageUrl: string;
  status: string;
  author: { id: string; name: string; email: string };
  createdAt: string;
  updatedAt: string;
  publishedAt: string; // ISO string
  viewCount: number;
};

type Props = {
  article: Article;
  similar: Array<
    Pick<
      Article,
      "id" | "title" | "category" | "slug" | "imageUrl" | "publishedAt"
    >
  >;
  onMarkDone?: () => void;
  /** If provided, we will display it immediately (SSR‑safe); otherwise, we format after mount */
  formattedPublishedAt?: string;
};

function useClientDate(iso: string | null, fallback?: string) {
  const [val, setVal] = React.useState<string | null>(fallback ?? null);
  React.useEffect(() => {
    if (!iso) return;
    try {
      const d = new Date(iso);
      // Locale: Bosnian; customize as needed
      setVal(
        d.toLocaleDateString("bs-BA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    } catch {
      // noop: keep fallback/null
    }
  }, [iso]);
  return val;
}

function readingTimeMinutes(text: string, wpm: number = 220) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}

function ParagraphOrBlock({ block }: { block: string }) {
  // Very light renderer: supports blockquote ("> ") and unordered list (lines starting with "- ")
  if (block.startsWith("> ")) {
    return (
      <blockquote className="my-6 border-l-2 border-indigo-400/30 pl-4 text-slate-300 italic">
        {block.replace(/^>\s?/, "")}
      </blockquote>
    );
  }
  if (block.split("\n").every((line) => line.trim().startsWith("- "))) {
    const items = block
      .split("\n")
      .map((l) => l.replace(/^\-\s?/, "").trim())
      .filter(Boolean);
    return (
      <ul className="my-6 list-disc space-y-2 pl-6 text-slate-300">
        {items.map((it, i) => (
          <li key={i} className="leading-8">
            {it}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p className="my-6 leading-8 text-slate-300">
      {/* link affordance */}
      {block.split(/(https?:\/\/\S+)/g).map((piece, i) => {
        if (/^https?:\/\//.test(piece)) {
          return (
            <Link
              key={i}
              href={piece}
              className="underline decoration-indigo-400/50 underline-offset-4 hover:decoration-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 rounded-sm motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
              target="_blank"
              rel="noreferrer noopener"
            >
              {piece}
            </Link>
          );
        }
        return <React.Fragment key={i}>{piece}</React.Fragment>;
      })}
    </p>
  );
}

export default function ArticlePage({
  article,
  similar,
  onMarkDone,
  formattedPublishedAt,
}: Props) {
  console.log("article.publishedAt", article);
  const dateLabel = useClientDate(article.publishedAt, formattedPublishedAt);
  const mins = readingTimeMinutes(article.content);

  // Split content by double newlines into logical blocks
  const blocks = React.useMemo(
    () => article.content.trim().split(/\n\n+/),
    [article.content]
  );

  return (
    <main
      className="font-[var(--font-geist-sans)] text-slate-200 selection:bg-cyan-300/20 selection:text-white"
      // Background gradient exists globally per spec; page wrapper only controls layout/max-width
    >
      {/* Skip link for keyboard users */}
      <Link
        href="#sadrzaj"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus-visible:ring-2 focus-visible:ring-cyan-300/60 rounded-md bg-black/60 px-3 py-2 text-sm text-white"
      >
        Preskoči na sadržaj
      </Link>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-10 py-8 sm:py-10 lg:py-12">
        {/* Shared glass surface wrapping EVERYTHING (image + text + sidebar) */}
        <section
          className="rounded-3xl bg-white/\[0.03\] backdrop-blur-md ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          aria-label={article.title}
        >
          <div className="grid grid-cols-1 xl:grid-cols-6 gap-8 p-4 sm:p-6 lg:p-8">
            {/* LEFT — 4/6 (image + text) */}
            <div className="xl:col-span-4">
              {/* HERO IMAGE with soft blend (no borders/rings) */}
              <figure className="relative overflow-hidden rounded-2xl">
                <img
                  src={article.imageUrl}
                  alt="Ilustracija teme članka"
                  className="w-full h-auto object-contain"
                />
                {/* Soft vignette + bottom and right fades to visually melt into background */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                >
                  {/* global vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.35)_100%)]" />
                  {/* bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 md:h-32 bg-gradient-to-t from-[#070b12] to-transparent" />
                  {/* right fade */}
                  <div className="absolute inset-y-0 right-0 w-24 sm:w-28 md:w-32 bg-gradient-to-l from-[#070b12] to-transparent" />
                </div>

                {/* META PILL (subtle) */}
                <figcaption className="absolute bottom-3 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-4 flex items-center gap-2 rounded-md bg-black/30 backdrop-blur-sm ring-1 ring-white/10 px-2.5 py-1 text-xs text-slate-300">
                  <span className="truncate">{article.category}</span>
                  <span aria-hidden>•</span>
                  <span className="truncate">{article.author.name}</span>
                  <span aria-hidden>•</span>
                  <span>{mins} min čitanja</span>
                  <span aria-hidden>•</span>
                  {/* Hydration-safe date: waits for client mount OR uses provided formatted string */}
                  <span>{dateLabel ?? ""}</span>
                </figcaption>
              </figure>

              {/* ARTICLE TEXT directly on glass (no extra card) */}
              <article id="sadrzaj" className="mt-8">
                <header className="mb-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                    {article.title}
                  </h1>
                  {article.subtitle ? (
                    <p className="mt-2 text-base sm:text-lg text-slate-300/90">
                      {article.subtitle}
                    </p>
                  ) : null}
                </header>

                <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-p:my-6 prose-p:leading-8 prose-a:no-underline hover:prose-a:underline prose-a:decoration-indigo-400/50 prose-a:underline-offset-4 prose-blockquote:text-slate-300">
                  {blocks.map((b, i) => (
                    <ParagraphOrBlock key={i} block={b} />
                  ))}
                </div>

                {/* FOOTER ACTION — single button only */}
                <div className="mt-10">
                  <button
                    type="button"
                    onClick={onMarkDone}
                    className="inline-flex items-center gap-2 rounded-xl bg-white/\[0.06\] px-4 py-2 text-sm font-medium text-slate-100 ring-1 ring-white/10 hover:bg-white/10 motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                  >
                    Označi kao završeno
                  </button>
                </div>
              </article>
            </div>

            {/* RIGHT — 2/6 (Slične teme — exactly 5 cards) */}
            <aside className="xl:col-span-2">
              <h2 className="text-lg font-medium tracking-tight text-white">
                Slične teme
              </h2>
              <div className="mt-4 space-y-2">
                {similar.slice(0, 5).map((post) => (
                  <Link
                    key={post.id}
                    href={`/${post.slug}`}
                    className="group flex items-center gap-3 rounded-lg p-2 ring-1 ring-white/10 hover:bg-white/\[0.04\] motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                    aria-label={`Slična tema: ${post.title}`}
                  >
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="h-14 w-14 sm:h-16 sm:w-16 rounded-md object-cover flex-none"
                    />
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-wide text-slate-400">
                        {post.category}
                      </div>
                      <div
                        className="text-sm text-slate-200 group-hover:text-white motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical" as const,
                          overflow: "hidden",
                        }}
                      >
                        {post.title}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

/**
 * ──────────────────────────────────────────────────────────────────────────────
 * DEMO DATA (for local development only — remove in prod)
 * You can render <ArticlePage {...demoProps} /> in a Next.js page to preview.
 * This demo text uses realistic Bosnian content (no Lorem) aligned with Hanafi fiqh topics.
 * ──────────────────────────────────────────────────────────────────────────────
 */

export const demoArticle: Article = {
  id: "a1",
  title: "Namaz na putu: skraćivanje i spajanje prema hanefijskom mezhebu",
  subtitle:
    "Praktični vodič za musafire: kada ste putnik, koliko se farzova klanja i u kojim situacijama se može spojiti namaz.",
  slug: "sta-je-fikh-i-ko-je-fakih",
  excerpt: null,
  content: [
    "> Putovanje je olakšica, ne izgovor. Cilj je očuvati namaz i disciplinu, a olakšice koristiti mudro, bez pretjerivanja.",
    "Ko je musafir prema hanefijskom mezhebu? Onaj ko namjerava put od oko 88–90 km ili više i ne namjerava boraviti na odredištu 15 dana ili duže. Takva osoba ima status putnika od izlaska iz svoga mjesta pa sve do povratka ili do trenutka kada namjerava ostati 15 dana.",
    "Kraćenje (kasr) se odnosi na četverorekatne farzove: podne, ikindija i jacija se klanjaju po dva rekata. Sabah i akšam ostaju nepromijenjeni. Sunneti se mogu klanjati kada postoji mogućnost i smirenost, ali farzovi imaju prioritet.",
    "Spajanje namaza u hanefijskom mezhebu u pravilu se ne prakticira kao kod drugih mezheba, osim u Arefatu (podne s ikindijom) i Muzdelifi (akšam s jacijom) tokom hadža. U posebnim okolnostima (snažna kiša, strah, izvanredno stanje), preporučuje se praktično približavanje vremena — npr. odgoditi podne do pred ikindiju — ali se i dalje klanja u svojim vremenima.",
    "- Ako putujete automobilom i imate pauzu, iskoristite je za namaz uz minimalne uslove čistoće i okretanja prema Kibli.\n- Ako propuštate džemat zbog puta, nema grijeha, ali nastojte klanjati na vrijeme.\n- Ako zaboravite i klanjate čet’ri rekata, namaz je validan, ali je sunnet skratiti na dva.",
    "Mes’h po mestvama (čarapama) dozvoljen je putniku do tri dana i tri noći od trenutka prvog kvarenja abdesta nakon obuvanja. To je praktična olakšica — čuvajte čistoću stopala i pazite da navedene čarape pokrivaju propisano.",
  ].join("\n\n"),
  category: "Fikh putovanja",
  imageUrl:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop", // placeholder
  status: "published",
  author: {
    id: "u1",
    name: "Uredništvo Hanefijski Fikh",
    email: "urednistvo@example.com",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: new Date().toISOString(),
  viewCount: 1234,
};

export const demoSimilar: Props["similar"] = [
  {
    id: "s1",
    title: "Abdest na putu: kako sačuvati čistoću kada nemate vodu",
    category: "Taharet",
    slug: "abdest-na-putu",
    imageUrl:
      "https://images.unsplash.com/photo-1523419409543-22a94f7f9a48?q=80&w=400&auto=format&fit=crop",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "s2",
    title: "Kibla kompas: pouzdane metode određivanja pravca",
    category: "Namaz",
    slug: "kibla-kompas-metode",
    imageUrl:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=400&auto=format&fit=crop",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "s3",
    title: "Sunneti i nafila u vozilu: šta je dozvoljeno, a šta nije",
    category: "Namaz",
    slug: "sunneti-na-putu",
    imageUrl:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=400&auto=format&fit=crop",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "s4",
    title: "Mes’h preko čarapa: uslovi i trajanje prema hanefijama",
    category: "Taharet",
    slug: "mesh-preko-carapa",
    imageUrl:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=400&auto=format&fit=crop",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "s5",
    title: "Džuma u putu: kada se računa kao musafir?",
    category: "Džuma",
    slug: "dzuma-putovanje",
    imageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=400&auto=format&fit=crop",
    publishedAt: new Date().toISOString(),
  },
];

/*
// Example usage in a Next.js page (app router):
export default function Page() {
  return <ArticlePage article={demoArticle} similar={demoSimilar} />;
}
*/
