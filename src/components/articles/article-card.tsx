// components/cards/ArticleCard.tsx
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/lib/mock";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-cyan-400/40 hover:bg-white/7">
      {article.imageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={article.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
          <div className="absolute left-3 top-3 flex items-center gap-2 text-xs">
            <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 text-cyan-300">
              {article.category}
            </span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-slate-200">
              {article.readTime} min
            </span>
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-medium leading-tight">
          <Link
            href={`/articles/${article.slug}`}
            className="focus:outline-none"
          >
            <span className="absolute inset-0" aria-hidden />
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-300/85">
          {article.excerpt}
        </p>
      </div>
      <div className="px-4 pb-4 text-xs text-slate-400">
        <time dateTime={article.createdAt}>
          {formatDate(article.createdAt)}
        </time>
        <span aria-hidden> • </span>
        <span>{article.viewCount} pregleda</span>
      </div>
    </article>
  );
}
