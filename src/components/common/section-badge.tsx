import Link from "next/link";
import { Users } from "lucide-react";

type Props = {
  label: string;
  href?: string;
  // Tailwind gradient classes for the accent underline
  from?: string; // e.g. "from-cyan-400"
  to?: string; // e.g. "to-fuchsia-500"
};

export default function SectionBadge({
  label,
  href = "#",
  from = "from-cyan-400",
  to = "to-fuchsia-500",
}: Props) {
  return (
    <Link
      href={href}
      className="
        relative inline-flex items-center gap-2
        rounded-full border-2 border-dotted border-white/20
        bg-white/10 backdrop-blur-md
        px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-slate-100
        shadow-[0_8px_30px_rgba(0,0,0,.25)]
        transition-transform transition-colors duration-200
        hover:bg-white/15 hover:scale-[1.02]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
      "
    >
      <Users size={14} className="opacity-90" aria-hidden />
      <span className="font-medium">{label}</span>

      {/* subtle inner hairline */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10"
      />

      {/* gradient underline accent */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r ${from} ${to} opacity-80`}
      />
    </Link>
  );
}
