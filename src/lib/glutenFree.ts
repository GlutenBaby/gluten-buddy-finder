// Ingredients that are naturally gluten-free. Used as a safety net on the
// Confirm screen: even if the AI forgets `contains_gluten` (or gets it
// wrong), these are never listed under "Ingredienti con glutine".
// Exact-name match only — "biscotti al burro" is NOT matched by "burro".
const NATURALLY_GLUTEN_FREE = new Set([
  "uova", "uovo", "tuorli", "tuorlo", "albumi", "albume",
  "latte", "panna", "burro", "yogurt", "mascarpone", "ricotta",
  "mozzarella", "parmigiano", "parmigiano reggiano", "grana", "grana padano",
  "pecorino", "pecorino romano", "formaggio", "stracchino", "gorgonzola",
  "cacao", "cacao amaro", "caffè", "caffe", "zucchero", "zucchero a velo",
  "miele", "cioccolato fondente", "nocciole", "mandorle", "noci",
  "pistacchi", "pinoli", "frutta", "frutta secca", "uvetta",
  "carne", "manzo", "maiale", "pollo", "vitello", "guanciale", "pancetta",
  "prosciutto crudo", "pesce", "tonno", "salmone", "gamberi", "vongole",
  "verdure", "pomodoro", "pomodori", "passata di pomodoro", "patate",
  "melanzane", "zucchine", "funghi", "spinaci", "basilico",
  "riso", "mais", "farina di mais", "polenta", "fecola di patate",
  "amido di mais", "legumi", "ceci", "lenticchie", "fagioli",
  "olio", "olio extravergine", "aceto", "limone", "arancia", "vaniglia",
]);

export function isNaturallyGlutenFree(name: string): boolean {
  return NATURALLY_GLUTEN_FREE.has(name.trim().toLowerCase());
}
