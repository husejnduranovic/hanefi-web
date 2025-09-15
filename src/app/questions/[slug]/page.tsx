// app/questions/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { questions } from "@/lib/mock";

type Params = { slug: string };

export default async function QuestionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const q = questions.find((x) => x.slug === slug);
  if (!q) return notFound();

  const related = questions
    .filter((x) => x.slug !== q.slug && x.tags.some((t) => q.tags.includes(t)))
    .slice(0, 5);

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <time dateTime={q.date}>{new Date(q.date).toLocaleDateString()}</time>
          <span aria-hidden>•</span>
          <span
            className={`rounded-md px-2 py-0.5 ${
              q.answered
                ? "bg-emerald-400/10 text-emerald-300"
                : "bg-amber-400/10 text-amber-300"
            }`}
          >
            {q.answered ? "Odgovoreno" : "U procesu"}
          </span>
        </div>
        <h1 className="mt-2 text-2xl font-semibold">{q.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {q.tags.map((t) => (
            <Link
              key={t}
              href={`/questions?tag=${encodeURIComponent(t)}`}
              className="rounded-md bg-fuchsia-400/10 px-2 py-0.5 text-xs text-fuchsia-300"
            >
              {t}
            </Link>
          ))}
        </div>
      </header>

      {q.body && (
        <section className="prose mt-6 max-w-none prose-invert prose-p:text-slate-200/95">
          {q.body.split(/\n{2,}/).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="text-lg font-semibold">
          {q.answered ? "Odgovoreno" : "U procesu"}
        </h2>
        {q.answered ? (
          <div className="mt-3 space-y-4 text-slate-200/95">
            {q.answer!.split(/\n{2,}/).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-slate-300">
            This question is pending a response. You can browse similar
            questions below.
          </p>
        )}
      </section>

      {related.length > 0 && (
        <section className="mt-10">
          <h3 className="mb-3 text-sm font-semibold text-slate-300">
            Related questions
          </h3>
          <ul className="space-y-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link href={`/questions/${r.slug}`} className="hover:underline">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="py-16" />
    </main>
  );
}
