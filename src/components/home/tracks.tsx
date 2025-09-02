import Link from "next/link";

export default function Tracks() {
  const tracks = [
    {
      slug: "/putovi/osnove",
      title: "Osnove fikha",
      desc: "Izvori, metodologija i ključni pojmovi hanefijske škole.",
      progress: 35,
      accent: "indigo" as const,
    },
    {
      slug: "/putovi/namaz",
      title: "Namaz u praksi",
      desc: "Redoslijed, uvjeti ispravnosti i najčešće greške.",
      progress: 72,
      accent: "cyan" as const,
    },
    {
      slug: "/putovi/transakcije",
      title: "Transakcije",
      desc: "Ugovori, uvjeti, zabrane i primjeri iz prakse.",
      progress: 10,
      accent: "amber" as const,
    },
    {
      slug: "/putovi/porodica",
      title: "Porodično pravo",
      desc: "Prava i obaveze, mirenje, savjetovanje, praksa.",
      progress: 0,
      accent: "pink" as const,
    },
  ];

  const accents: Record<string, { line: string; bar: string }> = {
    indigo: {
      line: "bg-[linear-gradient(90deg,#818cf8,#38bdf8)]",
      bar: "bg-[linear-gradient(90deg,#818cf8,#38bdf8)]",
    },
    cyan: {
      line: "bg-[linear-gradient(90deg,#38bdf8,#818cf8)]",
      bar: "bg-[linear-gradient(90deg,#38bdf8,#818cf8)]",
    },
    amber: {
      line: "bg-[#f59e0b]",
      bar: "bg-[linear-gradient(90deg,#f59e0b,#fb7185)]",
    },
    pink: {
      line: "bg-[#fb7185]",
      bar: "bg-[linear-gradient(90deg,#fb7185,#f59e0b)]",
    },
  };

  return (
    <section id="tracks" className="relative py-20 sm:py-28">
      <div className="container-soft">
        {/* Title left + short description (same treatment as Discover) */}
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Putovi učenja
          </h2>
          <p className="mt-2 text-slate-300">
            Nastavi tamo gdje si stao ili pokreni novu stazu — jasan napredak i
            sažeti koraci.
          </p>
        </div>

        {/* Grid of tracks */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {tracks.map((t) => {
            const theme = accents[t.accent];
            const status =
              t.progress <= 0
                ? "Počni"
                : t.progress >= 100
                ? "Završeno"
                : "Nastavi";

            return (
              <article
                key={t.slug}
                className="group relative overflow-hidden rounded-2xl backdrop-blur-md
                           bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]
                           ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                           transition-all duration-200 ease-out transform-gpu will-change-transform
                           hover:scale-[1.02] hover:-translate-y-0.5 hover:bg-white/7"
              >
                {/* Accent short top line */}
                <span
                  aria-hidden
                  className={`absolute left-6 top-0 h-[2px] w-24 rounded-full ${theme.line}`}
                />

                <div className="relative p-6 md:p-7 pb-24">
                  <h3 className="text-white text-lg font-semibold tracking-tight">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                    {t.desc}
                  </p>

                  {/* Progress only (remove extra “Nastavi” chips) */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-white/85">
                      <span>Napredak</span>
                      <span>{t.progress}%</span>
                    </div>
                    <div
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={t.progress}
                      className="mt-2 h-2 rounded-full bg-white/10 ring-1 ring-white/10 overflow-hidden"
                    >
                      <div
                        className={`h-full ${theme.bar}`}
                        style={{
                          width: `${Math.min(Math.max(t.progress, 0), 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* SINGLE CTA — bottom-right, a bit lower + less border radius */}
                  <div className="absolute right-5 bottom-4 md:bottom-30">
                    <Link
                      href={t.slug}
                      className="group/cta relative inline-flex items-center gap-2 rounded-lg
                                 px-3.5 py-2 text-sm text-white
                                 border border-white/12 bg-white/[0.08] backdrop-blur-md
                                 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
                                 hover:bg-white/[0.12] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_rgba(2,6,23,0.35)]
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 transition-all"
                    >
                      <span>{status}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden
                        className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
                      >
                        <path
                          d="M7 5l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>

                  {/* Inner hairline */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 opacity-30"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
