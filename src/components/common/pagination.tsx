import Link from "next/link";

export function Pagination({
  page,
  pageSize,
  total,
}: {
  page: number;
  pageSize: number;
  total: number;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const prev = Math.max(1, page - 1);
  const next = Math.min(pages, page + 1);
  const hasPrev = page > 1;
  const hasNext = page < pages;

  function withPage(p: number) {
    const url = new URL(
      typeof window !== "undefined" ? window.location.href : "http://localhost"
    );
    url.searchParams.set("page", String(p));
    return url.search.replace(url.origin, "");
  }

  return (
    <nav
      className="mt-6 flex items-center justify-between"
      aria-label="Pagination"
    >
      <Link
        href={withPage(prev)}
        className={`btn-ghost ${
          !hasPrev ? "pointer-events-none opacity-50" : ""
        }`}
        aria-disabled={!hasPrev}
      >
        Prethodno
      </Link>
      <span className="text-xs text-slate-400">
        Stranica {page} od {pages}
      </span>
      <Link
        href={withPage(next)}
        className={`btn-ghost ${
          !hasNext ? "pointer-events-none opacity-50" : ""
        }`}
        aria-disabled={!hasNext}
      >
        Slijedeće
      </Link>
    </nav>
  );
}
