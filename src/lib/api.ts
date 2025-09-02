// lib/api.ts
export type SortKey = "novo" | "popularno" | "az";

export type ArticleSource = { label?: string; cite?: string; href?: string };

export type ArticleDetail = {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  imageUrl?: string | null;
  status: string;
  author: { id: string; name: string; email: string } | null;
  publishedAt: string;
  updatedAt?: string;
  viewCount: number;
  sources?: ArticleSource[]; // NEW
};

export type ArticleItem = {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  badge?: string;
  date: string; // ISO
  views: number;
  imageUrl?: string | null;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

/* ---------- API RESPONSE SHAPE (new) ---------- */
type ApiArticle = {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  imageUrl?: string | null;
  imagePath?: string | null;
  status: string; // "PUBLISHED" | "DRAFT" | ...
  authorId: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  publishedAt: string; // ISO
  viewCount: number;
  author?: { id: string; name: string; email: string };
};

type ApiResponse = {
  items: ApiArticle[];
  total: number;
  page: number;
  limit: number;
};
/* ---------------------------------------------- */

/* --------- MOCK: paste your API sample -------- */
const MOCK_API: ApiResponse = {
  items: [
    {
      id: "d792dfbc-7ac4-4426-a15e-e85ffccf9973",
      title: "Šta je fikh i ko je fakih?",
      subtitle: "",
      slug: "sta-je-fikh-i-ko-je-fakih",
      excerpt: null,
      content: "…",
      category: "Fikh",
      imageUrl:
        "https://kndmqzbgejnjmurzfiod.supabase.co/storage/v1/object/public/articles/d792dfbc-7ac4-4426-a15e-e85ffccf9973/1755707112757-picture2png",
      imagePath:
        "d792dfbc-7ac4-4426-a15e-e85ffccf9973/1755707112757-picture2png",
      status: "PUBLISHED",
      authorId: "656a53f9-0283-46d3-849f-d9d6b3a4bf92",
      createdAt: "2025-08-20T16:18:54.122Z",
      updatedAt: "2025-08-20T16:25:27.619Z",
      publishedAt: "2025-08-20T16:18:54.120Z",
      viewCount: 0,
      author: {
        id: "656a53f9-0283-46d3-849f-d9d6b3a4bf92",
        name: "Admin",
        email: "admin@example.com",
      },
    },
  ],
  total: 1,
  page: 1,
  limit: 10,
};
/* ---------------------------------------------- */

function mapToItem(a: ApiArticle): ArticleItem {
  return {
    id: a.id,
    title: a.title,
    excerpt: a.excerpt ?? (a.subtitle && a.subtitle.trim() ? a.subtitle : null),
    slug: a.slug,
    badge: a.status?.toUpperCase() === "PUBLISHED" ? "Objava" : undefined,
    date: a.publishedAt ?? a.createdAt,
    views: a.viewCount ?? 0,
  };
}

function sortItems(items: ArticleItem[], sort: SortKey): ArticleItem[] {
  switch (sort) {
    case "popularno":
      return [...items].sort((a, b) => b.views - a.views);
    case "az":
      return [...items].sort((a, b) => a.title.localeCompare(b.title, "bs"));
    case "novo":
    default:
      return [...items].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }
}

export async function fetchCategoryArticles(opts: {
  slug: string;
  page?: number;
  perPage?: number;
  sort?: SortKey;
}): Promise<Paginated<ArticleItem>> {
  const { page = 1, perPage, sort = "novo" } = opts;

  /* -------- REAL API CALL (commented for now) ----------
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
  const url = new URL(`${API_URL}/articles`);
  url.searchParams.set("category", opts.slug);
  url.searchParams.set("page", String(page));
  // If your API uses "limit" for page size:
  if (perPage) url.searchParams.set("limit", String(perPage));
  // If your API supports sort:
  url.searchParams.set("sort", sort);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const apiData = (await res.json()) as ApiResponse;
  ------------------------------------------------------ */

  // ----- MOCK using your new shape -----
  const apiData: ApiResponse = MOCK_API;
  // ------------------------------------

  const normalizedPerPage = perPage ?? apiData.limit;
  const totalPages = Math.max(1, Math.ceil(apiData.total / normalizedPerPage));

  const mapped = apiData.items.map(mapToItem);
  const sorted = sortItems(mapped, sort);

  // If API already respects page/limit, you can skip slicing.
  // We'll keep it in case you change perPage locally:
  const start = (page - 1) * normalizedPerPage;
  const sliced = sorted.slice(start, start + normalizedPerPage);

  return {
    items: sliced,
    page: apiData.page,
    perPage: normalizedPerPage,
    total: apiData.total,
    totalPages,
  };
}

export async function fetchArticleBySlug(
  slug: string
): Promise<ArticleDetail | null> {
  // ---- REAL API (commented for now) ----
  // const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
  // const res = await fetch(`${API_URL}/articles/${slug}`, { cache: "no-store" });
  // if (res.status === 404) return null;
  // if (!res.ok) throw new Error(`API ${res.status}`);
  // const a = await res.json();
  // return a as ArticleDetail;

  // MOCK from your sample list (expand as needed)
  const a = {
    id: "d792dfbc-7ac4-4426-a15e-e85ffccf9973",
    title: "Šta je fikh i ko je fakih?",
    subtitle: "",
    slug: "sta-je-fikh-i-ko-je-fakih",
    excerpt: null,
    content: `<p>Svaki punoljetan čovjek je odgovoran za svako svoje djelo, i svako njegovo djelo podliježe naročitim vjerskim propisima i presudama. Nauka koja nas uči kakvu presudu treba izreći za pojedina ljudska djela zove se "fikh". Onaj ko se bavi tom naukom zove se "fakih". <br/> <br/> Prema tome, "fikh" je nauka koja pretresa sve postupke punoljetnih ljudi sa islamskog gledišta i određuje da li se neko djelo po vjerskim propisima mora ili ne mora, smije ili ne smije činiti, da li ga je slobodno činiti, ili da li je neko djelo pohvalno ili ružno činiti. 
<br/><br/><em>Ebu Hanife</em> o "fikhu" je rekao: "To je nauka kroz koju čovjek spoznaje svoja (vjerska) prava i  obaveze."
<br/><em>Allah</em> u Kur'anu o "fikhu" kaže: "Svi vjernici ne trebaju ići u boj. Neka se po nekoliko njih iz svake zajednice njihove potrudi da se upute u vjerske nauke (fikh) i neka opominju narod svoj kad mu se vrate, da bi se Allaha pobojali." (Et-Tevbe 122)
<br/><em>Muhammed, a. s.,</em> o "fikhu" je rekao: "Kome Allah, dž. š., želi dobro, poduči ga vjeri (fikh)." <em>(Buharija i Muslim)</em> </p>
`,
    category: "Fikh",
    imageUrl:
      "https://kndmqzbgejnjmurzfiod.supabase.co/storage/v1/object/public/articles/d792dfbc-7ac4-4426-a15e-e85ffccf9973/1755707112757-picture2png",
    status: "PUBLISHED",
    author: { id: "656a5...", name: "Admin", email: "admin@example.com" },
    publishedAt: "2025-08-20T16:18:54.120Z",
    updatedAt: "2025-08-20T16:25:27.619Z", // NEW
    viewCount: 0,
    sources: [
      { label: "Et-Tevbe, 122", cite: "Kur'an, 9:122" },
      { label: "Buharija i Muslim", cite: "Hadis: “Kome Allah želi dobro…”" },
    ], // NEW
  } satisfies ArticleDetail;

  return slug === a.slug ? a : null;
}

export async function fetchRelatedArticles(opts: {
  category: string;
  excludeSlug: string;
  limit?: number;
  sort?: SortKey;
}): Promise<ArticleItem[]> {
  const { category, excludeSlug, limit = 6, sort = "novo" } = opts;

  /* ---- REAL API (comment out until ready) ----
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
  const url = new URL(`${API_URL}/articles/related`);
  url.searchParams.set("category", category);
  url.searchParams.set("exclude", excludeSlug);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("sort", sort);
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = (await res.json()) as ApiArticle[];
  return sortItems(data.map(mapToItem), sort).slice(0, limit);
  ---------------------------------------------- */

  // MOCK pool (expand as you like)
  const MOCK_POOL: ApiArticle[] = [
    {
      id: "r1",
      title: "Zaborav u namazu: sehvi-sedžda u praksi",
      subtitle: "Kratki vodič",
      slug: "zaborav-u-namazu",
      excerpt: "Propisi i scenariji zaborava u namazu prema hanefijama.",
      content: "…",
      category: "Fikh",
      imageUrl: null,
      imagePath: null,
      status: "PUBLISHED",
      authorId: "u1",
      createdAt: "2025-08-10T00:00:00.000Z",
      updatedAt: "2025-08-10T00:00:00.000Z",
      publishedAt: "2025-08-10T00:00:00.000Z",
      viewCount: 245,
      author: { id: "u1", name: "Admin", email: "admin@example.com" },
    },
    {
      id: "r2",
      title: "Skraćivanje namaza na putu (qasr): uslovi i primjeri",
      subtitle: "",
      slug: "skracivanje-namaza-na-putu",
      excerpt: "Kada i kako se skraćuje namaz tokom putovanja.",
      content: "…",
      category: "Fikh",
      imageUrl: null,
      imagePath: null,
      status: "PUBLISHED",
      authorId: "u1",
      createdAt: "2025-08-12T00:00:00.000Z",
      updatedAt: "2025-08-12T00:00:00.000Z",
      publishedAt: "2025-08-12T00:00:00.000Z",
      viewCount: 601,
      author: { id: "u1", name: "Admin", email: "admin@example.com" },
    },
    {
      id: "r3",
      title: "Spajanje namaza (džemʿ) na putu: stav hanefija",
      subtitle: "",
      slug: "spajanje-namaza-na-putu",
      excerpt: "U kojim slučajevima se spajanje razmatra i kako postupiti.",
      content: "…",
      category: "Fikh",
      imageUrl: null,
      imagePath: null,
      status: "PUBLISHED",
      authorId: "u1",
      createdAt: "2025-07-28T00:00:00.000Z",
      updatedAt: "2025-07-28T00:00:00.000Z",
      publishedAt: "2025-07-28T00:00:00.000Z",
      viewCount: 389,
      author: { id: "u1", name: "Admin", email: "admin@example.com" },
    },
    {
      id: "r4",
      title: "Ajeti o zakatu: tematsko čitanje",
      subtitle: "",
      slug: "ajeti-o-zakatu",
      excerpt: "Ključni ajeti i praktične implikacije.",
      content: "…",
      category: "Kur'an",
      imageUrl: null,
      imagePath: null,
      status: "PUBLISHED",
      authorId: "u1",
      createdAt: "2025-08-05T00:00:00.000Z",
      updatedAt: "2025-08-05T00:00:00.000Z",
      publishedAt: "2025-08-05T00:00:00.000Z",
      viewCount: 120,
      author: { id: "u1", name: "Admin", email: "admin@example.com" },
    },
  ];

  const sameCat = MOCK_POOL.filter(
    (a) => a.category === category && a.slug !== excludeSlug
  );
  const mapped = sameCat.map(mapToItem);
  return sortItems(mapped, sort).slice(0, limit);
}

// lib/api.ts (append at bottom)
export async function searchArticles(opts: {
  q: string;
  page?: number;
  perPage?: number;
}): Promise<Paginated<ArticleItem>> {
  const { q, page = 1, perPage = 12 } = opts;

  // --- REAL API (commented for now) ---
  // const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
  // const url = new URL(`${API_URL}/articles/search`);
  // url.searchParams.set("q", q);
  // url.searchParams.set("page", String(page));
  // url.searchParams.set("limit", String(perPage));
  // const res = await fetch(url.toString(), { cache: "no-store" });
  // if (!res.ok) throw new Error(`API ${res.status}`);
  // const apiData = (await res.json()) as { items: ApiArticle[]; total: number; page: number; limit: number };

  // --- MOCK using existing items pool (search in title/excerpt) ---
  const pool: ArticleItem[] = (MOCK_API.items ?? []).map(mapToItem);
  const needle = q.trim().toLowerCase();
  const filtered = needle
    ? pool.filter(
        (it) =>
          it.title.toLowerCase().includes(needle) ||
          (it.excerpt ?? "").toLowerCase().includes(needle)
      )
    : [];
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const items = filtered.slice(start, start + perPage);

  return { items, page, perPage, total, totalPages };
}

// lib/api.ts
export type SimpleArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  imageUrl?: string | null;
  category: string;
  publishedAt: string;
  viewCount: number;
};

