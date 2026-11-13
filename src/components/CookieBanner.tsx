import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { needsAnswer, onConsentChange, readChoice } from "@/lib/consent";
import { saveAuditedChoices } from "@/lib/consent-audit";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
  useEffect(() => {
    let active = true;
    const check = () => void needsAnswer(["analytics", "advertising"]).then(required => {
      if (active && (required || (!gpc && (readChoice("analytics") === null || readChoice("advertising") === null)))) setVisible(true);
    });
    const open = () => {
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setAnalytics(readChoice("analytics") === "granted");
      setAdvertising(readChoice("advertising") === "granted");
      setSettings(true); setVisible(true);
    };
    check();
    window.addEventListener("open-cookie-settings", open);
    const unsubscribe = onConsentChange(check);
    return () => { active = false; unsubscribe(); window.removeEventListener("open-cookie-settings", open); };
  }, [gpc]);
  useEffect(() => { if (visible) panel.current?.focus(); }, [visible, settings]);
  const save = (a: boolean, ads: boolean) => {
    saveAuditedChoices({ analytics: a ? "granted" : "denied", advertising: ads ? "granted" : "denied" });
    setVisible(false); setSettings(false); previousFocus.current?.focus();
  };
  if (!visible) return null;
  return <div ref={panel} tabIndex={-1} role="dialog" aria-modal="false" aria-labelledby="cookie-title" className="fixed inset-x-0 bottom-0 z-[110] max-h-[85vh] overflow-y-auto border-t border-border bg-background text-foreground shadow-xl">
    <div className="container-custom py-5 max-w-5xl">
      <h2 id="cookie-title" className="flex items-center gap-2 text-lg mb-2"><Cookie size={21} /> {settings ? "Gérer mes cookies" : "Vos choix de confidentialité"}</h2>
      <p className="text-sm text-muted-foreground mb-4">Nous comptons les visites sans cookies. Si vous acceptez la mesure d’audience, nous mesurons aussi les clics. Les cookies publicitaires permettent de mesurer les demandes provenant des annonces. <Link to="/politique-confidentialite" className="underline">Politique de confidentialité</Link>.</p>
      {settings && <div className="space-y-3 mb-4">
        <div className="flex justify-between gap-4 border-b border-border pb-3 text-sm"><div><strong>Nécessaires</strong><p className="text-muted-foreground">Choix de confidentialité et connexion à l’espace réservé.</p></div><span>Toujours actifs</span></div>
        {gpc && <p role="status" className="text-sm">Le signal de confidentialité de votre navigateur s’applique : les mesures facultatives sont désactivées.</p>}
        <div className="flex items-center justify-between gap-4"><label htmlFor="cookie-analytics" className="text-sm"><strong>Mesure d’audience</strong><span className="block text-muted-foreground">Fournie par Lovable ; statistiques anonymes du tableau d’équipe.</span></label><Switch id="cookie-analytics" checked={analytics && !gpc} onCheckedChange={setAnalytics} disabled={gpc} /></div>
        <div className="flex items-center justify-between gap-4"><label htmlFor="cookie-advertising" className="text-sm"><strong>Publicité</strong><span className="block text-muted-foreground">Fournie par Google et Meta, pour mesurer les annonces.</span></label><Switch id="cookie-advertising" checked={advertising && !gpc} onCheckedChange={setAdvertising} disabled={gpc} /></div>
        <Button onClick={() => save(analytics && !gpc, advertising && !gpc)}>Enregistrer mes choix</Button>
      </div>}
      <div className="grid grid-cols-2 sm:flex gap-3">
        <Button variant="outline" className="min-h-11 sm:min-w-40" onClick={() => save(false, false)}>Tout refuser</Button>
        <Button variant="outline" className="min-h-11 sm:min-w-40" disabled={gpc} onClick={() => save(true, true)}>Tout accepter</Button>
        {!settings && <Button variant="ghost" className="col-span-2 min-h-11" onClick={() => { setAnalytics(readChoice("analytics") === "granted"); setAdvertising(readChoice("advertising") === "granted"); setSettings(true); }}>Personnaliser</Button>}
      </div>
    </div>
  </div>;
};
export default CookieBanner;