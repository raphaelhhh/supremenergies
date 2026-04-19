import { Link } from "react-router-dom";
import { ThermometerSun, Home, SunMedium, Building, ArrowRight } from "lucide-react";

const ALL_SERVICES = [
  {
    slug: "isolation-thermique",
    title: "Isolation Thermique",
    description: "Combles, murs, fenêtres : réduisez vos pertes de chaleur jusqu'à 30%.",
    icon: ThermometerSun,
  },
  {
    slug: "pompe-a-chaleur",
    title: "Pompe à Chaleur",
    description: "Divisez vos factures de chauffage par 3 à 4.",
    icon: Home,
  },
  {
    slug: "panneaux-solaires",
    title: "Panneaux Solaires",
    description: "Produisez votre électricité verte et revendez le surplus.",
    icon: SunMedium,
  },
  {
    slug: "renovation-globale",
    title: "Rénovation Globale",
    description: "Tous les travaux en un seul chantier, économies de 60 à 80%.",
    icon: Building,
  },
];

interface RelatedServicesProps {
  excludeSlug?: string;
  title?: string;
}

const RelatedServices = ({
  excludeSlug,
  title = "Nos services associés",
}: RelatedServicesProps) => {
  const services = ALL_SERVICES.filter((s) => s.slug !== excludeSlug).slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-supreme-primary hover:shadow-md transition-all"
              >
                <div className="h-12 w-12 rounded-full bg-supreme-light flex items-center justify-center mb-4 text-supreme-primary group-hover:bg-supreme-primary group-hover:text-white transition-colors">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-supreme-dark">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <span className="inline-flex items-center text-supreme-primary text-sm font-medium">
                  En savoir plus <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;