export type SimpleCategory = {
  slug: string;
  title: string;
  blurb: string;
  img?: string | null;
  accent?: "indigo" | "amber";
  count: number;
};

// REAL API (uncomment when ready)
// const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

async function fetchList(
  sort: "latest" | "popular",
  limit = 4
): Promise<SimpleArticle[]> {
  // --- REAL CALL ---
  // const url = new URL(`${API_URL}/articles`);
  // url.searchParams.set("page", "1");
  // url.searchParams.set("limit", String(limit));
  // url.searchParams.set("sort", sort === "popular" ? "popular" : "latest");
  // const res = await fetch(url.toString(), { cache: "no-store" });
  // if (!res.ok) throw new Error(`API ${res.status}`);
  // const data = (await res.json()) as {
  //   items: {
  //     id: string; title: string; slug: string; excerpt?: string | null;
  //     imageUrl?: string | null; publishedAt: string; viewCount?: number;
  //   }[];
  // };
  // return data.items.map(it => ({
  //   id: it.id, title: it.title, slug: it.slug,
  //   excerpt: it.excerpt ?? null, imageUrl: it.imageUrl ?? null,
  //   date: it.publishedAt, views: it.viewCount ?? 0
  // }));

  // --- MOCK (reuses whatever you already have in MOCK_API) ---
  const MOCK_API = {
    items: [
      {
        id: "d792dfbc-7ac4-4426-a15e-e85ffccf9973",
        title: "Šta je fikh i ko je fakih?",
        slug: "sta-je-fikh-i-ko-je-fakih",
        excerpt: "Uvod u pojam fikha i ulogu fakiha — sa klasičnim izvorima.",
        imageUrl: "/images/discover/discovercardbg1.png",
        publishedAt: "2025-08-20T16:18:54.120Z",
        viewCount: 1234,
        category: "Sunnet",
      },
      {
        id: "d792dfbc-7ac4-4426-a15e-e85ffccf9973",
        title: "Šta je fikh i ko je fakih?",
        slug: "sta-je-fikh-i-ko-je-fakih",
        excerpt: "Uvod u pojam fikha i ulogu fakiha — sa klasičnim izvorima.",
        imageUrl: "/images/discover/discovercardbg1.png",
        publishedAt: "2025-08-20T16:18:54.120Z",
        viewCount: 1234,
        category: "Sunnet",
      },
      {
        id: "d792dfbc-7ac4-4426-a15e-e85ffccf9973",
        title: "Šta je fikh i ko je fakih?",
        slug: "sta-je-fikh-i-ko-je-fakih",
        excerpt: "Uvod u pojam fikha i ulogu fakiha — sa klasičnim izvorima.",
        imageUrl: "/images/discover/discovercardbg1.png",
        publishedAt: "2025-08-20T16:18:54.120Z",
        viewCount: 1234,
        category: "Sunnet",
      },
      {
        id: "d792dfbc-7ac4-4426-a15e-e85ffccf9973",
        title: "Šta je fikh i ko je fakih?",
        slug: "sta-je-fikh-i-ko-je-fakih",
        excerpt: "Uvod u pojam fikha i ulogu fakiha — sa klasičnim izvorima.",
        imageUrl: "/images/discover/discovercardbg1.png",
        publishedAt: "2025-08-20T16:18:54.120Z",
        viewCount: 1234,
        category: "Sunnet",
      },
      // ...add a few more mock items so you see 4+ cards
    ],
  };

  const src = MOCK_API.items.slice(0, limit);
  return src.map((it) => ({
    id: it.id,
    title: it.title,
    slug: it.slug,
    excerpt: it.excerpt ?? null,
    imageUrl: it.imageUrl ?? null,
    category: it.category ?? "",
    publishedAt: it.publishedAt,
    viewCount: it.viewCount ?? 0,
  }));
}

