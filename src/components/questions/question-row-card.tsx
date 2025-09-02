// components/QuestionRowCard.tsx
import Link from "next/link";
import type { SimpleQuestion } from "@/lib/api";

function Meta({ q }: { q: SimpleQuestion }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-300">
      <span className="truncate">{q.category}</span>
      <span className="opacity-40">•</span>
      <span>{q.views.toLocaleString("bs-BA")} pregleda</span>
      <span className="opacity-40">•</span>
      <span>{q.answersCount} odgovora</span>
      {q.hasAccepted && (
        <>
          <span className="opacity-40">•</span>
          <span className="inline-flex items-center gap-1 text-emerald-300">
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
              <path
                d="M20 6L9 17l-5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Prihvaćen odgovor
          </span>
        </>
      )}
    </div>
  );
}

export default function QuestionRowCard({ q }: { q: SimpleQuestion }) {
  return (
    <article className="row-card">
      {/* accent line */}
      <span
        aria-hidden
        className="row-accent bg-[linear-gradient(90deg,rgba(129,140,248,.95),rgba(56,189,248,.95))]"
      />
      {/* content */}
      <div className="grid grid-cols-[1fr_auto] md:grid-cols-[minmax(0,1fr)_220px] gap-3 md:gap-4 p-4 md:p-5">
        <div className="min-w-0">
          <Link
            href={`/questions/${q.slug}`}
            className="text-white font-semibold tracking-tight hover:underline underline-offset-4 decoration-white/40"
          >
            {q.title}
          </Link>
          {q.excerpt && (
            <p className="mt-1 text-sm text-slate-300 line-clamp-2">
              {q.excerpt}
            </p>
          )}
          <div className="mt-2">
            <Meta q={q} />
          </div>
        </div>
        <div className="self-center flex justify-end">
          <Link href={`/questions/${q.slug}`} className="btn-neutral">
            {q.answersCount > 0 ? "Vidi odgovore" : "Odgovori"}
          </Link>
        </div>
      </div>
    </article>
  );
}
