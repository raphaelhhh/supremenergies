import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { zones, type ZoneRegion } from "@/data/zones";

interface RelatedZonesProps {
  excludeSlug?: string;
  serviceSlug?: string;
  serviceName?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
}

const REGION_LABEL: Record<ZoneRegion, string> = {
  idf: "Île-de-France",
  "hauts-de-france": "Hauts-de-France",
};

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
      ? `${serviceName ?? "Service"} près de chez vous`
      : "Nos zones d'intervention");

  const sub =
    subtitle ??
    (serviceSlug
      ? `SupremEnergies installe ${serviceName?.toLowerCase() ?? "nos solutions"} dans toute l'Île-de-France et les Hauts-de-France.`
      : "Nous intervenons partout en Île-de-France et Hauts-de-France pour votre projet de rénovation énergétique.");

  // Group by region
  const grouped = items.reduce<Record<string, typeof items>>((acc, z) => {
    const key = z.region ?? "idf";
    (acc[key] ||= []).push(z);
    return acc;
  }, {});

  const regionOrder: ZoneRegion[] = ["idf", "hauts-de-france"];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-supreme-light/30" aria-label="Zones d'intervention">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-supreme-primary/10 text-supreme-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
            <MapPin size={14} aria-hidden="true" />
            Couverture nationale
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-supreme-dark mb-3">{heading}</h2>
          <p className="text-gray-600">{sub}</p>
        </div>

        <div className="space-y-8">
          {regionOrder.map((region) => {
            const regionItems = grouped[region];
            if (!regionItems?.length) return null;
            return (
              <div key={region}>
                <h3 className="text-sm font-bold text-supreme-dark/70 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
                  <span>{REGION_LABEL[region]}</span>
                  <span className="text-supreme-primary">· {regionItems.length} villes</span>
                  <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
                </h3>
                <ul className="flex flex-wrap gap-2 justify-center">
                  {regionItems.map((z) => {
                    const to = serviceSlug
                      ? `/services/${serviceSlug}/${z.slug}`
                      : `/zones/${z.slug}`;
                    const aria = serviceSlug
                      ? `${serviceName} à ${z.name}`
                      : `Rénovation énergétique à ${z.name}`;
                    const dept = z.fullName.match(/\((\d+)\)/)?.[1];
                    return (
                      <li key={z.slug}>
                        <Link
                          to={to}
                          aria-label={aria}
                          title={aria}
                          className="group inline-flex items-center gap-2 bg-white hover:bg-supreme-primary border border-gray-200 hover:border-supreme-primary text-supreme-dark hover:text-white rounded-full pl-3 pr-2 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all"
                        >
                          <MapPin
                            size={14}
                            className="text-supreme-primary group-hover:text-white flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span>{z.name}</span>
                          {dept && (
                            <span className="text-[10px] font-semibold bg-supreme-light/70 group-hover:bg-white/20 text-supreme-primary group-hover:text-white px-1.5 py-0.5 rounded-full">
                              {dept}
                            </span>
                          )}
                          <ArrowRight
                            size={12}
                            className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedZones;
