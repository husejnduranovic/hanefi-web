import Link from "next/link";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  items,
  className = "",
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-2 text-slate-400">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:underline text-slate-300/90 dark:text-slate-300"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {item.label}
                </span>
              )}
              {!isLast && <span className="select-none text-slate-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
