"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="container-soft text-center">
        <h2 className="text-white text-2xl font-semibold">
          Greška pri učitavanju
        </h2>
        <p className="mt-2 text-slate-300">
          {error.message || "Pokušaj ponovo."}
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                     text-slate-900 bg-white/90 ring-1 ring-white/20 shadow-tinted hover:bg-white soft-trans"
        >
          Pokušaj ponovo
        </button>
      </div>
    </section>
  );
}
