import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useId } from "react";

export default function FormPrivacy({ marketing, onMarketingChange }: { marketing: boolean; onMarketingChange: (value: boolean) => void }) {
  const id = useId();
  return <div className="space-y-3 text-sm text-muted-foreground">
    <p>SupremEnergies utilise vos coordonnées et les informations de votre projet pour traiter votre demande, avec ses outils de gestion et le tableau Google Sheets réservé à l’équipe. Aucun accord publicitaire n’est nécessaire pour envoyer cette demande. <Link className="underline" to="/politique-confidentialite">Confidentialité et vos droits</Link>.</p>
    <div className="flex items-start gap-2"><Checkbox id={id} checked={marketing} onCheckedChange={v => onMarketingChange(v === true)} /><label htmlFor={id}>Je souhaite recevoir par e-mail les conseils et offres de SupremEnergies (facultatif). Retrait gratuit à tout moment à contact@supremenergies.com.</label></div>
  </div>;
}