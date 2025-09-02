export default function Hero() {
  return (
    <section className="relative mt-10 sm:mt-14 py-16 sm:py-28">
      <div className="container-soft">
        <div className="relative mx-auto max-w-3xl text-center">
          {/* Soft indigo glow behind text (uses your .glow-oval utility) */}
          <div aria-hidden className="glow-oval glow-indigo glow-oval-soft" />

          {/* Title */}
          <h1
            className="text-5xl sm:text-7xl font-bold leading-[1.05] tracking-tight"
            style={{ textWrap: "balance" as any }}
          >
            <span className="text-white text-depth">Hanefijski mezheb</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-5 text-lg sm:text-xl text-slate-300"
            style={{ textWrap: "balance" as any }}
          >
            Sažeta objašnjenja, provjereni izvori i praktični odgovori na jednom
            mjestu.
          </p>

          {/* Subtle accent line (keeps it modern without clutter) */}
          <span
            aria-hidden
            className="mt-7 inline-block h-[2px] w-24 rounded-full 
                       bg-[linear-gradient(90deg,rgba(129,140,248,.9),rgba(56,189,248,.9))]"
          />
        </div>
      </div>
    </section>
  );
}
