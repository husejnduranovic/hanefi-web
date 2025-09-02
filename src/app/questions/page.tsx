// app/questions/page.tsx

import QuestionRowCard from "@/components/questions/question-row-card";
import QuestionsToolbar from "@/components/questions/questions-toolbar";
import { fetchCategories, fetchQuestions } from "@/lib/api";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function QuestionsIndex({
  searchParams,
}: {
  searchParams: {
    q?: string;
    category?: string;
    status?: "all" | "unanswered" | "answered";
    sort?: "latest" | "popular";
    page?: string;
  };
}) {
  const q = (searchParams.q ?? "").trim();
  const category = searchParams.category ?? "";
  const status = (searchParams.status ?? "all") as
    | "all"
    | "unanswered"
    | "answered";
  const sort = (searchParams.sort === "popular" ? "popular" : "latest") as
    | "latest"
    | "popular";

  const [cats, { items }] = await Promise.all([
    fetchCategories(),
    fetchQuestions({ q, category, status, sort, page: 1, limit: 30 }),
  ]);

  return (
    <main className="relative py-10 sm:py-14">
      <div className="container-soft space-y-6">
        <QuestionsToolbar
          cats={cats.map((c) => ({ slug: c.slug, title: c.title }))}
        />

        {items.length === 0 ? (
          <div className="rounded-2xl glass ring-tinted shadow-tinted p-8 text-slate-300">
            Nema pitanja za tražene filtere.{" "}
            <Link
              href="/questions/ask"
              className="underline underline-offset-4 decoration-white/40 hover:text-white"
            >
              Postavi prvo pitanje
            </Link>
            .
          </div>
        ) : (
          <div className="space-y-9">
            {items.map((q) => (
              <QuestionRowCard key={q.id} q={q} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
