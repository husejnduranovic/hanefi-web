import type { Metadata } from "next";
import { refutations as allRefs } from "@/lib/mock";
import { Section } from "@/components/common/section";
import { RefutationToolbar } from "@/components/refutations/refutation-toolbar";
import { RefutationCard } from "@/components/refutations/refutation-card";

export const metadata: Metadata = { title: "Refutations" };

export default async function RefutationsIndex({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; topic?: string }>;
}) {
  const { q = "", topic = "" } = await searchParams;

  const topics = Array.from(new Set(allRefs.map((r) => r.topic))).sort();

  const filtered = allRefs.filter((r) => {
    const okTopic = !topic || r.topic === topic;
    const okQ =
      !q ||
      [r.title, r.summary, r.topic]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase());
    return okTopic && okQ;
  });

  // Sort by topic then title (mock has no date/views)
  filtered.sort((a, b) => (a.topic + a.title).localeCompare(b.topic + b.title));

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Section
        title="Pobijanja"
        subtitle="Pojašnjenja i odgovori na uobičajene tvrdnje"
      >
        <RefutationToolbar topics={topics} />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((r) => (
            <RefutationCard
              key={r.id}
              href={`/refutations/${r.slug}`}
              title={r.title}
              topic={r.topic}
              summary={r.summary}
            />
          ))}
        </div>
      </Section>

      <div className="py-16" />
    </main>
  );
}
