import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const QUOTE_FORM =
  "/devis-gratuit";

const VARIANTS = [
  {
    id: "a",
    title: "Estimez vos aides en 2 min",
    cta: "Calculer mes aides",
    href: "/simulateur-aides",
    external: false,
  },
  {
    id: "b",
    title: "Devis gratuit sous 48h",
    cta: "Demander mon devis",
    href: QUOTE_FORM,
    external: true,
  },
] as const;

const STORAGE_VARIANT = "sce_scroll_variant";
const STORAGE_DISMISS = "sce_scroll_dismissed";

const trackEvent = (event: string, data: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  if (w.dataLayer) w.dataLayer.push({ event, ...data });
};

const ScrollCTA = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<typeof VARIANTS[number]>(VARIANTS[0]);

  // Allowed paths
  const allowed =
    pathname === "/" ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/services") ||
    pathname.startsWith("/aides-renovation-2026") ||
    pathname.startsWith("/pompe-a-chaleur-2026");

  useEffect(() => {
    if (!allowed) {
      setVisible(false);
      return;
    }
    if (sessionStorage.getItem(STORAGE_DISMISS) === "1") return;

    // Pick (or load) variant
    let v = localStorage.getItem(STORAGE_VARIANT);
    if (v !== "a" && v !== "b") {
      v = Math.random() < 0.5 ? "a" : "b";
      try {
        localStorage.setItem(STORAGE_VARIANT, v);
      } catch {
        // ignore
      }
    }
    setVariant(VARIANTS.find((x) => x.id === v) ?? VARIANTS[0]);

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= 0.5) {
        setVisible(true);
        trackEvent("scroll_cta_view", { variant: v, path: pathname });
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, allowed]);

  if (!visible || !allowed) return null;

  const onClick = () => {
    trackEvent("scroll_cta_click", { variant: variant.id, path: pathname });
  };

  const onDismiss = () => {
    sessionStorage.setItem(STORAGE_DISMISS, "1");
    setVisible(false);
    trackEvent("scroll_cta_dismiss", { variant: variant.id });
  };

  return (
    <div
      className="hidden md:flex fixed bottom-4 right-4 z-30 items-center gap-3 bg-white shadow-2xl border border-supreme-primary/20 rounded-2xl pl-5 pr-2 py-3 max-w-md animate-in slide-in-from-bottom-4"
      role="region"
      aria-label="Promotion rénovation énergétique"
    >
      <div>
        <div className="text-sm font-semibold text-supreme-dark">{variant.title}</div>
        <div className="text-xs text-muted-foreground">
          Jusqu'à 11 000€ d'aides • Sans engagement
        </div>
      </div>
      {variant.external ? (
        <a
          href={variant.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className="bg-supreme-primary hover:bg-supreme-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-lg inline-flex items-center gap-1"
        >
          {variant.cta} <ArrowRight className="h-3.5 w-3.5" />
        </a>
      ) : (
        <Link
          to={variant.href}
          onClick={onClick}
          className="bg-supreme-primary hover:bg-supreme-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-lg inline-flex items-center gap-1"
        >
          {variant.cta} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Fermer"
        className="p-1 text-muted-foreground hover:text-supreme-dark"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ScrollCTA;
