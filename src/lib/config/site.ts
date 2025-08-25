// src/lib/config/site.ts
export const site = {
  name: "Hanefijski Fikh",
  description:
    "Članci i odgovori iz hanefijske jurisprudencije — jasno, provjereno i pristupačno.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-placeholder.png",
};
