import Link from "next/link";

export function NavPrevNext({
  prev,
  next,
  eyebrow = "Nastavi",
}: {
  prev?: { href: string; title: string; eyebrow?: string } | null;
  next?: { href: string; title: string; eyebrow?: string } | null;
  eyebrow?: string;
}) {
  if (!prev && !next) return null;
  return (
    <nav aria-label="Prev/Next" className="mt-12 grid gap-3 md:grid-cols-2">
      {prev && (
        <Link
          href={prev.href}
          className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/40 hover:bg-white/7"
        >
          <p className="text-xs text-slate-400">{prev.eyebrow || eyebrow}</p>
          <p className="mt-1 inline-flex items-center gap-2 text-balance font-semibold group-hover:underline">
            ← {prev.title}
          </p>
        </Link>
      )}
      {next && (
        <Link
          href={next.href}
          className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/40 hover:bg-white/7 md:justify-self-end"
        >
          <p className="text-xs text-slate-400">{next.eyebrow || eyebrow}</p>
          <p className="mt-1 inline-flex items-center gap-2 text-balance font-semibold group-hover:underline">
            {next.title} →
          </p>
        </Link>
      )}
    </nav>
  );
}
