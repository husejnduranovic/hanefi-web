import { ListSkeleton } from "@/components/common/sekeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mt-8">
        <ListSkeleton rows={8} />
      </div>
    </main>
  );
}
