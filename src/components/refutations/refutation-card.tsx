import Link from "next/link";
import type { Refutation } from "@/lib/mock";

/**
 * Supports EITHER shape:
 *   <RefutationCard refutation={r} />
 *   <RefutationCard href="/refutations/slug" title="..." topic="..." summary="..." />
 */
export function RefutationCard(
  props:
    | { refutation: Refutation }
    | { href: string; title: string; topic: string; summary: string }
) {
  const r = (props as any).refutation as Refutation | undefined;

  const href =
    (props as any).href ?? (r ? `/refutations/${r.slug}` : undefined);
  const title = (props as any).title ?? r?.title ?? "";
  const topic = (props as any).topic ?? r?.topic ?? "";
  const summary = (props as any).summary ?? r?.summary ?? "";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-fuchsia-400/40 hover:bg-white/7">
      {/* Vertical accent bar */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-rose-400 to-fuchsia-400"
        aria-hidden
      />
      {/* Corner ribbon */}
      <div className="pointer-events-none absolute right-0 top-5 -translate-y-1/2 translate-x-6 rotate-45 rounded-md bg-fuchsia-500/20 px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-fuchsia-200">
        Pobijanja
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="rounded-md bg-rose-400/10 px-2 py-0.5 text-rose-200">
          {topic}
        </span>
      </div>

      <h3 className="mt-2 text-base font-semibold leading-tight">
        {href ? (
          <Link href={href} className="hover:underline">
            {title}
          </Link>
        ) : (
          <span>{title}</span>
        )}
      </h3>

      <p className="mt-1 line-clamp-3 text-sm text-slate-300/90">{summary}</p>

      {href && (
        <div className="mt-3 text-xs text-slate-400 group-hover:text-slate-300">
          Pročitajte pobijanje →
        </div>
      )}
    </article>
  );
}
