import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface LinkItem {
  to: string;
  label: string;
  desc?: string;
}

interface InternalLinksHubProps {
  title?: string;
  subtitle?: string;
  links?: LinkItem[];
  variant?: "grid" | "inline";
}

const DEFAULT_LINKS: LinkItem[] = [
  { to: "/services/isolation-thermique", label: "Isolation thermique des combles et murs", desc: "Jusqu'à 30% d'économies de chauffage" },
  { to: "/services/pompe-a-chaleur", label: "Installation de pompe à chaleur air/eau", desc: "Divisez votre facture de chauffage par 3 à 4" },
  { to: "/services/panneaux-solaires", label: "Panneaux solaires photovoltaïques en autoconsommation", desc: "Produisez votre électricité, revendez le surplus" },
  { to: "/services/renovation-globale", label: "Rénovation énergétique globale clé en main", desc: "Aides MaPrimeRénov' bonifiées jusqu'à 70 000 €" },
  { to: "/simulateur-aides", label: "Simulateur d'aides MaPrimeRénov' 2026", desc: "Estimez vos primes CEE et Éco-PTZ en 2 min" },
  { to: "/blog", label: "Guides experts en rénovation énergétique", desc: "Conseils, actualités et études de cas" },
];

const InternalLinksHub = ({
  title = "Explorez nos solutions et ressources",
  subtitle,
  links = DEFAULT_LINKS,
  variant = "grid",
}: InternalLinksHubProps) => {
  if (variant === "inline") {
    return (
      <nav aria-label="Liens utiles" className="py-8 border-t border-gray-200">
        <div className="container-custom">
          {title && <h2 className="text-lg font-semibold mb-4 text-supreme-dark">{title}</h2>}
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-supreme-primary hover:underline text-sm font-medium">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <section className="section-padding bg-supreme-light/40" aria-label="Pour aller plus loin">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-supreme-dark mb-3">{title}</h2>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="group block bg-white border border-gray-200 rounded-lg p-5 hover:border-supreme-primary hover:shadow-md transition-all h-full"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-supreme-dark group-hover:text-supreme-primary transition-colors">
                      {l.label}
                    </h3>
                    {l.desc && <p className="text-sm text-gray-600 mt-1">{l.desc}</p>}
                  </div>
                  <ArrowRight size={18} className="text-supreme-accent flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default InternalLinksHub;
