// components/ArticleRowCard.tsx
import Link from "next/link";
import type { SimpleArticle } from "@/lib/api";

export default function ArticleRowCard({ a }: { a: SimpleArticle }) {
  return (
    <article className="row-card">
      {/* BG image */}
      {a.imageUrl && (
        <div aria-hidden className="row-bg absolute inset-0 -z-10">
          <img
            src={a.imageUrl}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="row-veil" />
        </div>
      )}
      {/* Accent line */}
      <span
        aria-hidden
        className="row-accent bg-[linear-gradient(90deg,rgba(129,140,248,.95),rgba(56,189,248,.95))]"
      />

      {/* Grid content */}
      <div className="grid grid-cols-[1fr_auto] md:grid-cols-[minmax(0,1fr)_200px_120px_110px] gap-3 md:gap-4 p-4 md:p-5">
        {/* Title + excerpt */}
        <div className="min-w-0">
          <Link
            href={`/articles/${a.slug}`}
            className="text-white font-semibold tracking-tight hover:underline underline-offset-4 decoration-white/40"
          >
            {a.title}
          </Link>
          {a.excerpt && (
            <p className="mt-1 text-sm text-slate-300 line-clamp-2">
              {a.excerpt}
            </p>
          )}
        </div>

        {/* Category (plain text) */}
        <div className="hidden md:block self-center text-slate-300 truncate">
          {a.category}
        </div>

        {/* Views */}
        <div className="hidden md:flex items-center justify-end self-center text-slate-200 text-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            aria-hidden
            className="mr-1.5 opacity-80"
          >
            <path
              d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          </svg>
          {a.viewCount.toLocaleString("bs-BA")}
        </div>

        {/* Action */}
        <div className="self-center flex justify-end">
          <Link href={`/articles/${a.slug}`} className="btn-neutral">
            Otvori
          </Link>
        </div>
      </div>
    </article>
  );
}
