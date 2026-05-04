import { Phone, FileText } from "lucide-react";
import { useLocation } from "react-router-dom";

const QUOTE_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScnhgMR8AwvJG2UkAibutS6EHPI-a-lLnFNqjtOdlpsrBXBcQ/viewform?usp=header";

/**
 * Barre CTA sticky en bas d'écran sur mobile uniquement.
 * Visible sur toutes les pages sauf admin / formulaire / 404.
 */
const StickyMobileCTA = () => {
  const { pathname } = useLocation();
  const hidden =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth") ||
    pathname === "/devis-gratuit";

  if (hidden) return null;

  const handleCall = () => {
    if (typeof window !== "undefined" && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: "cta_click",
        cta_type: "phone",
        cta_location: "sticky_mobile",
      });
    }
  };

  const handleQuote = () => {
    if (typeof window !== "undefined" && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: "cta_click",
        cta_type: "quote",
        cta_location: "sticky_mobile",
      });
    }
  };

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex"
      role="region"
      aria-label="Actions rapides"
    >
      <a
        href="tel:0186046889"
        onClick={handleCall}
        className="flex-1 flex items-center justify-center gap-2 py-3 text-supreme-primary font-semibold border-r border-gray-100"
      >
        <Phone size={18} /> Appeler
      </a>
      <a
        href={QUOTE_FORM}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleQuote}
        className="flex-1 flex items-center justify-center gap-2 py-3 bg-supreme-accent text-white font-semibold"
      >
        <FileText size={18} /> Devis gratuit
      </a>
    </div>
  );
};

export default StickyMobileCTA;
