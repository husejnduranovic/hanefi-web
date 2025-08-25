export default function Authors() {
  const authors = [
    {
      name: "Ahmed Karadžić",
      role: "Hanefijska metodologija",
      bio: "Autor vodiča o namazu i praktičnim pitanjima u svakodnevnom životu.",
      // Free placeholder headshots (no setup needed)
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      accent: "indigo" as const,
      stats: { articles: 24, reads: "12k" },
    },
    {
      name: "Lejla Hadžić",
      role: "Porodično & kupoprodajno pravo",
      bio: "Sažeci presjeka iz klasičnih djela i savremene prakse, sa referencama.",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
      accent: "cyan" as const,
      stats: { articles: 18, reads: "9.4k" },
    },
    {
      name: "Emin Alić",
      role: "Komentar klasičnih djela",
      bio: "Kratki odgovori i pojašnjenja, uz pažljivo navođenje izvora.",
      img: "https://randomuser.me/api/portraits/men/12.jpg",
      accent: "amber" as const,
      stats: { articles: 31, reads: "15k" },
    },
  ];

  const theme = {
    indigo: {
      topLine:
        "bg-[linear-gradient(90deg,rgba(129,140,248,.95),rgba(56,189,248,.95))]",
      chip: "ring-1 ring-white/10 bg-white/6 text-white/90",
      puck: "from-indigo-400 to-cyan-400",
    },
    cyan: {
      topLine:
        "bg-[linear-gradient(90deg,rgba(56,189,248,.95),rgba(129,140,248,.95))]",
      chip: "ring-1 ring-white/10 bg-white/6 text-white/90",
      puck: "from-cyan-400 to-indigo-400",
    },
    amber: {
      topLine: "bg-[#f59e0b]/90",
      chip: "ring-1 ring-white/10 bg-white/6 text-white/90",
      puck: "from-amber-400 to-pink-400",
    },
    pink: {
      topLine: "bg-[#fb7185]/90",
      chip: "ring-1 ring-white/10 bg-white/6 text-white/90",
      puck: "from-pink-400 to-amber-400",
    },
  } as const;

  return (
    <section id="authors" className="relative py-20 sm:py-28">
      {/* Diagonal dark bg + soft bloom */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#0c1220_0%,#070b12_60%)]"
      />
      <div
        aria-hidden
        className="absolute -z-10 bottom-[-20%] left-[-10%] w-[70vw] h-[60vh] blur-3xl rounded-full opacity-25
                   bg-[radial-gradient(closest-side,rgba(56,189,248,0.25),transparent_70%)]"
      />

      <div className="container-soft relative">
        {/* Badge */}
        {/* Modern Autori badge (focused, slick) */}
        <div className="flex justify-center">
          <div className="group/badge inline-flex flex-col items-center">
            <a
              href="/authors"
              aria-label="Autori"
              className="
        relative inline-flex items-center rounded-full p-[1.5px]
        bg-[conic-gradient(from_180deg_at_50%_50%,rgba(129,140,248,.6),rgba(56,189,248,.6),rgba(129,140,248,.6))]
        transition-transform
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60
      "
            >
              <span
                className="
          inline-flex items-center gap-2 rounded-full px-3.5 py-1.5
          backdrop-blur-md bg-white/8 ring-1 ring-white/12 text-white
          shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
        "
              >
                {/* micro accent dot */}
                <span className="size-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-[0_0_0_2px_rgba(255,255,255,0.08)]" />
                <span className="text-sm font-medium tracking-tight">
                  Autori
                </span>
                {/* arrow */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden
                  className="opacity-90 transition-transform duration-200 group-hover/badge:translate-x-0.5"
                >
                  <path
                    d="M7 5l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              {/* soft halo on hover */}
              <span
                aria-hidden
                className="
          pointer-events-none absolute inset-0 rounded-full opacity-0
          group-hover/badge:opacity-100 transition-opacity
          bg-[radial-gradient(65%_60%_at_50%_50%,rgba(255,255,255,0.10),transparent)]
        "
              />
            </a>

            {/* tiny underline that reacts to badge hover */}
            <div
              className="
        mt-2 h-[2px] w-16 rounded-full opacity-80 transition-opacity
        bg-[linear-gradient(90deg,transparent,rgba(129,140,248,.9),rgba(56,189,248,.9),transparent)]
        group-hover/badge:opacity-100
      "
            />
          </div>
        </div>

        <div
          className="mx-auto mt-2 h-[2px] w-16 rounded-full
                        bg-[linear-gradient(90deg,transparent,rgba(129,140,248,.9),rgba(56,189,248,.9),transparent)]"
        />

        {/* Cards */}
        <div className="mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {authors.map((a) => {
            const t = theme[a.accent];
            return (
              <article
                key={a.name}
                className="group relative overflow-hidden rounded-2xl
                           backdrop-blur-md
                           bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]
                           ring-1 ring-white/10
                           shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                           transition-all duration-200 ease-out transform-gpu will-change-transform
                           hover:scale-[1.02] hover:-translate-y-0.5 hover:bg-white/7"
              >
                {/* Top accent line */}
                <span
                  aria-hidden
                  className={`absolute left-6 top-0 h-[2px] w-20 rounded-full ${t.topLine}`}
                />

                {/* Faint face on right */}
                <div aria-hidden className="absolute inset-0 -z-10">
                  {a.img ? (
                    <img
                      src={a.img}
                      alt=""
                      className="absolute right-0 bottom-0 h-full w-auto object-cover grayscale opacity-20
                                 [mask-image:linear-gradient(to_left,black,transparent_60%)]"
                      loading="lazy"
                    />
                  ) : null}
                </div>

                <div className="relative p-6 md:p-7 pb-16">
                  {/* Name + role chips */}
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-white text-lg font-semibold tracking-tight">
                      {a.name}
                    </h3>
                    <span
                      className={`hidden sm:inline rounded-full px-3 py-1 text-xs ${t.chip}`}
                    >
                      {a.role}
                    </span>
                  </div>

                  <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                    {a.bio}
                  </p>

                  {/* Small metrics row */}
                  <div className="mt-4 flex gap-3 text-xs text-white/85">
                    <span className="rounded-full px-2 py-1 ring-1 ring-white/10 bg-white/5">
                      {a.stats.articles} članaka
                    </span>
                    <span className="rounded-full px-2 py-1 ring-1 ring-white/10 bg-white/5">
                      {a.stats.reads} čitanja
                    </span>
                  </div>

                  {/* NEW CTA — Focused Pill + Accent Puck */}
                  <div className="absolute right-5 bottom-5">
                    <a
                      href={`/authors/${encodeURIComponent(
                        a.name.toLowerCase().replace(/ /g, "-")
                      )}`}
                      className="
      group/cta relative inline-flex items-center rounded-full
      pl-4 pr-2 py-2 text-sm text-white
      backdrop-blur-md bg-white/[0.08] border border-white/12
      shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
      transition-all
      hover:bg-white/[0.12] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_rgba(2,6,23,0.35)]
      focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60
    "
                    >
                      <span className="pr-2">Profil autora</span>

                      {/* Accent puck (circle) */}
                      <span
                        className={`
        relative grid place-items-center size-8 rounded-full text-white
        bg-gradient-to-br ${t.puck}
        shadow-[0_2px_8px_rgba(0,0,0,0.35)]
        transition-transform duration-200 group-hover/cta:translate-x-[1px]
      `}
                        aria-hidden
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M7 5l5 5-5 5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {/* subtle inner glass */}
                        <span className="pointer-events-none absolute inset-[1px] rounded-full bg-white/10" />
                      </span>

                      {/* soft halo on hover (no layout shift) */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-full opacity-0
                 group-hover/cta:opacity-100 transition-opacity
                 bg-[radial-gradient(70%_60%_at_70%_50%,rgba(255,255,255,0.08),transparent)]"
                      />
                    </a>
                  </div>

                  {/* inner hairline */}
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
