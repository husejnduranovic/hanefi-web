import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/mock";

/** 2x2 modern showcase for exactly four categories. */
export function CategoryShowcase({ items }: { items: Category[] }) {
  const cats = items.slice(0, 4);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cats.map((c) => (
        <Link
          key={c.slug}
          href={`/categories/${c.slug}`}
          className="group relative overflow-hidden rounded-3xl border border-white/10"
        >
          <div className="relative aspect-[4/3] md:aspect-[3/2]">
            {c.imageUrl && (
              <Image
                src={c.imageUrl}
                alt=""
                fill
                quality={90}
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                priority={false}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
            <div className="absolute left-4 right-4 bottom-4">
              <h3 className="on-image mt-2 text-balance text-xl font-semibold leading-tight">
                {c.name}
              </h3>
              <p className="on-image mt-1 line-clamp-2 text-sm">
                {c.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
