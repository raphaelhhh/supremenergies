import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, CheckCircle2, ArrowRight, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";
import SeoBreadcrumb from "@/components/SeoBreadcrumb";
import CTA from "@/components/CTA";
import { zones } from "@/data/zones";
import { serviceCatalog } from "@/data/services";

const QUOTE_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScnhgMR8AwvJG2UkAibutS6EHPI-a-lLnFNqjtOdlpsrBXBcQ/viewform?usp=header";
const SITE = "https://supremenergies.com";

const RegionHautsDeFrance = () => {
  const nordZones = Object.values(zones).filter((z) => z.region === "hauts-de-france");
  const services = Object.values(serviceCatalog);
  const canonical = `${SITE}/region/hauts-de-france`;

  const title = "Rénovation énergétique Hauts-de-France ★ Aides 2026 jusqu'à 11 000€";
  const description =
    "✓ Pompe à chaleur, isolation, panneaux solaires dans le Nord, Pas-de-Calais et Somme. Devis gratuit 48h, jusqu'à 11 000€ d'aides MaPrimeRénov' + aides régionales Hauts-de-France.";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Rénovation énergétique Hauts-de-France",
    description,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Hauts-de-France",
    },
    provider: {
      "@type": "LocalBusiness",
      name: "SupremEnergies",
      telephone: "+33186046889",
      areaServed: ["Nord", "Pas-de-Calais", "Somme", "Aisne", "Oise"],
    },
  };

  return (
    <div>
      <SeoBreadcrumb
        items={[
          { name: "Accueil", url: "/" },
          { name: "Hauts-de-France", url: canonical },
        ]}
      />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-supreme-primary to-supreme-primary/80 text-white pt-28 md:pt-36 pb-14 md:pb-20">
        <div className="container-custom">
          <div className="[&_nav]:py-0 [&_nav]:text-white/80 [&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/80">
            <Breadcrumb items={[{ label: "Hauts-de-France" }]} />
          </div>
          <div className="flex items-center gap-2 text-white/90 mb-3 mt-6">
            <MapPin size={20} />
            <span className="text-sm uppercase tracking-wide">Nord · Pas-de-Calais · Somme</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Rénovation énergétique en Hauts-de-France
          </h1>
          <p className="text-lg md:text-xl text-white/95 max-w-3xl mb-8">
            Pompe à chaleur, isolation, panneaux solaires et rénovation globale dans toute la
            région. Climat océanique, parc bâti ancien : nos solutions sont calibrées pour le Nord.
            <strong> Devis gratuit en 48h, jusqu'à 11 000 € d'aides 2026.</strong>
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-supreme-accent hover:bg-supreme-accent/90 text-white px-6 py-6 text-lg">
              <a href={QUOTE_FORM} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Demander mon devis gratuit <ArrowRight size={18} />
              </a>
            </Button>
            <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 px-6 py-6 text-lg">
              <a href="tel:0186046889" className="flex items-center gap-2">
                <Phone size={18} /> 01 86 04 68 89
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Pourquoi le Nord */}
      <section className="py-14 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Pourquoi rénover en Hauts-de-France en 2026 ?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-supreme-primary">Climat exigeant</h3>
              <p>
                Hivers longs, humidité, vents marins sur le littoral : une isolation performante et un
                système de chauffage adapté divisent par 2 à 3 votre facture énergétique annuelle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-supreme-primary">Parc bâti ancien</h3>
              <p>
                Maisons en brique, corons, courées, pavillons d'après-guerre : 60 % du parc des
                Hauts-de-France est en étiquette E, F ou G. Le potentiel d'économies est énorme.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-supreme-primary">Aides cumulables</h3>
              <p>
                MaPrimeRénov', CEE, éco-PTZ, <strong>aides Région Hauts-de-France</strong> (Pass
                Rénovation) et aides intercommunales (MEL, CAB, CALL…) se cumulent pour réduire
                drastiquement votre reste à charge.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-supreme-primary">Équipe locale</h3>
              <p>
                SupremEnergies intervient dans toute la région avec des installateurs qualifiés. Étude
                thermique, pose, mise en service et accompagnement administratif inclus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 bg-gray-50">
        <div className="container-custom max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Nos services en Hauts-de-France
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="bg-white p-6 rounded-xl border border-gray-100 hover:border-supreme-primary/40 hover:shadow-md transition-all"
              >
                <h3 className="font-bold text-lg mb-2 text-supreme-primary">{s.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{s.intro}</p>
                <span className="text-sm text-supreme-primary font-medium inline-flex items-center gap-1">
                  En savoir plus <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Maillage : 60 pages services × villes Nord */}
      <section className="py-14 bg-white">
        <div className="container-custom max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            Nos interventions ville par ville
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Devis et tarifs pour chaque service dans les principales villes des Hauts-de-France.
          </p>

          {services.map((s) => (
            <div key={s.slug} className="mb-10">
              <h3 className="text-lg font-bold mb-4 text-supreme-primary border-b border-gray-100 pb-2">
                {s.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {nordZones.map((z) => (
                  <Link
                    key={`${s.slug}-${z.slug}`}
                    to={`/services/${s.slug}/${z.slug}`}
                    className="px-3 py-1.5 bg-supreme-light hover:bg-supreme-primary/10 text-supreme-primary text-sm rounded-full transition-colors"
                  >
                    {s.shortName} {z.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Aides régionales */}
      <section className="py-14 bg-supreme-light">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-xl p-8 md:p-10 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-supreme-accent" size={28} />
              <h2 className="text-2xl md:text-3xl font-bold">Aides spécifiques Hauts-de-France 2026</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              {[
                "MaPrimeRénov' (national) — jusqu'à 11 000 € selon revenus",
                "Pass Rénovation Hauts-de-France — accompagnement + tiers-financement",
                "Aides Métropole Européenne de Lille (MEL) pour les propriétaires occupants",
                "CEE Coup de pouce chauffage et isolation — bonifiés pour le Nord",
                "Éco-PTZ jusqu'à 50 000 € sans intérêts",
                "TVA réduite à 5,5 % sur tous les travaux d'économie d'énergie",
              ].map((aid, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-supreme-primary mt-0.5 flex-shrink-0" size={20} />
                  <span>{aid}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90 text-white">
                <Link to="/simulateur-aides">Simuler mes aides en 2 minutes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Démarrez votre rénovation en Hauts-de-France"
        subtitle="Devis gratuit sous 48h, accompagnement aides 2026, chantier clé en main."
      />
    </div>
  );
};

export default RegionHautsDeFrance;
