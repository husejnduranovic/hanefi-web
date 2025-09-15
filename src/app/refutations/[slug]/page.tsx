import Link from "next/link";
import { notFound } from "next/navigation";
import { refutations } from "@/lib/mock";
import { NavPrevNext } from "@/components/common/nav-prev-next";

type Params = { slug: string };

export default async function RefutationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const r = refutations.find((x) => x.slug === slug);
  if (!r) return notFound();

  const related = refutations
    .filter((x) => x.slug !== r.slug && x.topic === r.topic)
    .slice(0, 6);

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      {/* Accent banner */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
        <div className="bg-gradient-to-r from-rose-500/15 via-fuchsia-500/15 to-cyan-500/15 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-md bg-rose-400/15 px-2 py-0.5 text-rose-200">
              {r.topic}
            </span>
            <span className="rounded-md bg-fuchsia-400/15 px-2 py-0.5 text-fuchsia-200">
              Pobijanje
            </span>
          </div>
          <h1 className="mt-3 text-balance text-3xl font-semibold sm:text-4xl">
            {r.title}
          </h1>
          <p className="mt-2 max-w-3xl text-pretty text-slate-200/95">
            {r.summary}
          </p>
        </div>
      </div>

      {/* Body (placeholder using summary as content demo) */}
      <article className="mx-auto mt-10 max-w-3xl space-y-5 text-base leading-8 text-slate-200/95">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-lg font-semibold">Rezime</h2>
          <p className="mt-2">{r.summary}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
            Odgovor
          </h2>
          <p className="mt-2 text-slate-200/95">
            Ovo je rezervirano područje za odgovor. Zamijenite svojim
            strukturiranim pobijanjem: predstavite kontekst tvrdnje, citirajte
            relevantni tekst ako je potrebno, a zatim odgovorite s dokazima i
            obrazloženjem.
          </p>
          <p className="mt-2 text-slate-200/95">
            Razmislite o odvajanju poenti, navođenju izvora i razjašnjavanju
            terminologije. Možete dodati citate i reference u posebnom odjeljku
            ispod.
          </p>
        </section>
      </article>

      {related.length > 0 && (
        <section className="mt-16">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((x) => (
              <li
                key={x.id}
                className="rounded-xl border border-white/10 bg-white/5 p-3 hover:border-fuchsia-400/40"
              >
                <Link
                  href={`/refutations/${x.slug}`}
                  className="hover:underline"
                >
                  {x.title}
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
