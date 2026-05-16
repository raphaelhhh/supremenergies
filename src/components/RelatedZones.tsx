import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { zones } from "@/data/zones";

interface RelatedZonesProps {
  /** Slug à exclure (zone courante) */
  excludeSlug?: string;
  /** Si défini, génère des liens vers /services/{serviceSlug}/{ville} au lieu de /zones/{ville} */
  serviceSlug?: string;
  /** Nom du service à afficher dans le label (ex: "Pompe à chaleur") */
  serviceName?: string;
  title?: string;
  subtitle?: string;
  /** Nombre maximum d'éléments (défaut: toutes les zones) */
  limit?: number;
}

/**
 * Bloc de maillage interne vers les pages locales (zones IDF ou pages service×ville).
 * Renforce la découverte des pages locales par Google et thématise les liens.
 */
const RelatedZones = ({
  excludeSlug,
  serviceSlug,
  serviceName,
  title,
  subtitle,
  limit,
}: RelatedZonesProps) => {
  const list = Object.values(zones).filter((z) => z.slug !== excludeSlug);
  const items = limit ? list.slice(0, limit) : list;
  if (items.length === 0) return null;

  const heading =
    title ??
    (serviceSlug
      ? `${serviceName ?? "Service"} en Île-de-France`
      : "Nos zones d'intervention en Île-de-France");

  const sub =
    subtitle ??
    (serviceSlug
      ? `Découvrez nos interventions ${serviceName?.toLowerCase() ?? ""} dans les principales villes d'Île-de-France.`
      : "Nous intervenons partout en Île-de-France pour votre projet de rénovation énergétique.");

  return (
    <section className="section-padding bg-white" aria-label="Zones d'intervention">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-supreme-dark mb-3">{heading}</h2>
          <p className="text-gray-600">{sub}</p>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {items.map((z) => {
            const to = serviceSlug
              ? `/services/${serviceSlug}/${z.slug}`
              : `/zones/${z.slug}`;
            const label = serviceSlug
              ? `${serviceName} à ${z.name}`
              : `Rénovation à ${z.name}`;
            return (
              <li key={z.slug}>
                <Link
                  to={to}
                  className="group flex items-center justify-between gap-2 bg-supreme-light/40 hover:bg-supreme-primary/10 border border-gray-200 hover:border-supreme-primary rounded-lg px-4 py-3 transition-all"
                  title={label}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <MapPin
                      size={16}
                      className="text-supreme-primary flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="font-medium text-supreme-dark truncate">{label}</span>
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-supreme-accent flex-shrink-0 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default RelatedZones;
