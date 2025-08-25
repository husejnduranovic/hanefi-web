import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative mt-28 py-24 sm:py-36">
      <div className="relative container-soft">
        <div className="relative mx-auto max-w-4xl text-center">
          {/* Dotted frame vežemo za CONTENT wrapper i širimo ga malo oko teksta */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -inset-y-10 rounded-3xl border border-dotted border-slate-400/25"
          />

          {/* Suptilan indigo glow iza teksta */}
          <div
            aria-hidden
            className="absolute -z-10 inset-x-0 -top-10 mx-auto h-44 w-[min(80vw,42rem)] blur-3xl rounded-full bg-indigo-400/25 opacity-60"
          />

          {/* Višeredni naslov (precizno ručno lomljenje) */}
          <h1 className="relative z-10 text-white font-bold tracking-tight text-5xl sm:text-7xl leading-[1.05]">
            <span className="block">Šta je hanefijski</span>
            <span className="block">mezheb?</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300">
            Sažeta objašnjenja, provjereni izvori <br /> i praktični odgovori na
            jednom mjestu.
          </p>

          {/* Learn: detaljniji dizajn + akcent-underline */}
          {/* Learn: staklo + indigo/cyan akcent + micro underline */}
          <div className="mt-10 inline-flex flex-col items-center group">
            <Link
              href="/articles"
              className="relative inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium text-white
               ring-1 ring-white/10 backdrop-blur-md
               bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))]
               shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_1px_rgba(0,0,0,0.2)]
               hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.07))]
               ring-focus transition-colors"
            >
              <span>Saznaj vise</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
                className="opacity-90"
              >
                <path
                  d="M7 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* tanki gornji sjaj – jedva vidljiv */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-3 top-0 h-px rounded-full
                 bg-[linear-gradient(90deg,transparent,rgba(129,140,248,0.65),rgba(56,189,248,0.65),transparent)]"
              />
            </Link>

            {/* underline u indigo→cyan, suptilno pojača na hover */}
            <span
              className="mt-2 h-[2px] w-12 rounded-full
               bg-[linear-gradient(90deg,transparent,rgba(129,140,248,0.9),rgba(56,189,248,0.9),transparent)]
               opacity-80 transition-opacity group-hover:opacity-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
