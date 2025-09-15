"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/mock";
import { RadioChips } from "@/components/common/radio-chips";

export default function AskQuestionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<string>(""); // optional

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const catMsg = category
      ? `\nCategory: ${category}`
      : "\nCategory: (none selected)";
    alert("Your question was submitted and is pending review." + catMsg);
    router.push("/questions");
  }

  const catOptions = [
    { label: "Nema kategorije", value: "" },
    ...categories.map((c) => ({ label: c.name, value: c.name })),
  ];

  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
      <header className="mt-8">
        <h1 className="text-2xl font-semibold">Postavi pitanje</h1>
        <p className="mt-1 text-sm text-slate-300">
          Budite koncizni. Ako je moguće, uključite relevantne detalje i izvore.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Naslov</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-cyan-400/60"
            placeholder="npr. Da li je dozvoljeno kombinovanje molitvi tokom putovanja?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Detalji</label>
          <textarea
            required
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-cyan-400/60"
            placeholder="Navedite kontekst, ono što ste pročitali i konkretne tačke oko kojih niste sigurni."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Kategorija (opcionalno)
          </label>
          <RadioChips
            name="category"
            options={catOptions}
            value={category}
            onChange={setCategory}
          />
          <p className="mt-1 text-xs text-slate-400">
            Možete ovo ostaviti na "Bez kategorije". Kategorizovat ćemo to
            kasnije.
          </p>
        </div>

        <div className="pt-2">
          <button className="btn-primary">Potvrdi</button>
        </div>
      </form>

      <div className="py-16" />
    </main>
  );
}
