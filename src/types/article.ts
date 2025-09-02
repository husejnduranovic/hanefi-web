export type Author = { id: string; name: string; email: string };
export type ArticleBE = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  imageUrl: string | null;
  imagePath?: string | null;
  status: "PUBLISHED" | "DRAFT";
  authorId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  viewCount: number;
  author: Author;
};
