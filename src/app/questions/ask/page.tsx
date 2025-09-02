// app/questions/ask/page.tsx
import Link from "next/link";
import { fetchCategories } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function AskQuestionPage() {
  const cats = await fetchCategories();

  return (
    <main className="relative py-10 sm:py-14">
      <div className="container-soft max-w-3xl">
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Postavi pitanje
          </h1>
          <p className="mt-3 text-slate-300">
            Postavi jasno pitanje — odgovor će sadržavati citate i uputnice.
          </p>
        </header>

        <form
          className="rounded-2xl glass ring-tinted shadow-tinted p-5 space-y-5" /* action={createQuestion} */
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm text-slate-300 mb-1"
            >
              Naslov
            </label>
            <input
              id="title"
              name="title"
              required
              placeholder="Npr. Da li se spaja podne i ikindija u hanefijskom mezhebu?"
              className="field w-full px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm text-slate-300 mb-1"
              >
                Kategorija
              </label>
              <select
                id="category"
                name="category"
                className="field w-full px-3 py-2"
              >
                {cats.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="anon"
                name="anon"
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-white/5"
              />
              <label htmlFor="anon" className="text-sm text-slate-300">
                Objavi anonimno
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="body" className="block text-sm text-slate-300 mb-1">
              Detalji
            </label>
            <textarea
              id="body"
              name="body"
              required
              rows={8}
              placeholder="Napiši kontekst i konkretno pitanje…"
              className="field w-full px-3 py-2"
            />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" className="btn-primary">
              Objavi
            </button>
            <Link href="/questions" className="btn-ghost">
              Nazad
            </Link>
          </div>
        </form>

        {/* For server action later:
        export async function createQuestion(formData: FormData) { ... }
        */}
      </div>
    </main>
  );
}
