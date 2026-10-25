import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import {
  STORAGE_KEY,
  isConsentRequiredRegion,
  persistConsentChoice,
} from "@/lib/consent";
import { loadGoogleAds } from "@/lib/google-ads";

/**
 * Bannière de consentement cookies, affichée uniquement dans les régions
 * qui l'exigent (EEE, Royaume-Uni, Suisse, Québec) tant que le visiteur
 * n'a pas choisi. Rouvrable via l'événement « open-cookie-settings »
 * (lien « Paramètres des cookies » du pied de page).
 */
const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== null) return;
    void isConsentRequiredRegion().then((required) => {
      if (required) setVisible(true);
    });
  }, []);

  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener("open-cookie-settings", open);
    return () => window.removeEventListener("open-cookie-settings", open);
  }, []);

  if (!visible) return null;

  const decide = (decision: "granted" | "denied") => {
    persistConsentChoice(decision);
    setVisible(false);
    if (decision === "granted") void loadGoogleAds();
  };

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
    >
      <div className="container-custom py-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie className="text-supreme-primary shrink-0 mt-0.5" size={22} />
          <p className="text-sm text-gray-700 leading-relaxed">
            Nous utilisons des cookies pour mesurer l'audience du site et l'efficacité
            de nos publicités (Google, Meta). Vous pouvez accepter ou refuser ; votre
            choix est modifiable à tout moment depuis « Paramètres des cookies » en
            bas de page. Consultez notre{" "}
            <Link to="/privacy" className="underline hover:text-supreme-primary">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="px-5 py-2.5 rounded-md text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="px-5 py-2.5 rounded-md text-sm font-semibold bg-supreme-primary text-white hover:bg-supreme-primary/90"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
