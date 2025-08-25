// src/components/common/feature-card.tsx
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  title: string;
  description: string;
  size?: "sm" | "lg";
  art?: ReactNode;
  className?: string;
};

export default function FeatureCard({
  href,
  title,
  description,
  size = "sm",
  art,
  className,
}: Props) {
  const hasArt = !!art;
  const artH = size === "lg" ? "h-56 md:h-64" : "h-40 md:h-48";
  const cardBg = hasArt ? "bg-white/5" : "bg-white/10";
  const bodyPad = hasArt ? "p-5" : "p-7"; // more padding if no art
  const extraHeight = !hasArt ? (size === "lg" ? "min-h-64" : "min-h-52") : "";

  return (
    <Link
      href={href}
      className={[
        "group block overflow-hidden rounded-xl ring-1 ring-white/10 backdrop-blur-md",
        "transition-colors duration-200 hover:bg-white/15",
        cardBg,
        extraHeight,
        className ?? "",
      ].join(" ")}
    >
      {hasArt && (
        <div className={`relative ${artH}`}>
          <div className="absolute inset-0">{art}</div>
        </div>
      )}

      <div className={bodyPad}>
        <h3 className="text-white font-semibold sm:font-bold tracking-tight text-depth">
          {title}
        </h3>
        <p className="mt-1 text-slate-300 text-sm">{description}</p>
      </div>
    </Link>
  );
}
