// src/components/home/authors-showcase.tsx
import AuthorCard from "@/components/authors/author-card";
import SectionBadge from "../common/section-badge";

export default function AuthorsShowcase() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0b0b0b] via-black to-[#090909] py-28">
      {/* thin divider at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* bottom-left bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[42rem] w-[42rem] rounded-full
                   bg-[radial-gradient(closest-side,rgba(255,255,255,.10),transparent_70%)] opacity-30"
      />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* hub pill with soft glow */}
        <div className="relative mx-auto w-fit">
          <div
            className="absolute -inset-x-6 -inset-y-3 rounded-full bg-white/5 blur-xl"
            aria-hidden
          />
          <SectionBadge
            label="Autori"
            href="/authors"
            from="from-sky-400"
            to="to-pink-500"
          />
        </div>

        {/* graceful connector curves */}
        <div className="pointer-events-none relative mx-auto mt-12 h-44 max-w-6xl bg">
          <svg
            viewBox="0 0 1200 200"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="wire" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50%" stopColor="rgba(255,255,255,.35)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <g
              fill="none"
              stroke="url(#wire)"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M600 10 C 600 60, 280 70, 280 120" />
              <path d="M600 10 C 600 65, 600 75, 600 120" />
              <path d="M600 10 C 600 60, 920 70, 920 120" />
            </g>
          </svg>
        </div>

        {/* bigger, modern cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <AuthorCard
            name="Imam Abu Hanifa"
            bio="Utemeljitelj hanefijske metodologije; fokus na razbor i analogiju (qiyas)."
            accent="#60a5fa"
            faceUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900&auto=format&fit=crop"
          />
          <AuthorCard
            name="Imam Muhammad"
            bio="Sistematizirao mezheb; zapisao pravne rasprave i mišljenja u kanonske zbirke."
            accent="#f59e0b"
            faceUrl="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=900&auto=format&fit=crop"
          />
          <AuthorCard
            name="Imam Abu Yusuf"
            bio="Prvi kadil-kudat; uveo hanefijsko pravo u državnu praksu i upravu."
            accent="#fb7185"
            faceUrl="https://images.unsplash.com/photo-1545996124-0501ebae84d4?q=80&w=900&auto=format&fit=crop"
          />
        </div>
      </div>
    </section>
  );
}
