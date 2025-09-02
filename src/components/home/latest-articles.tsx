import Link from "next/link";

type Item = {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
};

const demo: Item[] = [
  {
    slug: "/articles/sta-je-fikh-i-ko-je-fakih",
    title: "Uvod u hanefijski fikh",
    excerpt: "Osnovni pojmovi, ciljevi šerijata i metodologija tumačenja.",
    image: "/images/discover/articlesbg1.png",
  },
  {
    slug: "/articles/tahara-osnove",
    title: "Tahara: osnove čistoće",
    excerpt: "Vrste vode, najčešće dileme i praktični savjeti.",
    image: "/images/discover/articlesbg2.png",
  },
  {
    slug: "/articles/abdest-najcesce-greske",
    title: "Ablucija: najčešće greške",
    excerpt: "Šta kvari abdest, a šta ne — s dokazima.",
    image: "/images/discover/articlesbg3.png",
  },
  {
    slug: "/articles/namaz-redoslijed",
    title: "Redoslijed namaza",
    excerpt: "Farz, vadžib i sunnet — jasna hijerarhija.",
    image: "/images/discover/articlesbg1.png",
  },
  {
    slug: "/articles/putnik-skraćivanje",
    title: "Putnik i skraćivanje namaza",
    excerpt: "Kada se skraćuje, koliko traje, promjena namjere.",
    image: "/images/discover/articlesbg2.png",
  },
  {
    slug: "/articles/post-putovanje",
    title: "Post i putovanje",
    excerpt: "Olakšice postaču i granice primjene.",
    image: "/images/discover/articlesbg3.png",
  },
  {
    slug: "/articles/ugovori-osnove",
    title: "Ugovori i uvjeti",
    excerpt: "Šta čini ugovor ispravnim i koje uvjete izbjegavati.",
    image: "/images/discover/articlesbg1.png",
  },
  {
    slug: "/articles/porodično-pravo",
    title: "Porodično pravo: pregled",
    excerpt: "Prava i obaveze supružnika, mirenje i savjetovanje.",
    image: "/images/discover/articlesbg2.png",
  },
];

export default function LatestArticles({ items = demo }: { items?: Item[] }) {
  // preporuka: 8 kartica da “diše”
  const visible = items.slice(0, 8);

  return (
    <section id="latest" className="relative py-20 sm:py-28">
      <div className="container-soft">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Najnoviji članci
            </h2>
            <p className="mt-2 text-slate-300">
              Sažeta čitanja s jasnim hijerarhijama i referencama.
            </p>
          </div>
          <Link
            href="/articles"
            className="hidden sm:inline text-sm text-white/85 hover:text-white ring-focus rounded px-2 py-1"
          >
            Svi članci →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 md:gap-8 overflow-visible">
          {visible.map((it) => (
            <article
              key={it.slug}
              className="
    group relative overflow-hidden rounded-2xl
    bg-white/[0.02]
    transition-all duration-200 ease-out transform-gpu will-change-transform
    hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(2,6,23,0.45)]
    focus-within:scale-[1.03] focus-within:-translate-y-0.5
    before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl
    before:ring-1 before:ring-white/10 before:opacity-35 hover:before:opacity-50
  "
            >
              <Link
                href={it.slug}
                aria-label={it.title}
                className="relative block focus:outline-none ring-focus rounded-2xl"
              >
                {/* FULL-BG IMAGE */}
                <div className="absolute inset-0 -z-10">
                  {it.image ? (
                    <img
                      src={it.image}
                      alt=""
                      className="h-full w-full object-cover brightness-[.58] saturate-[.9]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full bg-[radial-gradient(80%_60%_at_50%_0%,rgba(148,163,184,0.18),transparent_70%)]" />
                  )}
                  {/* TOP DARK FADE so text sits on it */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.88)_0%,rgba(2,6,23,0.55)_35%,rgba(2,6,23,0.10)_70%,rgba(2,6,23,0)_100%)]" />
                </div>

                {/* CONTENT pinned to TOP */}
                <div className="relative p-4 pb-20 min-h-[220px] flex flex-col justify-start">
                  <div className="relative p-4 pb-20 min-h-[220px] flex flex-col justify-start">
                    <h3 className="text-white text-base sm:text-[17px] font-semibold leading-tight">
                      {it.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-slate-300/95 line-clamp-3">
                      {it.excerpt}
                    </p>
                  </div>

                  {/* CTA — bottom-right, outline-only */}
                  <div className="absolute bottom-3 right-3">
                    <span
                      className="group/button relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5
               text-[12px] text-white/95
               border border-white/15 bg-transparent
               hover:border-white/25 transition-colors ring-focus"
                    >
                      <span>Pročitaj</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden
                        className="transition-transform duration-200 group-hover/button:translate-x-0.5"
                      >
                        <path
                          d="M7 5l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      {/* subtle gradient underline on hover */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-2 right-2 -bottom-1 h-px rounded-full
                 bg-[linear-gradient(90deg,transparent,rgba(129,140,248,0.85),rgba(56,189,248,0.85),transparent)]
                 opacity-0 transition-opacity duration-200 group-hover/button:opacity-100"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* footer link for smaller set */}
        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/articles"
            className="text-sm text-white/85 hover:text-white ring-focus rounded px-2 py-1"
          >
            Svi članci →
          </Link>
        </div>
      </div>
    </section>
  );
}