export async function getLatestArticles(limit = 4) {
  return fetchList("latest", limit);
}
export async function getPopularArticles(limit = 4) {
  return fetchList("popular", limit);
}

export async function fetchCategories(): Promise<SimpleCategory[]> {
  // --- REAL CALL ---
  // const res = await fetch(`${API_BASE}/categories`, { cache: "no-store" });
  // const data = await res.json();
  // return data.items;

  // --- MOCK ---
  return [
    {
      slug: "kuran",
      title: "Kur'an",
      blurb: "Ajete, tefsiri i učenje Kur’ana u praksi.",
      img: "/images/discover/categoriesbg3.png",
      accent: "indigo",
      count: 12,
    },
    {
      slug: "sunnet",
      title: "Sunnet",
      blurb: "Hadisi, primjeri i naslijeđe Poslanika, a.s.",
      img: "/images/discover/discovercardbg2.png",
      accent: "amber",
      count: 9,
    },
    {
      slug: "akida",
      title: "Akida",
      blurb: "Temelji vjerovanja i odgovori na nedoumice.",
      img: "/images/discover/discovercardbg4.png",
      accent: "indigo",
      count: 7,
    },
    {
      slug: "fikh",
      title: "Fikh",
      blurb: "Praktični propisi — ibadeti i transakcije.",
      img: "/images/discover/categoriesbg1.png",
      accent: "indigo",
      count: 18,
    },
    {
      slug: "pobijanja",
      title: "Pobijanja",
      blurb: "Umjerena razjašnjenja i odgovori bez polemike.",
      img: "/images/discover/discovercardbg1.png",
      accent: "amber",
      count: 5,
    },
  ];
}

