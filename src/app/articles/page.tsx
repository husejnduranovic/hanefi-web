import type { Metadata } from "next";
import { Suspense } from "react";
import { articles, categories as allCategories } from "@/lib/mock";
import {
  ArticleSort,
  ArticleToolbar,
} from "@/components/articles/article-toolbar";
import { Section } from "@/components/common/section";
import { ArticleCard } from "@/components/articles/article-card";
import { Pagination } from "@/components/common/pagination";

export const metadata: Metadata = { title: "Articles" };

const PAGE_SIZE = 9;

export default async function ArticlesIndex({
  searchParams,
}: {
  // Next.js v15 dynamic APIs: searchParams is a Promise
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: ArticleSort;
    page?: string;
  }>;
}) {
  const {
    q = "",
    category = "",
    sort = "latest",
    page = "1",
  } = await searchParams;

  // derive categories list for filter (stable order)
  const categories = Array.from(new Set(allCategories.map((c) => c.name)));

  // Filter + sort in-memory (mock). Replace with DB call later.
  let filtered = articles.filter((a) => {
    const okCat = !category || a.category === category;
    const okQ =
      !q ||
      [a.title, a.excerpt, a.category]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase());
    return okCat && okQ;
  });

  filtered.sort((a, b) => {
    if (sort === "popular") return b.viewCount - a.viewCount;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const pageNum = Math.max(
    1,
    parseInt(Array.isArray(page) ? page[0] : page, 10) || 1
  );
  const start = (pageNum - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Section
        title="Članci"
        subtitle={`${filtered.length} rezultat${
          filtered.length === 1 ? "" : "a"
        }`}
      >
        {/* Toolbar runs on client to manipulate URL params */}
        <Suspense>
          <ArticleToolbar categories={["", ...categories]} />
        </Suspense>

        {/* Results grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paged.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          page={pageNum}
          pageSize={PAGE_SIZE}
          total={filtered.length}
        />
      </Section>
      <div className="py-16" />
    </main>
  );
}
