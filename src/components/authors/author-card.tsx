// src/components/authors/author-card.tsx
import Link from "next/link";

type Props = {
  name: string;
  bio: string;
  href?: string;
  accent?: string; // e.g. "#60a5fa"
  faceUrl?: string; // optional faint face image in bg (free placeholders)
};

export default function AuthorCard({
  name,
  bio,
  href = "#",
  accent = "#60a5fa",
  faceUrl,
}: Props) {
  return (
    <Link
      href={href}
      className="
        group relative overflow-hidden rounded-2xl
        border border-white/12 bg-gradient-to-b from-white/[.10] to-white/[.04]
        backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,.75)]
        transition-transform transition-colors duration-300
        hover:-translate-y-0.5 hover:from-white/[.14] hover:to-white/[.06]
        p-6 md:p-7 min-h-44
      "
      style={{ ["--accent" as any]: accent }}
    >
      {/* short bright top segment */}
      <span
        aria-hidden
        className="absolute left-6 top-0 h-[2px] w-24 rounded-full"
        style={{ background: "var(--accent)" }}
      />

      {/* inner hairline */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5"
      />

      {/* faint face on the right (optional) */}
      {faceUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={faceUrl}
          alt=""
          aria-hidden
          className="
            pointer-events-none absolute bottom-0 right-0 h-full w-1/3 object-cover
            opacity-20 grayscale contrast-125
            [mask-image:linear-gradient(to_left,black,transparent)]
          "
        />
      )}

      {/* content */}
      <h3 className="text-white font-semibold tracking-tight [text-shadow:0_2px_6px_rgba(0,0,0,.45)]">
        {name}
      </h3>
      <p className="mt-2 text-sm text-slate-300">{bio}</p>
    </Link>
  );
}
