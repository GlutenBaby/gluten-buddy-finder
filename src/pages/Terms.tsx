import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { PRIVACY_URL } from "@/components/LegalNotice";

// Operator details (art. 7 D.Lgs. 70/2003). Currently a private individual;
// add the address, and the VAT number once there is one.
const OPERATOR = {
  name: "Camilla Andreolli",
  email: "camilla.andreolli@outlook.it",
};

const LAST_UPDATED = "30 ottobre 2026";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="pt-2">
          <h1 className="text-3xl font-medium leading-tight tracking-tight text-foreground">
            Termini e Condizioni
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ultimo aggiornamento: {LAST_UPDATED}
          </p>
        </div>

        <Section title="1. Chi siamo">
          <p>
            Il sito e l'app Gluten Baby (il "Servizio") sono gestiti da:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>{OPERATOR.name}, persona fisica</li>
            <li>Email: {OPERATOR.email}</li>
          </ul>
          <p>
            Usando il Servizio accetti questi Termini. Se non li accetti, non
            utilizzare il Servizio.
          </p>
        </Section>

        <Section title="2. Il Servizio">
          <p>
            Gluten Baby aiuta a trovare alternative senza glutine: analizza con
            un sistema di intelligenza artificiale le foto di piatti e prodotti,
            e propone prodotti da un catalogo consultabile. L'uso del Servizio è
            gratuito. Alcune funzioni, come i preferiti, richiedono un account.
          </p>
        </Section>

        <Section title="3. Avvertenza importante per la salute">
          <p>
            <strong className="text-foreground">
              Il Servizio ha solo scopo informativo e non è un dispositivo
              medico.
            </strong>{" "}
            Non sostituisce il parere di un medico o di un dietista e non
            garantisce che un alimento sia sicuro per chi ha la celiachia, una
            sensibilità al glutine o altre condizioni.
          </p>
          <p>
            I risultati sono generati automaticamente e possono essere
            incompleti o sbagliati: una foto non permette di conoscere ricetta,
            ingredienti nascosti o contaminazione. Anche le informazioni sui
            prodotti possono essere inesatte o non aggiornate, perché
            provengono da fonti terze e le ricette dei produttori possono
            cambiare.
          </p>
          <p>
            <strong className="text-foreground">
              Prima di consumare un alimento controlla sempre l'etichetta e le
              indicazioni del produttore.
            </strong>{" "}
            In caso di dubbio, non consumarlo.
          </p>
        </Section>

        <Section title="4. Account">
          <p>
            L'account è facoltativo. Per crearlo devi avere almeno 14 anni e
            fornire un indirizzo email valido. Sei responsabile della
            riservatezza della tua password e delle attività svolte con il tuo
            account.
          </p>
          <p>
            Puoi smettere di usare il Servizio in qualsiasi momento e chiedere
            la cancellazione del tuo account scrivendo a {OPERATOR.email}.
          </p>
        </Section>

        <Section title="5. Prodotti e siti di terzi">
          <p>
            Gluten Baby non vende i prodotti presenti nel catalogo. Il pulsante
            "Acquista" porta al sito di un venditore terzo: l'eventuale acquisto
            è un contratto tra te e quel venditore, alle sue condizioni. Prezzi,
            disponibilità, spedizioni, resi e garanzie dipendono esclusivamente
            dal venditore.
          </p>
          <p>
            La presenza di un prodotto nel catalogo non è una garanzia o una
            raccomandazione del prodotto o del venditore. Nomi, marchi e
            immagini appartengono ai rispettivi titolari.
          </p>
          <p>
            Al momento Gluten Baby non riceve commissioni dai venditori. In
            futuro alcuni link potrebbero diventare link di affiliazione: in
            quel caso aggiorneremo questi Termini e lo segnaleremo in modo
            chiaro.
          </p>
        </Section>

        <Section title="6. Uso corretto">
          <p>Usando il Servizio ti impegni a non:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>caricare contenuti illeciti o che violino diritti altrui;</li>
            <li>
              caricare foto di persone o altri contenuti non pertinenti al
              Servizio;
            </li>
            <li>
              copiare il catalogo in modo massivo o automatizzato, o usare il
              Servizio per crearne uno concorrente;
            </li>
            <li>
              ostacolare il funzionamento del Servizio o tentare di accedere a
              dati o aree non autorizzate.
            </li>
          </ul>
          <p>
            Le foto che carichi restano tue. Ci autorizzi a trattarle solo per
            fornirti il Servizio, come descritto nell'Informativa sulla Privacy.
          </p>
          <p>
            Possiamo sospendere o chiudere gli account che violano questi
            Termini.
          </p>
        </Section>

        <Section title="7. Proprietà intellettuale">
          <p>
            Il nome Gluten Baby, il design e i contenuti originali del Servizio
            sono protetti dalla legge e non possono essere riutilizzati senza
            autorizzazione.
          </p>
        </Section>

        <Section title="8. Responsabilità">
          <p>
            Il Servizio è fornito gratuitamente e così com'è. Non garantiamo
            che sia sempre disponibile, privo di errori o adatto alle tue
            esigenze specifiche.
          </p>
          <p>
            Nei limiti consentiti dalla legge, non rispondiamo dei danni
            derivanti dall'uso delle informazioni del Servizio senza le
            verifiche indicate all'articolo 3, né dei prodotti e dei servizi di
            venditori terzi. Restano salvi i casi di dolo o colpa grave, i
            danni alla persona e tutti i diritti che la legge riconosce ai
            consumatori e che non possono essere limitati.
          </p>
        </Section>

        <Section title="9. Modifiche">
          <p>
            Possiamo modificare il Servizio e aggiornare questi Termini. La data
            di aggiornamento è indicata in alto. Se le modifiche sono
            rilevanti, le segnaleremo nel Servizio. Continuando a usarlo dopo
            l'aggiornamento accetti la nuova versione; se non sei d'accordo,
            puoi smettere di usarlo e chiedere la cancellazione del tuo account.
          </p>
        </Section>

        <Section title="10. Dati personali">
          <p>
            Il trattamento dei tuoi dati è descritto nell'
            <a
              href={PRIVACY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Informativa sulla Privacy
            </a>
            .
          </p>
        </Section>

        <Section title="11. Legge applicabile e foro competente">
          <p>
            Questi Termini sono regolati dalla legge italiana. Per le
            controversie con un consumatore è competente il foro del luogo in
            cui il consumatore risiede o è domiciliato, se si trova in Italia.
            Restano salve le norme inderogabili del Paese di residenza del
            consumatore.
          </p>
        </Section>

        <Section title="12. Contatti">
          <p>Per domande su questi Termini scrivi a {OPERATOR.email}.</p>
        </Section>

        <Link to="/" className="block text-sm text-primary underline">
          Torna alla home
        </Link>
      </div>
    </AppLayout>
  );
}