export async function fetchArticles({
  q = "",
  category = "",
  sort = "latest", // "latest" | "popular"
  page = 1,
  limit = 24,
}: {
  q?: string;
  category?: string;
  sort?: "latest" | "popular";
  page?: number;
  limit?: number;
}): Promise<{
  items: SimpleArticle[];
  total: number;
  page: number;
  limit: number;
}> {
  // --- REAL CALL ---
  // const url = new URL(`${API_BASE}/articles`);
  // url.searchParams.set("page", String(page));
  // url.searchParams.set("limit", String(limit));
  // if (q) url.searchParams.set("q", q);
  // if (category) url.searchParams.set("category", category);
  // url.searchParams.set("sort", sort === "popular" ? "popular" : "latest");
  // const res = await fetch(url, { cache: "no-store" });
  // if (!res.ok) throw new Error(`API ${res.status}`);
  // const data = await res.json();
  // return {
  //   items: data.items.map((it: any) => ({
  //     id: it.id, title: it.title, slug: it.slug,
  //     excerpt: it.excerpt ?? null, imageUrl: it.imageUrl ?? null,
  //     category: it.category, publishedAt: it.publishedAt, viewCount: it.viewCount ?? 0,
  //   })),
  //   total: data.total, page: data.page, limit: data.limit
  // };

  // --- MOCK (expand with more items as you like) ---
  const MOCK: SimpleArticle[] = [
    {
      id: "a1",
      title: "Šta je fikh i ko je fakih?",
      slug: "sta-je-fikh-i-ko-je-fakih",
      excerpt: "Uvod u pojam fikha i ulogu fakiha — sa klasičnim izvorima.",
      imageUrl:
        "https://kndmqzbgejnjmurzfiod.supabase.co/storage/v1/object/public/articles/d792dfbc-7ac4-4426-a15e-e85ffccf9973/1755707112757-picture2png",
      category: "Fikh",
      publishedAt: "2025-08-20T16:18:54.120Z",
      viewCount: 1234,
    },
    // ...add more to see grid
  ];

  let items = MOCK;
  if (q)
    items = items.filter((i) =>
      (i.title + " " + (i.excerpt ?? ""))
        .toLowerCase()
        .includes(q.toLowerCase())
    );
  if (category)
    items = items.filter(
      (i) => i.category.toLowerCase() === category.toLowerCase()
    );
  if (sort === "popular")
    items = [...items].sort((a, b) => b.viewCount - a.viewCount);
  else
    items = [...items].sort(
      (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
    );

  return { items: items.slice(0, limit), total: items.length, page, limit };
}

export type SimpleQuestion = {
  id: string;
  title: string;
  slug: string;
  category: string;
  views: number;
  answersCount: number;
  hasAccepted: boolean;
  askedAt: string;
  askedBy?: { name: string } | null;
  excerpt?: string | null; // short body preview or accepted answer preview
};

export async function fetchQuestions({
  q = "",
  category = "",
  status = "all", // "all" | "unanswered" | "answered"
  sort = "latest", // "latest" | "popular"
  page = 1,
  limit = 20,
}: {
  q?: string;
  category?: string;
  status?: "all" | "unanswered" | "answered";
  sort?: "latest" | "popular";
  page?: number;
  limit?: number;
}): Promise<{
  items: SimpleQuestion[];
  total: number;
  page: number;
  limit: number;
}> {
  // --- MOCK ---
  const MOCK: SimpleQuestion[] = [
    {
      id: "q1",
      title: "Može li se spajati namaz u hanefijskom mezhebu na putu?",
      slug: "spajanje-namaza-na-putu",
      category: "Fikh",
      views: 4321,
      answersCount: 3,
      hasAccepted: true,
      askedAt: "2025-08-19T10:00:00.000Z",
      askedBy: { name: "Amar" },
      excerpt: "Kratko: hanefije ne spajaju realno, već zbirno (džem'u suri)…",
    },
    {
      id: "q2",
      title: "Da li je dozvoljeno učenje Kur'ana bez abdesta?",
      slug: "ucenje-kurana-bez-abdesta",
      category: "Kur'an",
      views: 980,
      answersCount: 0,
      hasAccepted: false,
      askedAt: "2025-08-26T18:12:00.000Z",
      askedBy: { name: "Sara" },
      excerpt: "Imam pitanje oko dodira mushafa i samog učenja napamet…",
    },
  ];

  let items = MOCK;
  if (q)
    items = items.filter((i) =>
      (i.title + " " + (i.excerpt ?? ""))
        .toLowerCase()
        .includes(q.toLowerCase())
    );
  if (category)
    items = items.filter(
      (i) => i.category.toLowerCase() === category.toLowerCase()
    );
  if (status === "unanswered")
    items = items.filter((i) => i.answersCount === 0);
  if (status === "answered") items = items.filter((i) => i.answersCount > 0);
  if (sort === "popular") items = [...items].sort((a, b) => b.views - a.views);
  else
    items = [...items].sort(
      (a, b) => +new Date(b.askedAt) - +new Date(a.askedAt)
    );

  return { items: items.slice(0, limit), total: items.length, page, limit };
}
