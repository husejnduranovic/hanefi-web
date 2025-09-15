import { ArticleCard } from "@/components/articles/article-card";
import { CategoryShowcase } from "@/components/categories/category-showcase";
import { ModuleNavHero } from "@/components/common/module-nav-hero";
import { Reveal } from "@/components/common/reveal";
import { Section } from "@/components/common/section";
import Hero from "@/components/hero/hero";
import { QAList } from "@/components/questions/qa-list";
import { RefutationCard } from "@/components/refutations/refutation-card";
import { articles, categories, questions, refutations } from "@/lib/mock";

export default function HomePage() {
  return (
    <main id="content" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Hero />

      <Section
        title="Istraži stranicu"
        subtitle="Četiri kategorije, jedno mjesto za učenje"
        action={<ModuleNavHero />}
      />

      <Section
        title="Izdvojeni Članci"
        subtitle="Odabrana čitanja kroz ključne teme"
        cta={{ label: "Pregledaj sve članke", href: "/articles" }}
      >
        <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 6).map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </Reveal>
      </Section>

      <Section
        title="Kategorije"
        subtitle="Pronađi naslove po tematici"
        cta={{ label: "Sve kategorije", href: "/categories" }}
      >
        <CategoryShowcase items={categories.slice(0, 4)} />
      </Section>

      <Section
        title="Najnoviji Q&A"
        subtitle="Odgovori iz stručne literature i izvora"
        cta={{ label: "Pogledaj sva pitanja", href: "/questions" }}
      >
        <QAList items={questions.slice(0, 6)} />
      </Section>

      <Section
        title="Fokus na pobijanja"
        subtitle="Pojašnjenja i odgovori"
        cta={{ label: "Sva pobijanja", href: "/refutations" }}
      >
        {/* Scroll-snap on mobile, grid on desktop */}
        <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <div className="flex gap-4 md:grid md:grid-cols-2 snap-x snap-mandatory md:snap-none">
            {refutations.slice(0, 4).map((r) => (
              <div key={r.id} className="min-w-[85%] snap-start md:min-w-0">
                <RefutationCard refutation={r} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        title="Ostani u toku"
        subtitle="Povremeni istaknuti dijelovi. Nema neželjene pošte."
      >
        <form className="glass flex w-full max-w-xl items-center gap-3 rounded-2xl p-2">
          <input
            type="email"
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-cyan-400/60"
          />
          <button className="btn-primary">Pretplati se</button>
        </form>
      </Section>

      <div className="py-16" />
      <Section
        title="Podrži projekat"
        subtitle="Pomozi nam pokriti troškove hostinga i nastaviti unapređivati biblioteku."
        cta={{ label: "Doniraj", href: "/donate" }}
        donate
      >
        <div className="glass rounded-2xl p-4 text-sm text-slate-300/95">
          Tvoja podrška omogućava besplatan pristup člancima i Q&A za sve.
          JazakAllahu khayran.
        </div>
      </Section>
    </main>
  );
}
