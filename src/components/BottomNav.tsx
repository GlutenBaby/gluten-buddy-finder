import { NavLink } from "react-router-dom";
import { Home, LayoutGrid, ShoppingCart, Star, User, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const { isAdmin } = useAuth();
  const { items: cartItems } = useCart();

  const items = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/sfoglia", icon: LayoutGrid, label: "Sfoglia" },
    { to: "/carrello", icon: ShoppingCart, label: "Carrello" },
    { to: "/favorites", icon: Star, label: "Salvati" },
    { to: "/account", icon: User, label: "Account" },
    ...(isAdmin
      ? [{ to: "/admin", icon: Shield, label: "Admin" }]
      : []),
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/70 backdrop-blur-md shadow-soft">
      <ul className="mx-auto flex max-w-lg items-stretch justify-around">
        {items.map((it) => (
          <li key={it.to} className="flex-1">
            <NavLink
              to={it.to}
              end={it.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative flex flex-col items-center gap-1 py-3 text-[11px] font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              <it.icon className="h-[22px] w-[22px]" />
              {it.to === "/carrello" && cartItems.length > 0 && (
                <span className="absolute left-1/2 top-1.5 ml-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                  {cartItems.length}
                </span>
              )}
              <span>{it.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
