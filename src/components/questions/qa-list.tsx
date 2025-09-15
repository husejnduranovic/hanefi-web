import { Question } from "@/lib/mock";
import Link from "next/link";

export function QAList({ items }: { items: Question[] }) {
  return (
    <ul className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-white/5">
      {items.map((q) => (
        <li key={q.id} className="flex items-center justify-between gap-4 p-4">
          <div>
            <Link
              href={`/questions/${q.slug}`}
              className="font-medium hover:underline"
            >
              {q.title}
            </Link>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-300/80">
              {q.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-fuchsia-400/10 px-2 py-0.5 text-fuchsia-300"
                >
                  {t}
                </span>
              ))}
              <span
                className={`rounded-md px-2 py-0.5 ${
                  q.answered
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "bg-amber-400/10 text-amber-300"
                }`}
              >
                {q.answered ? "Answered" : "Awaiting"}
              </span>
            </div>
          </div>
          <span className="text-xs text-slate-400">{q.date}</span>
        </li>
      ))}
    </ul>
  );
}
