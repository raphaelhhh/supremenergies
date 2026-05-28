import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "supreme_exit_intent_seen_v1";
const SHOW_AFTER_MS = 15000; // fallback mobile : si pas de mouseleave après 15s

/**
 * Popup exit-intent : se déclenche quand le curseur quitte la fenêtre par le haut
 * (intention de fermer l'onglet) OU après 15s sur mobile. Affiché 1 fois par 7 jours.
 * Push le visiteur vers le simulateur d'aides → capture lead.
 */
const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Ne pas afficher sur ces routes (déjà en conversion)
  const blockedRoutes = ["/simulateur-aides", "/devis-gratuit", "/contact"];
  const isBlocked = blockedRoutes.some((r) => location.pathname.startsWith(r));

  useEffect(() => {
    if (isBlocked) return;

    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (seen) {
        const ts = parseInt(seen, 10);
        if (Date.now() - ts < 7 * 24 * 60 * 60 * 1000) return;
      }
    } catch {
      // ignore
    }

    let shown = false;
    const trigger = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
      try {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {
        // ignore
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    document.addEventListener("mouseleave", onMouseLeave);
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const timer = isMobile ? window.setTimeout(trigger, SHOW_AFTER_MS) : null;

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      if (timer) window.clearTimeout(timer);
    };
  }, [isBlocked, location.pathname]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Fermer"
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="bg-gradient-to-br from-supreme-primary to-supreme-primary/85 text-white px-6 py-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={20} className="text-supreme-accent" />
            <span className="text-xs uppercase tracking-wider font-semibold text-white/90">
              Avant de partir
            </span>
          </div>
          <h2 id="exit-intent-title" className="text-2xl font-bold leading-tight">
            Estimez vos aides 2026 en 2 minutes
          </h2>
        </div>

        <div className="px-6 py-6">
          <p className="text-gray-700 mb-4">
            Découvrez combien vous pouvez toucher en aides{" "}
            <strong>MaPrimeRénov' + CEE</strong> pour votre projet. Calcul personnalisé selon
            le barème officiel ANAH — sans engagement.
          </p>
          <ul className="space-y-1.5 mb-5 text-sm text-gray-700">
            <li>✓ Jusqu'à <strong>11 000 €</strong> d'aides</li>
            <li>✓ Résultat immédiat</li>
            <li>✓ Aucune carte bancaire requise</li>
          </ul>
          <Button asChild className="w-full bg-supreme-accent hover:bg-supreme-accent/90 text-white py-6 text-base">
            <Link to="/simulateur-aides" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2">
              Calculer mes aides gratuitement <ArrowRight size={18} />
            </Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="block mx-auto mt-3 text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Non merci, je continue ma visite
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
