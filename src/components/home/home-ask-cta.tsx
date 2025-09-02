// components/HomeAskCTA.tsx
import Link from "next/link";
import { HelpCircle } from "lucide-react";

export default function HomeAskCTA() {
  return (
    <section className="py-10 sm:py-12">
      <div className="container-soft flex justify-center">
        <Link
          href="/questions/ask"
          className="btn-cta-glass btn-cta-glass--ultra ring-focus"
          aria-label="Postavi pitanje"
        >
          <HelpCircle size={20} />
          <span className="text-base sm:text-lg">Postavi pitanje</span>
        </Link>
      </div>
    </section>
  );
}
