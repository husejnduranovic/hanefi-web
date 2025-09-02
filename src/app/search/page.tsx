import Link from "next/link";
import { searchArticles } from "@/lib/api";

function highlight(text: string, q: string) {
  if (!q) return text;
  const parts = text.split(
    new RegExp(`(${q.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")})`, "gi")
  );
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase() ? (
      <mark key={i} className="bg-white/20 px-0.5 rounded">
        {p}
      </mark>
    ) : (
      p
    )
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const q = (searchParams.q ?? "").trim();
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const data = q
    ? await searchArticles({ q, page, perPage: 12 })
    : { items: [], page: 1, perPage: 12, total: 0, totalPages: 1 };

  return (
    <main>
      {/* Top back link (matches your Option A style) */}
      <div className="container-soft pt-6">
        <Link
          href="/"
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
          Početna
        </Link>
      </div>

      <section className="relative py-12 sm:py-16">
        <div className="container-soft">
          {/* Search box */}
          <form className="relative max-w-3xl" action="/pretraga" method="get">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Pretraži članke…"
              className="w-full rounded-2xl glass ring-tinted shadow-tinted text-white placeholder:text-slate-400 px-4 py-3 focus:outline-none ring-focus"
              autoFocus
            />
          </form>

          {/* Results */}
          {q ? (
            <>
              <div className="mt-6 text-slate-300">
                {data.total === 0 ? (
                  <>
                    Nema rezultata za <span className="u-acc">{q}</span>.
                  </>
                ) : (
                  <>
                    <span className="text-white font-semibold">
                      {data.total}
                    </span>{" "}
                    rezultat{data.total === 1 ? "" : "a"} za{" "}
                    <span className="u-acc">{q}</span>
                  </>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.items.map((it) => (
                  <Link
                    key={it.id}
                    href={`/articles/${it.slug}`}
                    className="group block rounded-2xl ring-tinted glass shadow-tinted soft-trans hover:-translate-y-1 hover:shadow-tinted-2 p-5"
                  >
                    <h3 className="text-white font-semibold tracking-tight">
                      {highlight(it.title, q)}
                    </h3>
                    {it.excerpt && (
                      <p className="mt-2 text-slate-300 whitespace-pre-line">
                        {highlight(it.excerpt, q)}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                      <time dateTime={it.date}>
                        {new Date(it.date).toLocaleDateString("bs-BA")}
                      </time>
                      <span>{it.views.toLocaleString("bs-BA")} pregleda</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Simple pagination */}
              {data.totalPages > 1 && (
                <nav
                  className="mt-8 flex items-center gap-2"
                  aria-label="Paginacija"
                >
                  {Array.from({ length: data.totalPages }).map((_, i) => {
                    const p = i + 1;
                    return (
                      <Link
                        key={p}
                        href={{ pathname: "/pretraga", query: { q, page: p } }}
                        className={`inline-flex items-center justify-center rounded-xl px-3 h-9 min-w-9 text-sm ring-1 ring-white/10 glass-strong soft-trans ${
                          p === page ? "bg-white/15" : "hover:bg-white/10"
                        }`}
                        aria-current={p === page ? "page" : undefined}
                      >
                        {p}
                      </Link>
                    );
                  })}
                </nav>
              )}
            </>
          ) : (
            <p className="mt-6 text-slate-300">Unesi pojam za pretragu.</p>
          )}
        </div>
      </section>
    </main>
  );
}
