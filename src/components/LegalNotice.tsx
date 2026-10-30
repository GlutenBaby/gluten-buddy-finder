import { Link } from "react-router-dom";

export const PRIVACY_URL = "https://glutenbaby.github.io/gluten-buddy-finder/";

/** Shown under the sign-up button so users see what they accept. */
export function LegalNotice({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <p className="text-center text-xs leading-relaxed text-muted-foreground">
      Creando un account accetti i{" "}
      <Link to="/termini" onClick={onNavigate} className="underline">
        Termini e Condizioni
      </Link>{" "}
      e dichiari di aver letto l'
      <a
        href={PRIVACY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        Informativa sulla Privacy
      </a>
      .
    </p>
  );
}
