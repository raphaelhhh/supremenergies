import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heatPumpQuotePath } from "@/lib/heat-pump-journey";

export default function HeatPumpQuoteCTA({ from }: { from: string }) {
  return <aside aria-label="Votre projet pompe à chaleur" className="not-prose my-8 border-y border-border bg-supreme-light px-5 py-6">
    <h3 className="text-xl font-bold text-supreme-primary">Un projet de pompe à chaleur ?</h3>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Faites étudier votre maison, votre chauffage actuel et le budget de votre installation par nos équipes, partout en France.</p>
    <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <Button asChild className="h-auto min-h-11 whitespace-normal bg-supreme-accent text-supreme-dark hover:bg-supreme-accent/90">
        <a href={heatPumpQuotePath(from)}>Demander mon devis pompe à chaleur <ArrowRight size={16} /></a>
      </Button>
      <Button asChild variant="link" className="h-auto whitespace-normal px-0">
        <a href="/services/pompe-a-chaleur">Découvrir nos installations</a>
      </Button>
    </div>
    <p className="mt-3 text-xs text-muted-foreground">Devis gratuit et sans engagement. Aides éventuelles sous conditions, non garanties.</p>
  </aside>;
}