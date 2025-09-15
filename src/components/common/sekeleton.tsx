// components/Skeleton.tsx
export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-white/5 ${className}`} />;
}

export function SkeletonLine({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse h-3 rounded bg-white/10 ${className}`} />
  );
}

export function GridSkeleton({
  cards = 6,
  cols = 3,
}: {
  cards?: number;
  cols?: 1 | 2 | 3;
}) {
  const base = "grid gap-6";
  const colsCls =
    cols === 1
      ? "grid-cols-1"
      : cols === 2
      ? "sm:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`${base} ${colsCls}`}>
      {Array.from({ length: cards }).map((_, i) => (
        <article
          key={i}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <SkeletonBlock className="h-4 w-20" />
              <SkeletonBlock className="h-4 w-16" />
            </div>
            <SkeletonLine className="h-4 w-3/4" />
            <SkeletonLine className="h-4 w-5/6" />
            <SkeletonLine className="h-4 w-2/3" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <SkeletonBlock className="h-3 w-20" />
            <SkeletonBlock className="h-3 w-14" />
          </div>
        </article>
      ))}
    </div>
  );
}

export function ArticleHeroSkeleton() {
  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-white/10">
      <div className="relative aspect-[16/7] sm:aspect-[16/6]">
        <SkeletonBlock className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:px-8 sm:pb-8">
          <div className="flex gap-2">
            <SkeletonBlock className="h-5 w-24 rounded-full" />
            <SkeletonBlock className="h-5 w-16 rounded-full" />
            <SkeletonBlock className="h-5 w-16 rounded-full" />
          </div>
          <SkeletonLine className="mt-3 h-7 w-2/3" />
          <SkeletonLine className="mt-2 h-4 w-1/2" />
        </div>
      </div>
    </section>
  );
}

export function ArticleBodySkeleton({
  paragraphs = 6,
}: {
  paragraphs?: number;
}) {
  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-4">
      {Array.from({ length: paragraphs }).map((_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonLine className="w-full" />
          <SkeletonLine className="w-11/12" />
          <SkeletonLine className="w-10/12" />
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <ul className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-white/5">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="flex items-center justify-between gap-4 p-4">
          <div className="flex-1">
            <SkeletonLine className="h-4 w-3/4" />
            <div className="mt-2 flex gap-2">
              <SkeletonBlock className="h-4 w-16 rounded-md" />
              <SkeletonBlock className="h-4 w-14 rounded-md" />
              <SkeletonBlock className="h-4 w-20 rounded-md" />
            </div>
          </div>
          <SkeletonBlock className="h-4 w-20" />
        </li>
      ))}
    </ul>
  );
}
