import Link from "next/link";

export function Section({
  title,
  subtitle,
  children,
  cta,
  action,
  donate,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  cta?: { label: string; href: string };
  action?: React.ReactNode;
  donate?: boolean;
}) {
  return (
    <section className="mt-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-300/90">{subtitle}</p>
          )}
        </div>
        {cta && (
          <Link
            href={cta.href}
            className={`${donate ? "btn-gold" : "btn-ghost"}`}
          >
            {cta.label}
          </Link>
        )}
      </div>

      {/* Render ONLY one: action OR children */}
      {action ?? children}
    </section>
  );
}
