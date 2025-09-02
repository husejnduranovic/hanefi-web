import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchCategoryArticles, type SortKey } from "@/lib/api";

const CATEGORIES = {
  kuran: {
    title: "Kur'an",
    desc: "Tumačenja ajeta, tematska čitanja i praktične pouke.",
    cover: "/images/discover/categoriesbg1.png",
    accent: "indigo" as const,
  },
  sunnet: {
    title: "Sunnet",
    desc: "Vjerodostojna praksa i predanja koja oblikuju ibadete.",
    cover: "/images/discover/categoriesbg2.png",
    accent: "none" as const,
  },
  akida: {
    title: "Akida",
    desc: "Temeljna vjerovanja ehli-sunneta i njihova argumentacija.",
    cover: "/images/discover/discovercardbg5.png",
    accent: "none" as const,
  },
  fikh: {
    title: "Fikh",
    desc: "Pravila ibadeta i svakodnevice u hanefijskoj školi.",
    cover: "/images/discover/discovercardbg1.png",
    accent: "none" as const,
  },
  pobijanja: {
    title: "Pobijanja",
    desc: "Odgovori na sumnje i pogrešna tumačenja.",
    cover: "/images/discover/discovercardbg4.png",
    accent: "amber" as const,
  },
} as const;

type Slug = keyof typeof CATEGORIES;

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: Slug };
  searchParams: { sort?: SortKey; page?: string };
}): Promise<Metadata> {
  const cat = CATEGORIES[params.slug as Slug];
  if (!cat) return { title: "Kategorija" };
  const sort = searchParams?.sort ?? "novo";
  const page = Number(searchParams?.page ?? 1);
  return {
    title: `${cat.title} — ${
      sort === "popularno" ? "Popularno" : sort === "az" ? "A–Ž" : "Novo"
    }${page > 1 ? ` — Strana ${page}` : ""}`,
    description: cat.desc,
  };
}

type CSSVars = React.CSSProperties & {
  ["--page-cover-image"]?: string;
  ["--page-cover-opacity"]?: string;
};

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: Slug };
  searchParams: { sort?: SortKey; page?: string };
}) {
  const cat = CATEGORIES[params.slug as Slug];
  if (!cat) notFound();

  const sort: SortKey = (searchParams.sort as SortKey) ?? "novo";
  const page = Math.max(1, Number(searchParams.page ?? 1));

  const data = await fetchCategoryArticles({
    slug: params.slug,
    sort,
    page,
    perPage: 12,
  });

  const accentClass =
    cat.accent === "indigo"
      ? "bg-[linear-gradient(90deg,rgba(129,140,248,.85),rgba(56,189,248,.85))]"
      : cat.accent === "amber"
      ? "bg-[#f59e0b]/70"
      : "";

  const coverStyle: CSSVars = cat.cover
    ? {
        "--page-cover-image": `url('${cat.cover}')`,
        "--page-cover-opacity": ".22",
      }
    : {};

  return (
    <main className={cat.cover ? "page-cover" : ""} style={coverStyle}>
      {/* Top subheader back link */}
      <div className="container-soft pt-6">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white soft-trans ring-focus"
          aria-label="Nazad na početnu"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden>
            <path
              d="M12 5L7 10l5 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Kategorije
        </Link>
      </div>
      <section className="relative py-12 sm:py-16">
        <div className="container-soft">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-2xl ring-tinted shadow-tinted">
            {accentClass && (
              <span
                aria-hidden
                className={`absolute left-6 right-6 top-0 h-[2px] rounded-full ${accentClass}`}
              />
            )}
            <div
              className={`relative px-6 sm:px-8 py-10 ${
                cat.cover ? "vignette-b" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div className="max-w-2xl">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    {cat.title}
                  </h1>
                  <p className="mt-2 text-slate-300">{cat.desc}</p>
                </div>
                <div className="ml-auto">
                  <SortPicker current={sort} />
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.items.length === 0 ? (
              <EmptyState slug={params.slug as Slug} />
            ) : (
              data.items.map((it) => <Card key={it.id} item={it} />)
            )}
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <Pagination current={data.page} total={data.totalPages} />
            </div>
          )}
        </div>
      </section>

      {/* JSON-LD for the category listing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${cat.title} — Kategorija`,
            description: cat.desc,
            hasPart: data.items.map((it) => ({
              "@type": "Article",
              headline: it.title,
              datePublished: it.date,
              url: it.slug ? `/articles/${it.slug}` : "",
            })),
          }),
        }}
      />
    </main>
  );
}

