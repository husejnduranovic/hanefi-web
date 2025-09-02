import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchArticleBySlug, fetchRelatedArticles } from "@/lib/api";
import ReadingProgress from "@/components/common/reading-progress";
import CopyLinkButton from "@/components/common/copy-link-button";

const CAT_SLUG: Record<string, string> = {
  Fikh: "fikh",
  Akida: "akida",
  Sunnet: "sunnet",
  "Kur'an": "kuran",
  Pobijanja: "pobijanja",
};

const THEME_CLASS: Record<string, string> = {
  "Kur'an": "theme-kuran",
  Sunnet: "theme-sunnet",
  Akida: "theme-akida",
  Fikh: "theme-fikh",
  Pobijanja: "theme-pobijanja",
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const a = await fetchArticleBySlug(params.slug);
  if (!a) return { title: "Članak nije pronađen" };
  const desc = a.excerpt || a.subtitle || "Članak";
  return {
    title: a.title,
    description: desc,
    openGraph: {
      title: a.title,
      description: desc,
      images: a.imageUrl ? [{ url: a.imageUrl }] : undefined,
      type: "article",
    },
  };
}

type CSSVars = React.CSSProperties & {
  ["--page-cover-image"]?: string;
  ["--page-cover-opacity"]?: string;
};

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const a = await fetchArticleBySlug(params.slug);
  if (!a) notFound();

  const theme = THEME_CLASS[a.category] ?? "";
  const coverStyle: CSSVars = a.imageUrl
    ? {
        "--page-cover-image": `url('${a.imageUrl}')`,
        "--page-cover-opacity": ".22",
      }
    : {};

  const catSlug = CAT_SLUG[a.category] ?? "";
  const dateFmt = new Date(a.publishedAt).toLocaleDateString("bs-BA");

  // ultra-light reading time (fallback): ~200 wpm
  const wordCount =
    a.content
      ?.replace(/<[^>]+>/g, " ")
      .split(/\s+/)
      .filter(Boolean).length || 0;
  const readMin = Math.max(1, Math.round(wordCount / 200));

  const related = await fetchRelatedArticles({
    category: a.category,
    excludeSlug: a.slug,
    limit: 6,
    sort: "novo",
  });

  return (
    <main
      className={`${theme} ${a.imageUrl ? "page-cover" : ""}`}
      style={coverStyle}
    >
      {/* NEW: thin progress bar */}
      <ReadingProgress />

      <article className="relative py-10 sm:py-14">
        <div className="container-soft">
          {/* Hero */}
          <header className="relative overflow-hidden rounded-2xl ring-tinted shadow-tinted">
            <div
              className={`relative px-6 sm:px-8 py-10 ${
                a.imageUrl ? "vignette-b" : ""
              }`}
            >
              <nav className="text-sm text-slate-300/90">
                <Link href="/" className="hover:underline">
                  Početna
                </Link>
                <span className="mx-1">/</span>
                {catSlug ? (
                  <Link
                    href={`/kategorije/${catSlug}`}
                    className="hover:underline"
                  >
                    {a.category}
                  </Link>
                ) : (
                  <span>{a.category}</span>
                )}
              </nav>

              <h1 className="mt-3 text-white text-3xl sm:text-4xl font-bold tracking-tight">
                {a.title}
              </h1>

              {(a.subtitle || a.excerpt) && (
                <p className="mt-3 text-slate-300 max-w-3xl">
                  {a.excerpt || a.subtitle}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <div className="inline-flex items-center gap-2">
                  <span className="opacity-80">Autor:</span>
                  <span className="text-white/95">
                    {a.author?.name ?? "Uredništvo"}
                  </span>
                </div>
                <span className="opacity-30">•</span>
                <time dateTime={a.publishedAt}>{dateFmt}</time>
                <span className="opacity-30">•</span>
                <span>{readMin} min čitanja</span>
                {/* actions on the right */}
                <div className="ml-auto flex items-center gap-2">
                  <CopyLinkButton />
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      a.title
                    )}&url=${encodeURIComponent(
                      (process.env.NEXT_PUBLIC_SITE_URL ?? "") +
                        "/articles/" +
                        a.slug
                    )}`}
                    className="chip-lg soft-trans hover:bg-white/20"
                    aria-label="Podijeli na X"
                  >
                    Podijeli
                  </a>
                </div>
                {typeof a.viewCount === "number" && (
                  <>
                    <span className="opacity-30">•</span>
                    <span>{a.viewCount.toLocaleString("bs-BA")} pregleda</span>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Body */}
          <section className="mt-8 rounded-2xl ring-tinted glass shadow-tinted p-6 sm:p-8">
            {/* NOTE: expects already-sanitized HTML from backend. */}
            <div
              className="prose-rich max-w-none space-y-5"
              dangerouslySetInnerHTML={{ __html: a.content }}
            />
          </section>

          {/* NEW: Related */}
          {related.length >= 3 && (
            <section className="mt-30">
              <h2 className="text-white text-xl font-semibold tracking-tight">
                Srodni članci
              </h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {related.map((it, i) => (
                  <Link
                    key={it.id}
                    href={`/articles/${it.slug}`}
                    className="group block relative overflow-hidden rounded-2xl ring-tinted glass shadow-tinted accent-ring soft-trans hover:-translate-y-1 hover:shadow-tinted-2 p-5"
                  >
                    <div aria-hidden className="absolute inset-0 -z-10">
                      <img
                        src={"/images/discover/discovercardbg4.png"}
                        alt=""
                        className="h-full w-full object-cover opacity-60 transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                        loading="lazy"
                      />
                      <div className="card-veil" />
                    </div>

                    {it.badge && (
                      <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-white/10 text-white ring-1 ring-white/15">
                        {it.badge}
                      </span>
                    )}
                    <h3 className="mt-2 text-white font-semibold tracking-tight">
                      {it.title}
                    </h3>
                    {it.excerpt && (
                      <p className="mt-2 text-slate-200 whitespace-pre-line">
                        {it.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
                      <time dateTime={it.date}>
                        {new Date(it.date).toLocaleDateString("bs-BA")}
                      </time>
                      <span>{it.views.toLocaleString("bs-BA")} pregleda</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Footer actions (optional) */}
          <footer className="mt-8 flex justify-between items-center">
            <Link
              href={catSlug ? `/categories/${catSlug}` : "/kategorije"}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                         text-slate-900 bg-white/90 ring-1 ring-white/20 shadow-tinted hover:bg-white soft-trans"
            >
              ← Nazad na {a.category}
            </Link>
          </footer>
        </div>
      </article>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            datePublished: a.publishedAt,
            author: a.author?.name
              ? [{ "@type": "Person", name: a.author.name }]
              : undefined,
            image: a.imageUrl ? [a.imageUrl] : undefined,
            articleSection: a.category,
          }),
        }}
      />
    </main>
  );
}
