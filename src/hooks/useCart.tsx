import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { vendorFromUrl } from "@/lib/vendor";

export interface CartItem {
  id: string;
  name: string;
  image_url: string | null;
  product_url: string;
  vendor: string;
}

interface CartContextValue {
  items: CartItem[];
  has: (id: string) => boolean;
  add: (product: Omit<CartItem, "vendor">) => void;
  remove: (id: string) => void;
  clearVendor: (vendor: string) => void;
}

const STORAGE_KEY = "gb_cart";

const CartContext = createContext<CartContextValue | null>(null);

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Shopping list kept on the device, so it also works for guests. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable: the cart simply lasts for this visit
    }
  }, [items]);

  const add = useCallback((product: Omit<CartItem, "vendor">) => {
    setItems((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev
        : [
            ...prev,
            {
              id: product.id,
              name: product.name,
              image_url: product.image_url,
              product_url: product.product_url,
              vendor: vendorFromUrl(product.product_url),
            },
          ],
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearVendor = useCallback((vendor: string) => {
    setItems((prev) => prev.filter((i) => i.vendor !== vendor));
  }, []);

  const value = useMemo(
    () => ({
      items,
      has: (id: string) => items.some((i) => i.id === id),
      add,
      remove,
      clearVendor,
    }),
    [items, add, remove, clearVendor],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