/* ---- Components ---- */

function SortPicker({ current }: { current: SortKey }) {
  const base =
    "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm text-white/90 ring-1 ring-white/10 glass-strong soft-trans";
  const opt = (key: SortKey, label: string) => (
    <Link
      key={key}
      href={{ query: { sort: key, page: 1 } }}
      className={`${base} ${
        current === key ? "bg-white/15" : "hover:bg-white/10"
      }`}
      aria-current={current === key ? "page" : undefined}
    >
      {label}
    </Link>
  );

  return (
    <nav aria-label="Sortiranje" className="flex gap-2">
      {opt("novo", "Novo")}
      {opt("popularno", "Popularno")}
      {opt("az", "A–Ž")}
    </nav>
  );
}

function Card({
  item,
}: {
  item: {
    id: string;
    title: string;
    excerpt: string | null;
    slug?: string;
    href?: string;
    badge?: string;
    date: string;
    views: number;
  };
}) {
  const url = item.slug ? `/articles/${item.slug}` : item.href ?? "#";
  return (
    <Link
      href={url}
      className="group relative overflow-hidden rounded-2xl ring-tinted shadow-tinted glass soft-trans hover:-translate-y-1 hover:shadow-tinted-2 focus:outline-none ring-focus block"
      aria-label={`Otvori: ${item.title}`}
    >
      <div className="p-5 sm:p-6">
        {item.badge && (
          <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-white/10 text-white ring-1 ring-white/15">
            {item.badge}
          </span>
        )}
        <h3 className="mt-2 text-white text-lg font-semibold tracking-tight">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="mt-2 text-slate-300 line-clamp-2">{item.excerpt}</p>
        )}

        <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
          <time dateTime={item.date}>
            {new Date(item.date).toLocaleDateString("bs-BA")}
          </time>
          <span>{item.views.toLocaleString("bs-BA")} pregleda</span>
        </div>

        <div className="mt-5 flex justify-end">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                       text-slate-900 bg-white/90 ring-1 ring-white/20 shadow-tinted soft-trans
                       group-hover:bg-white"
          >
            Otvori
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            >
              <path
                d="M7 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* subtle focus-out glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(0,0,0,.15), transparent 70%)",
        }}
      />
    </Link>
  );
}

function Pagination({ current, total }: { current: number; total: number }) {
  const btn =
    "inline-flex items-center justify-center rounded-xl px-3 h-9 min-w-9 text-sm ring-1 ring-white/10 glass-strong soft-trans";
  const linkTo = (p: number) => ({ query: { page: p } });

  // Show up to 5 numbers around current
  const start = Math.max(1, current - 2);
  const end = Math.min(total, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav className="flex items-center gap-2" aria-label="Paginacija">
      <Link
        href={linkTo(Math.max(1, current - 1))}
        className={`${btn} ${
          current === 1 ? "opacity-50 pointer-events-none" : "hover:bg-white/10"
        }`}
      >
        ‹
      </Link>
      {pages.map((p) => (
        <Link
          key={p}
          href={linkTo(p)}
          className={`${btn} ${
            p === current ? "bg-white/15" : "hover:bg-white/10"
          }`}
          aria-current={p === current ? "page" : undefined}
        >
          {p}
        </Link>
      ))}
      <Link
        href={linkTo(Math.min(total, current + 1))}
        className={`${btn} ${
          current === total
            ? "opacity-50 pointer-events-none"
            : "hover:bg-white/10"
        }`}
      >
        ›
      </Link>
    </nav>
  );
}

function EmptyState({ slug }: { slug: Slug }) {
  const title = CATEGORIES[slug].title;
  return (
    <div className="col-span-full text-center rounded-2xl ring-tinted glass py-14 px-6">
      <h3 className="text-white text-xl font-semibold">Još nema sadržaja</h3>
      <p className="mt-2 text-slate-300">
        Za kategoriju <span className="u-acc">{title}</span> trenutno nema
        objava.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                     text-slate-900 bg-white/90 ring-1 ring-white/20 shadow-tinted hover:bg-white soft-trans"
        >
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
}
