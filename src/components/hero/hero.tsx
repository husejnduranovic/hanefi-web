import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate pt-14">
      <div className="mx-auto max-w-5xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          <CrescentIcon className="h-3.5 w-3.5" />
          Dobrodošli — Moderan centar za islamsko znanje
        </span>
        <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Čitaj, uči, i pitaj —
          <span className="from-cyan-400 to-blue-500 bg-gradient-to-r bg-clip-text text-transparent">
            {" "}
            sa jasnoćom i poštovanjem
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-slate-300">
          Članci organizirani po kategorijama, zajednički Q&A za praktična
          pitanja, i posvećen odjeljak za pobijanja.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/articles" className="btn-primary">
            Pregledaj Članke
          </Link>
          <Link href="/questions" className="btn-ghost">
            Postavi Pitanje
          </Link>
        </div>
      </div>
    </section>
  );
}

function CrescentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}
