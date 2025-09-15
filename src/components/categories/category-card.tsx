import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/mock";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-emerald-400/40 hover:bg-white/7"
    >
      <div className="relative h-28">
        {category.imageUrl && (
          <Image
            src={category.imageUrl}
            alt=""
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.03]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
      </div>
      <div className="flex items-start gap-3 p-4">
        <div className="rounded-xl bg-emerald-400/15 p-2">
          <span
            className="block h-5 w-5 bg-[length:20px_20px] bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${category.icon})` }}
          />
        </div>
        <div>
          <h3 className="font-medium">{category.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-300/85">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
