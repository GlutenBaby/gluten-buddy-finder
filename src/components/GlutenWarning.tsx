import { AlertTriangle } from "lucide-react";

/** Shown wherever results are displayed: the AI and the catalog can be wrong. */
export function GlutenWarning() {
  return (
    <div
      role="note"
      className="flex gap-2 rounded-2xl border border-border bg-card/80 p-3 text-xs leading-relaxed text-foreground"
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
      <p>
        <strong>Controlla sempre l'etichetta.</strong> I risultati sono generati
        con l'intelligenza artificiale e i prodotti arrivano da fonti terze:
        possono esserci errori. Non è un parere medico.
      </p>
    </div>
  );
}
