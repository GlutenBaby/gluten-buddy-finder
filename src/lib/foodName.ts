// Nomi di cibi mostrati all'utente (piatto, ingredienti, categorie).
// In italiano le parole straniere sono invariabili al plurale:
// "i cracker", non "i crackers".
const INVARIABLE_PLURALS: [RegExp, string][] = [
  [/\bcrackers\b/gi, "cracker"],
  [/\bsnacks\b/gi, "snack"],
  [/\bcookies\b/gi, "cookie"],
  [/\bmuffins\b/gi, "muffin"],
  [/\bwafers\b/gi, "wafer"],
  [/\bchips\b/gi, "chips"],
];

export function formatFoodName(name: string | null | undefined): string {
  let s = (name ?? "").trim();
  for (const [re, fix] of INVARIABLE_PLURALS) {
    s = s.replace(re, (m) => (m[0] === m[0].toUpperCase() ? fix[0].toUpperCase() + fix.slice(1) : fix));
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}
