import {
  ArticleBodySkeleton,
  ArticleHeroSkeleton,
} from "@/components/common/sekeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <ArticleHeroSkeleton />
      <ArticleBodySkeleton paragraphs={8} />
    </main>
  );
}
