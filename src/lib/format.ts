export function estimateReadingMins(text: string, wpm = 220) {
  const words = text?.trim()?.split(/\s+/g)?.length ?? 0;
  return Math.max(1, Math.round(words / wpm));
}
export function formatDateISO(iso: string, locale = "bs-BA") {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
