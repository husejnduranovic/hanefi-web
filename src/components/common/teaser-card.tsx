import Link from "next/link";

type Props = {
  href: string;
  title: string;
  description?: string;
  className?: string; // pass heights like "h-48" or "h-72"
};

export default function TeaserCard({
  href,
  title,
  description,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={[
        "group block rounded-lg ring-1 ring-white/10 bg-white/5 backdrop-blur-md",
        "transition-colors duration-200 hover:bg-white/10",
        "px-4 py-5 text-slate-100 no-underline",
        className ?? "",
      ].join(" ")}
    >
      <h3 className="text-base sm:text-lg font-medium text-slate-100">
        {title}
      </h3>
      {description && (
        <p className="mt-1 text-sm text-slate-300">{description}</p>
      )}
    </Link>
  );
}
