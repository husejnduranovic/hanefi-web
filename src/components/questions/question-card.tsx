// components/cards/QuestionCard.tsx
import Link from "next/link";

export function QuestionCard({
  href,
  title,
  tags,
  answered,
  date,
  excerpt,
}: {
  href: string;
  title: string;
  tags: string[];
  answered: boolean;
  date: string;
  excerpt?: string;
}) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/40 hover:bg-white/7">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
        <span aria-hidden>•</span>
        <span
          className={`rounded-md px-2 py-0.5 ${
            answered
              ? "bg-emerald-400/10 text-emerald-300"
              : "bg-amber-400/10 text-amber-300"
          }`}
        >
          {answered ? "Odgovoreno" : "U procesu"}
        </span>
      </div>
      <h3 className="mt-2 text-base font-semibold leading-tight">
        <Link href={href} className="hover:underline">
          {title}
        </Link>
      </h3>
      {excerpt && (
        <p className="mt-1 line-clamp-2 text-sm text-slate-300/90">{excerpt}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-md bg-fuchsia-400/10 px-2 py-0.5 text-xs text-fuchsia-300"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
