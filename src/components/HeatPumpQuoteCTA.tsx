import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { heatPumpQuotePath, heatPumpSimulationPath } from "@/lib/heat-pump-journey";

export default function HeatPumpQuoteCTA({ from, guide, simulation }: { from: string; guide?: string; simulation?: Record<string, unknown> }) {
  const isGuide = from.startsWith("blog_");
  return <aside aria-label="Votre projet pompe à chaleur" className="not-prose my-8 border-y border-border bg-supreme-light px-5 py-6">
    <h3 className="text-xl font-bold text-supreme-primary">{isGuide ? "Quelles aides pour votre pompe à chaleur ?" : "Votre estimation, puis votre devis pompe à chaleur"}</h3>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{isGuide ? "Estimez les aides selon votre logement et vos revenus, puis demandez un devis adapté à votre projet." : "Retrouvez vos réponses dans votre demande de devis, modifiables avant l’envoi. Nos équipes installent partout en France."}</p>
    <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <Button asChild className="h-auto min-h-11 whitespace-normal bg-supreme-accent text-supreme-dark hover:bg-supreme-accent/90">
        {isGuide ? <a href={heatPumpSimulationPath(from)}>Estimer mes aides pompe à chaleur <ArrowRight size={16} /></a>
          : <Link to={heatPumpQuotePath(from, guide)} state={{ simulation }}>Demander mon devis pompe à chaleur <ArrowRight size={16} /></Link>}
      </Button>
      <Button asChild variant="link" className="h-auto whitespace-normal px-0">
        <a href={isGuide ? heatPumpQuotePath(from) : "/services/pompe-a-chaleur"}>{isGuide ? "Demander directement un devis" : "Découvrir nos installations"}</a>
      </Button>
    </div>
    <p className="mt-3 text-xs text-muted-foreground">Devis gratuit et sans engagement. Aides éventuelles sous conditions, non garanties.</p>
  </aside>;
}