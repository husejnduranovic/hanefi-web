import Link from "next/link";
import type { SimpleArticle } from "@/lib/api";

export default function ArticleListCard({
  a,
  accentClass,
}: {
  a: SimpleArticle;
  accentClass?: string;
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
      {a.imageUrl && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <img
            src={a.imageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-60 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-black/60" />
        </div>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,.06), transparent 10%), linear-gradient(to top, rgba(2,6,23,.25), transparent 35%)",
        }}
      />
      {accentClass && (
        <span
          aria-hidden
          className={`article-accent absolute left-5 right-5 top-0 h-[2px] rounded-full ${accentClass}`}
        />
      )}

      <h3 className="text-white font-semibold tracking-tight">{a.title}</h3>
      {a.excerpt && (
        <p className="mt-2 text-slate-300 line-clamp-2">{a.excerpt}</p>
      )}

      <div className="mt-4 flex items-center justify-end text-xs text-slate-300">
        <span className="inline-flex items-center gap-1.5">
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
          {a.viewCount.toLocaleString("bs-BA")} pregleda
        </span>
      </div>
    </Link>
  );
}
