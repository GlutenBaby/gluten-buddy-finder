import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ImageOff, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { GlutenWarning } from "@/components/GlutenWarning";
import { CartItem, useCart } from "@/hooks/useCart";

export default function Cart() {
  const { items, remove, clearVendor } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const groups = useMemo(() => {
    const byVendor = new Map<string, CartItem[]>();
    for (const item of items) {
      byVendor.set(item.vendor, [...(byVendor.get(item.vendor) ?? []), item]);
    }
    return [...byVendor.entries()];
  }, [items]);

  return (
    <AppLayout title="Carrello">
      <div className="space-y-5">
        <div className="pt-2">
          <h1 className="text-3xl font-medium leading-tight tracking-tight text-foreground">
            Carrello
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            I tuoi prodotti, divisi per venditore
          </p>
        </div>

        {groups.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
            <p className="text-sm font-medium text-foreground">
              Il carrello è vuoto
            </p>
            <Link to="/sfoglia" className="mt-1 block text-xs text-primary underline">
              Sfoglia il catalogo
            </Link>
          </div>
        ) : (
          <>
            <p className="rounded-2xl border border-border bg-card/80 p-3 text-xs leading-relaxed text-foreground">
              <strong>Gluten Baby non vende i prodotti.</strong> Per comprarli
              apri ogni prodotto e completa l'acquisto sul sito del venditore.
              Prezzi e disponibilità sono indicati lì.
            </p>
            <GlutenWarning />

            {groups.map(([vendor, vendorItems]) => (
              <section key={vendor} className="space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="truncate text-base font-semibold text-foreground">
                    {vendor}
                  </h2>
                  <button
                    type="button"
                    onClick={() => clearVendor(vendor)}
                    className="flex-shrink-0 text-xs text-muted-foreground underline"
                  >
                    Svuota
                  </button>
                </div>

                <div className="space-y-2">
                  {vendorItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-2 shadow-sm"
                    >
                      <Link
                        to={`/prodotto/${item.id}`}
                        className="flex min-w-0 flex-1 items-center gap-3"
                      >
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              loading="lazy"
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <div className="grid h-full w-full place-items-center text-muted-foreground">
                              <ImageOff className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <p className="line-clamp-2 text-xs font-medium leading-tight text-foreground">
                          {item.name}
                        </p>
                      </Link>
                      <a
                        href={item.product_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Apri ${item.name} sul sito del venditore`}
                        className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        aria-label={`Rimuovi ${item.name}`}
                        className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-muted-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/prodotto/${vendorItems[0].id}`}
                  className="block text-center text-xs text-primary underline"
                >
                  Aggiungi altri prodotti di {vendor}
                </Link>
              </section>
            ))}
          </>
        )}
      </div>
    </AppLayout>
  );
}
