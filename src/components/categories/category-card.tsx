import Link from "next/link";

export type Cat = {
  slug: string;
  title: string;
  blurb: string;
  img?: string | null;
  accent?: "indigo" | "amber";
  size?: "lg" | "sm";
  count?: number;
};

export default function CategoryCard({ c }: { c: Cat }) {
  const base =
    "group relative overflow-hidden rounded-2xl glass shadow-tinted transition-all soft-trans " +
    "transform-gpu hover:scale-[1.02] focus-visible:scale-[1.02] ring-focus";
  const pad =
    c.size === "lg"
      ? // add extra bottom padding so the fixed button has room
        "p-6 md:p-8 pb-20 md:pb-24 min-h-[220px]"
      : "p-5 md:p-6 pb-16 md:pb-20";

  const accent =
    c.accent === "indigo"
      ? "bg-[linear-gradient(90deg,rgba(129,140,248,.85),rgba(56,189,248,.85))]"
      : c.accent === "amber"
      ? "bg-[#f59e0b]/70"
      : "";

  // position the button nicely for both sizes
  const btnPos =
    c.size === "lg"
      ? "right-6 md:right-8 bottom-6 md:bottom-8"
      : "right-5 md:right-6 bottom-5 md:bottom-6";

  return (
    <Link
      href={`/categories/${c.slug}`}
      aria-label={`Istraži kategoriju ${c.title}`}
      className={base}
    >
      {c.img && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <img
            src={c.img}
            alt={`Ilustracija – ${c.title}`}
            loading="lazy"
            className="h-full w-full object-cover opacity-60 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-black/60" />
        </div>
      )}

      {c.size === "lg" && (
        <span
          aria-hidden
          className={`absolute left-6 right-6 top-0 h-[2px] rounded-xl ${accent}`}
        />
      )}

      {/* content */}
      <div className={`relative ${pad}`}>
        <h3
          className={
            c.size === "lg"
              ? "text-white text-xl font-semibold tracking-tight"
              : "text-white text-lg font-semibold tracking-tight"
          }
        >
          {c.title}
        </h3>
        <p className="mt-2 text-slate-300">{c.blurb}</p>
      </div>

      {/* fixed bottom-right CTA */}
      <span
        className={`absolute ${btnPos} inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium
                    text-slate-900 bg-white/90 ring-1 ring-white/20 shadow-tinted soft-trans
                    group-hover:bg-white`}
      >
        Istraži
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
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
    </Link>
  );
}
