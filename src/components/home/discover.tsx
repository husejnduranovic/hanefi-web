import Link from "next/link";

export default function Discover() {
  return (
    <section id="discover" className="relative py-16 sm:py-24">
      <div className="container-soft">
        {/* Intro */}
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Pronađi odgovore i postavi pitanja
          </h2>
          <p className="mt-3 text-slate-300">
            Kreni od osnova, uđi dublje u praksu i dobij provjerene odgovore.
          </p>
        </div>

        {/* 2-column mosaic */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left: three small cards */}
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {/* 1) Osnove fikha (with image) */}
            <Link
              href="/articles?tema=osnove"
              className="group relative overflow-hidden rounded-2xl glass hover:bg-white/7 transition-colors"
            >
              {/* Background image (subtle + dark overlay) */}
              <div aria-hidden className="absolute inset-0 -z-10">
                <img
                  src="/images/discover/discovercardbg1.png"
                  alt=""
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              <div className="relative p-5 md:p-6">
                <h3 className="text-white text-lg font-semibold tracking-tight">
                  Osnove fikha
                </h3>
                <p className="mt-2 text-slate-300">
                  Izvori, metodologija i osnovni pojmovi hanefijske škole.
                </p>
                <div className="mt-5 flex justify-end">
                  <span
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm text-white
                               ring-1 ring-white/10 backdrop-blur-md
                               bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))]
                               shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
                               hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.07))]
                               transition-colors"
                  >
                    Istraži
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden
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
                </div>
              </div>
            </Link>

            {/* 2) Postavi pitanje (no image to balance height) */}
            <Link
              href="/questions/ask"
              className="group relative overflow-hidden rounded-2xl glass hover:bg-white/7 transition-colors"
            >
              <div className="relative p-6 md:p-7 pt-8 pb-10">
                <h3 className="text-white text-lg font-semibold tracking-tight">
                  Postavi pitanje
                </h3>
                <p className="mt-2 text-slate-300">
                  Imaš specifičnu nedoumicu? Postavi pitanje i dobićeš odgovor
                  sa referencama.
                </p>
                <div className="mt-5 flex justify-end">
                  <span
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm text-white
                               ring-1 ring-white/10 backdrop-blur-md
                               bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))]
                               shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
                               hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.07))]
                               transition-colors"
                  >
                    Napiši pitanje
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden
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
                </div>
              </div>
            </Link>

            {/* 3) Namaz u praksi (with image) */}
            <Link
              href="/articles?tema=namaz"
              className="group relative overflow-hidden rounded-2xl glass hover:bg-white/7 transition-colors"
            >
              <div aria-hidden className="absolute inset-0 -z-10">
                <img
                  src="/images/discover/discovercardbg5.png"
                  alt=""
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              <div className="relative p-5 md:p-6">
                <h3 className="text-white text-lg font-semibold tracking-tight">
                  Namaz u praksi
                </h3>
                <p className="mt-2 text-slate-300">
                  Tijek namaza, uslovi ispravnosti, česte greške i praktični
                  savjeti.
                </p>
                <div className="mt-5 flex justify-end">
                  <span
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm text-white
                               ring-1 ring-white/10 backdrop-blur-md
                               bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))]
                               shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
                               hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.07))]
                               transition-colors"
                  >
                    Vidi vodiče
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden
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
                </div>
              </div>
            </Link>
          </div>

          {/* Right: two larger cards */}
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {/* A) Preporučene teme (with image + accent line) */}
            <Link
              href="/articles?sort=preporuceno"
              className="group relative overflow-hidden rounded-2xl glass hover:bg-white/7 transition-colors"
            >
              <div aria-hidden className="absolute inset-0 -z-10">
                <img
                  src="/images/discover/discovercardbg2.png"
                  alt=""
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              <span
                aria-hidden
                className="absolute left-6 right-6 top-0 h-[2px] rounded-full
                           bg-[linear-gradient(90deg,rgba(129,140,248,.85),rgba(56,189,248,.85))]"
              />
              <div className="relative p-6 md:p-8 min-h-[220px]">
                <h3 className="text-white text-xl font-semibold tracking-tight">
                  Preporučene teme
                </h3>
                <p className="mt-2 text-slate-300 max-w-xl">
                  Kurirana lista čitanja: čistoća (tahara), namaz, post,
                  kupoprodaja i porodično pravo.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Čišćenje", "Namaz", "Post", "Transakcije", "Porodica"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full px-3 py-1 text-xs text-white/90 ring-1 ring-white/10 bg-white/5"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <span
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm text-white
                               ring-1 ring-white/10 backdrop-blur-md
                               bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))]
                               shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
                               hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.07))]
                               transition-colors"
                  >
                    Pregled
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden
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
                </div>
              </div>
            </Link>

            {/* B) Odgovori učenjaka (with image + amber accent) */}
            <Link
              href="/articles?tip=odgovori"
              className="group relative overflow-hidden rounded-2xl glass hover:bg-white/7 transition-colors"
            >
              <div aria-hidden className="absolute inset-0 -z-10">
                <img
                  src="/images/discover/discovercardbg4.png"
                  alt=""
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              <span
                aria-hidden
                className="absolute left-6 right-6 top-0 h-[2px] rounded-full bg-[#f59e0b]/70"
              />
              <div className="relative p-6 md:p-8 min-h-[220px]">
                <h3 className="text-white text-xl font-semibold tracking-tight">
                  Odgovori učenjaka
                </h3>
                <p className="mt-2 text-slate-300 max-w-xl">
                  Sažeti odgovori sa izvorima: klasična djela, savremena
                  literatura i komentar hadisa.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2 max-w-md">
                  {[
                    "Ablucija (vudu')",
                    "Klanje u putovanju",
                    "Zaborav u namazu",
                    "Ugovori i uvjeti",
                  ].map((t) => (
                    <span key={t} className="truncate text-sm text-white/85">
                      • {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <span
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm text-white
                               ring-1 ring-white/10 backdrop-blur-md
                               bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))]
                               shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
                               hover:bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.07))]
                               transition-colors"
                  >
                    Otvori
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden
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
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
