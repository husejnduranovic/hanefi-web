import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/mock";

export function CategoryListCard({
  category,
  count,
}: {
  category: Category;
  count?: number;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative overflow-hidden rounded-3xl border border-white/10"
    >
      <div className="relative aspect-[4/3] md:aspect-[3/2]">
        {category.imageUrl && (
          <Image
            src={category.imageUrl}
            alt=""
            fill
            quality={90}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

        <div className="absolute left-4 right-4 bottom-4">
          <div className="flex items-center gap-2">
            <h3 className="on-image text-xl font-semibold leading-tight">
              {category.name}
            </h3>
            {typeof count === "number" && (
              <span className="on-image rounded-md bg-white/10 px-2 py-0.5 text-xs">
                {count} {count === 1 ? "članak" : "članaka"}
              </span>
            )}
          </div>
          <p className="on-image mt-1 line-clamp-2 text-sm">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
