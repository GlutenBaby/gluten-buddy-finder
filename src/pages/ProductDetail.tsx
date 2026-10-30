import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ExternalLink, ImageOff, Loader2, ShoppingCart } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { GlutenWarning } from "@/components/GlutenWarning";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/useCart";
import { trackEvent } from "@/lib/analytics";
import { vendorFilter, vendorFromUrl } from "@/lib/vendor";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  brand: string | null;
  image_url: string | null;
  product_url: string;
}

const PAGE_SIZE = 24;

function CartButton({ product, small }: { product: Product; small?: boolean }) {
  const { has, add, remove } = useCart();
  const inCart = has(product.id);
  const Icon = inCart ? Check : ShoppingCart;
  return (
    <button
      type="button"
      onClick={() => (inCart ? remove(product.id) : add(product))}
      className={cn(
        "flex w-full items-center justify-center gap-1.5 rounded-full font-medium transition active:scale-[0.98]",
        small ? "px-3 py-1.5 text-[11px]" : "px-4 py-3 text-sm",
        inCart
          ? "border border-primary bg-card text-primary"
          : "bg-primary text-primary-foreground",
      )}
    >
      <Icon className={small ? "h-3 w-3" : "h-4 w-4"} />
      {inCart ? "Nel carrello" : "Aggiungi al carrello"}
    </button>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [others, setOthers] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loadingOthers, setLoadingOthers] = useState(false);
  const [brokenIds, setBrokenIds] = useState<Set<string>>(new Set());

  const vendor = product ? vendorFromUrl(product.product_url) : "";

  useEffect(() => {
    let cancelled = false;
    window.scrollTo(0, 0);
    setLoading(true);
    setOthers([]);
    setPage(0);
    void supabase
      .from("products")
      .select("id, name, brand, image_url, product_url")
      .eq("id", id ?? "")
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        setProduct(data);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!product || !vendor) return;
    let cancelled = false;
    setLoadingOthers(true);
    void supabase
      .from("products")
      .select("id, name, brand, image_url, product_url")
      .or(vendorFilter(vendor))
      .neq("id", product.id)
      .not("image_url", "is", null)
      .neq("image_url", "")
      .order("name", { ascending: true })
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)
      .then(({ data }) => {
        if (cancelled) return;
        const items = data ?? [];
        setOthers((prev) => (page === 0 ? items : [...prev, ...items]));
        setHasMore(items.length === PAGE_SIZE);
        setLoadingOthers(false);
      });
    return () => {
      cancelled = true;
    };
  }, [product, vendor, page]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (!product) {
    return (
      <AppLayout>
        <p className="py-12 text-center text-sm text-muted-foreground">
          Prodotto non trovato.
        </p>
      </AppLayout>
    );
  }

  const visibleOthers = others.filter((p) => !brokenIds.has(p.id));

  return (
    <AppLayout>
      <div className="space-y-5">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="aspect-square bg-secondary">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-muted-foreground">
                <ImageOff className="h-8 w-8" />
              </div>
            )}
          </div>
          <div className="space-y-3 p-4">
            <div>
              {product.brand && (
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {product.brand}
                </p>
              )}
              <h1 className="text-lg font-semibold leading-snug text-foreground">
                {product.name}
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Venduto da {vendor}
              </p>
            </div>
            <CartButton product={product} />
            <a
              href={product.product_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent(
                  "product_click",
                  { name: product.name, brand: product.brand },
                  product.id,
                )
              }
              className="flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-3 text-sm font-medium text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              Vai al sito del venditore
            </a>
          </div>
        </div>

        <GlutenWarning />

        {visibleOthers.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-foreground">
              Altri prodotti di {vendor}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {visibleOthers.map((p) => (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  <Link to={`/prodotto/${p.id}`} className="block">
                    <div className="aspect-square bg-secondary">
                      <img
                        src={p.image_url ?? ""}
                        alt={p.name}
                        loading="lazy"
                        onError={() =>
                          setBrokenIds((s) => new Set(s).add(p.id))
                        }
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <p className="line-clamp-2 px-3 pt-3 text-xs font-medium leading-tight text-foreground">
                      {p.name}
                    </p>
                  </Link>
                  <div className="p-3">
                    <CartButton product={p} small />
                  </div>
                </div>
              ))}
            </div>
            {hasMore && (
              <button
                type="button"
                onClick={() => setPage((n) => n + 1)}
                disabled={loadingOthers}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card/60 py-3 text-sm font-medium text-foreground disabled:opacity-50"
              >
                {loadingOthers && <Loader2 className="h-4 w-4 animate-spin" />}
                Carica altri prodotti
              </button>
            )}
          </section>
        )}
      </div>
    </AppLayout>
  );
}
