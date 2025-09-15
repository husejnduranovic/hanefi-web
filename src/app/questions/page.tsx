// app/questions/page.tsx
import type { Metadata } from "next";
import { questions as allQ } from "@/lib/mock";
import { Section } from "@/components/common/section";
import { QuestionToolbar } from "@/components/questions/questions-toolbar";
import { QuestionCard } from "@/components/questions/question-card";
import { Pagination } from "@/components/common/pagination";

export const metadata: Metadata = { title: "Questions" };

const PAGE_SIZE = 10;

export default async function QuestionsIndex({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: "answered" | "awaiting";
    tag?: string;
    page?: string;
  }>;
}) {
  const {
    q = "",
    status = undefined,
    tag = "",
    page = "1",
  } = await searchParams;

  const tags = Array.from(new Set(allQ.flatMap((x) => x.tags))).sort();

  let filtered = allQ.filter((x) => {
    const okStatus =
      !status || (status === "answered" ? x.answered : !x.answered);
    const okTag = !tag || x.tags.includes(tag);
    const okQ =
      !q ||
      [x.title, x.body ?? "", x.answer ?? "", x.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q.toLowerCase());
    return okStatus && okTag && okQ;
  });

  // sort newest first by date
  filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const pageNum = Math.max(
    1,
    parseInt(Array.isArray(page) ? page[0] : page, 10) || 1
  );
  const start = (pageNum - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Section
        title="Odgovori i pitanja"
        subtitle={`${filtered.length} rezultat${
          filtered.length === 1 ? "" : "a"
        }`}
        cta={{ label: "Postavi pitanje", href: "/questions/ask" }}
      >
        <QuestionToolbar tags={tags} />

        <div className="mt-6 grid gap-4">
          {paged.map((q) => (
            <QuestionCard
              key={q.id}
              href={`/questions/${q.slug}`}
              title={q.title}
              tags={q.tags}
              answered={q.answered}
              date={q.date}
              excerpt={q.body}
            />
          ))}
        </div>

        <Pagination
          page={pageNum}
          pageSize={PAGE_SIZE}
          total={filtered.length}
        />
      </Section>

      <div className="py-16" />
    </main>
  );
}
