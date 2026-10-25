
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundClassName?: string;
}

const CTA = ({
  title = "Prêt à réduire votre empreinte énergétique ?",
  subtitle = "Contactez-nous pour obtenir un devis personnalisé et découvrir les aides financières disponibles pour votre projet.",
  primaryButtonText = "Demander un devis",
  primaryButtonLink = "/devis-gratuit",
  secondaryButtonText = "Nos services",
  secondaryButtonLink = "/services",
  backgroundClassName = "bg-supreme-primary",
}: CTAProps) => {
  return (
    <section className={`py-16 ${backgroundClassName}`}>
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          {title}
        </h2>
        <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-wrap justify-center items-start gap-4">
          <div className="flex flex-col items-center">
          <Button 
            asChild 
            className="bg-supreme-accent hover:bg-supreme-accent/90 text-supreme-dark px-6 py-6 rounded-md text-lg"
          >
            <a href={primaryButtonLink} className="flex items-center gap-2">
              {primaryButtonText}
              <ArrowRight size={18} />
            </a>
          </Button>
          <span className="mt-2 text-sm text-white/85">Réponse sous 24h</span>
          </div>
          <Button 
            asChild 
            variant="outline" 
            className="bg-transparent hover:bg-white/10 text-white border-white px-6 py-6 rounded-md text-lg"
          >
            <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
