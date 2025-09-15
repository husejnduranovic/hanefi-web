// app/articles/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Article, articles, categories } from "@/lib/mock";
import { formatDate } from "@/lib/utils";
import { slugify } from "@/lib/utils";
import { ProgressBar } from "@/components/common/progress-bar";
import { TableOfContents } from "@/components/articles/table-of-contents";
import { NavPrevNext } from "@/components/common/nav-prev-next";
import { ArticleCard } from "@/components/articles/article-card";
import { Breadcrumbs } from "@/components/common/breadcrumbs";

type Params = { slug: string };

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return notFound();

  const content: string = (article as Article).content ?? article.excerpt ?? "";
  const toc = Array.from(content.matchAll(/^##\s+(.+)$/gm)).map((m) => {
    const text = m[1].trim();
    return {
      id: slugify ? slugify(text) : text.toLowerCase().replace(/\s+/g, "-"),
      text,
    };
  });

  const cat = categories.find((c) => c.name === article.category);
  const catHref = cat
    ? `/categories/${cat.slug}`
    : `/articles?category=${encodeURIComponent(article.category)}`;

  const sorted = [...articles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const idx = sorted.findIndex((a) => a.slug === article.slug);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  // A tiny helper so we don't repeat the textShadow inline everywhere
  const shadow: React.CSSProperties = {
    textShadow: "0 1px 2px rgba(2,6,23,.45)",
  };

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <ProgressBar />
      <Breadcrumbs
        className="mt-6"
        items={[
          { label: "Home", href: "/" },
          { label: "Articles", href: "/articles" },
          { label: article.category, href: catHref },
          { label: article.title },
        ]}
      />

      {/* Hero */}
      <section className="mt-6 overflow-hidden rounded-3xl border border-white/10">
        <div className="relative aspect-[16/7] sm:aspect-[16/6]">
          {article.imageUrl && (
            <Image
              src={article.imageUrl}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          )}

          {/* Stronger multi-stop gradient to guarantee contrast at the bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(2,6,23,0.86) 0%, rgba(2,6,23,0.68) 35%, rgba(2,6,23,0.38) 60%, rgba(2,6,23,0.18) 80%, rgba(2,6,23,0.00) 100%)",
            }}
            aria-hidden
          />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:px-8 sm:pb-8">
            {/* meta row */}
            <div
              className="flex flex-wrap items-center gap-2 text-xs text-slate-100"
              style={shadow}
            >
              <Link
                href={catHref}
                className="rounded-full px-2 py-0.5 text-slate-50 ring-1 ring-white/20"
                style={{
                  background: "rgba(2,6,23,0.45)", // subtle scrim behind chip
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                {article.category}
              </Link>
              <span aria-hidden className="text-slate-50">
                •
              </span>
              <time dateTime={article.createdAt} className="text-slate-50">
                {formatDate(article.createdAt)}
              </time>
              <span aria-hidden className="text-slate-50">
                •
              </span>
              <span className="text-slate-50">
                {article.readTime} min čitanja
              </span>
              <span aria-hidden className="text-slate-50">
                •
              </span>
              <span className="text-slate-50">
                {article.viewCount} pregleda
              </span>
            </div>

            {/* title */}
            <h1
              className="mt-3 text-balance text-3xl font-semibold text-slate-50 sm:text-4xl"
              style={shadow}
            >
              {article.title}
            </h1>

            {/* excerpt */}
            {article.excerpt && (
              <p
                className="mt-2 max-w-3xl text-pretty text-slate-100/95"
                style={shadow}
              >
                {article.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content + ToC */}
      <section className="mx-auto mt-10 max-w-5xl lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10">
        {/* Left column */}
        <article className="mx-auto max-w-3xl text-base leading-8 text-slate-200/95 sm:text-lg">
          <ArticleContent content={content} />
        </article>

        {/* Right column */}
        {toc.length > 0 && (
          <aside className="sticky top-20 hidden self-start lg:block">
            <TableOfContents items={toc} />
          </aside>
        )}

        {/* Full-width row (spans both columns) */}
        <div className="mt-12 lg:col-span-2">
          <NavPrevNext
            prev={
              prev
                ? {
                    href: `/articles/${prev.slug}`,
                    title: prev.title,
                    eyebrow: "Prethodno",
                  }
                : null
            }
            next={
              next
                ? {
                    href: `/articles/${next.slug}`,
                    title: next.title,
                    eyebrow: "Slijedeće",
                  }
                : null
            }
          />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-semibold">
              Povezano u {article.category}
            </h2>
            <Link href="/articles" className="btn-ghost text-xs">
              Svi članci
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}

      <div className="py-16" />
    </main>
  );
}

/** Minimal renderer: paragraphs + `##` subheadings (with anchors) */
function ArticleContent({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/).filter(Boolean);
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (/^##\s+/.test(block)) {
          const text = block.replace(/^##\s+/, "").trim();
          const id = slugify
            ? slugify(text)
            : text.toLowerCase().replace(/\s+/g, "-");
          return (
            <h2
              id={id}
              key={i}
              className="pt-6 text-2xl font-semibold tracking-tight text-slate-50"
            >
              {text}
            </h2>
          );
        }
        return (
          <p key={i} className="text-slate-200/95">
            {block}
          </p>
        );
      })}
    </div>
  );
}
