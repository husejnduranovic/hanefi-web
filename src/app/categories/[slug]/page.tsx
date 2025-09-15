import { notFound } from "next/navigation";
import { categories, articles } from "@/lib/mock";
import { Section } from "@/components/common/section";
import { ArticleCard } from "@/components/articles/article-card";
import { Breadcrumbs } from "@/components/common/breadcrumbs";

type Params = { slug: string };

export default async function CategoryDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return notFound();

  // Articles store category by NAME
  const items = articles.filter((a) => a.category === cat.name);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        className="mt-6"
        items={[
          { label: "Početna", href: "/" },
          { label: "Kategorije", href: "/categories" },
          { label: cat.name },
        ]}
      />
      <Section
        title={cat.name}
        subtitle={cat.description}
        cta={{
          label: "Pogledaj u člancima",
          href: `/articles?category=${encodeURIComponent(cat.name)}`,
        }}
      >
        {items.length === 0 ? (
          <p className="text-slate-300/90">Nema članaka u ovoj kategoriji.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.slice(0, 30).map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </Section>
      <div className="py-16" />
    </main>
  );
}
