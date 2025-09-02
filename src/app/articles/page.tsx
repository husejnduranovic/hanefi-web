// app/articles/page.tsx
import ArticleRowCard from "@/components/articles/article-row-card";
import ArticlesToolbar from "@/components/articles/articles-toolbar";
import { fetchArticles, fetchCategories } from "@/lib/api";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ArticlesIndex({
  searchParams,
}: {
  searchParams: {
    q?: string;
    category?: string;
    sort?: "latest" | "popular";
    page?: string;
  };
}) {
  const q = (searchParams.q ?? "").trim();
  const category = searchParams.category ?? "";
  const sort = (searchParams.sort === "popular" ? "popular" : "latest") as
    | "latest"
    | "popular";

  const [{ items }, cats] = await Promise.all([
    fetchArticles({ q, category, sort, page: 1, limit: 50 }),
    fetchCategories(),
  ]);

  return (
    <>
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
          Pocetna
        </Link>
      </div>
      <main className="relative py-10 sm:py-14">
        <div className="container-soft space-y-6">
          <ArticlesToolbar
            cats={cats.map((c) => ({ slug: c.slug, title: c.title }))}
          />
          <div className="space-y-3">
            {items.length === 0 ? (
              <div className="text-slate-300">Nema rezultata.</div>
            ) : (
              items.map((a) => <ArticleRowCard key={a.id} a={a} />)
            )}
          </div>
        </div>
      </main>
    </>
  );
}
