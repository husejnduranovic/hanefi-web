// src/components/articles/article-card.tsx
import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  title: string;
  excerpt?: string;
  imageUrl?: string | null;
};

export default function ArticleCard({ href, title, excerpt, imageUrl }: Props) {
  return (
    <article
      className="
        group overflow-hidden rounded-lg
        ring-1 ring-white/10
        backdrop-blur-md
        bg-white/1 hover:bg-white/30
        transition-colors duration-200
      "
    >
      <Link
        href={href}
        className="block no-underline focus-visible:outline-none"
      >
        {/* TOP: image */}
        <div className="h-56 w-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={1200}
              height={675}
              className="block h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900" />
          )}
        </div>

        {/* BOTTOM: text area — also goes transparent on hover */}
        <div
          className="
            border-t border-white/10
            bg-white/10 group-hover:bg-transparent
            backdrop-blur-md
            transition-colors duration-200
            p-6
          "
        >
          <h3 className="text-lg font-light text-slate-100">{title}</h3>
          {excerpt && <p className="mt-1 text-sm text-slate-300">{excerpt}</p>}
        </div>
      </Link>
    </article>
  );
}
