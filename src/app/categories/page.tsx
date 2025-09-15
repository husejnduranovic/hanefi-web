import type { Metadata } from "next";
import { categories, articles } from "@/lib/mock";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { CategoryListCard } from "@/components/categories/category-list-card";

export const metadata: Metadata = { title: "Kategorije" };

export default function CategoriesPage() {
  const counts = Object.fromEntries(
    categories.map((c) => [
      c.name,
      articles.filter((a) => a.category === c.name).length,
    ])
  );

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Section
        title="Pregledaj kategorije"
        subtitle={`${categories.length} ${
          categories.length === 1 ? "kategorija" : "kategorija"
        } dostupnih`}
      >
        <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryListCard
              key={c.slug}
              category={c}
              count={counts[c.name] ?? 0}
            />
          ))}
        </Reveal>
      </Section>
      <div className="py-16" />
    </main>
  );
}
