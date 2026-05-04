import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, MapPin, Phone, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Breadcrumb from "@/components/Breadcrumb";
import SeoBreadcrumb from "@/components/SeoBreadcrumb";
import CTA from "@/components/CTA";
import LeadForm from "@/components/LeadForm";
import { zones } from "@/data/zones";
import { serviceCatalog } from "@/data/services";

const QUOTE_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScnhgMR8AwvJG2UkAibutS6EHPI-a-lLnFNqjtOdlpsrBXBcQ/viewform?usp=header";
const SITE = "https://supremenergies.com";

/**
 * Page SEO locale : combinaison Service × Ville.
 * Route : /services/:service/:ville
 * Génère ~80 pages géolocalisées à fort potentiel longue traîne.
 */
const ServiceCity = () => {
  const { service, ville } = useParams<{ service: string; ville: string }>();
  const meta = service ? serviceCatalog[service] : undefined;
  const zone = ville ? zones[ville] : undefined;

  if (!meta || !zone) return <Navigate to="/services" replace />;

  const title = `${meta.name} à ${zone.name} (${zone.postalCode}) | Devis gratuit | SupremEnergies`;
  const description = `${meta.name} à ${zone.name} : devis gratuit en 48h, jusqu'à 11 000 € d'aides MaPrimeRénov' 2026. ${meta.intro}`;
  const canonical = `${SITE}/services/${meta.slug}/${zone.slug}`;
  const [pMin, pMax] = meta.priceRange.split("-");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${meta.name} à ${zone.name}`,
    serviceType: meta.name,
    description,
    areaServed: {
      "@type": "City",
      name: zone.name,
      containedInPlace: { "@type": "AdministrativeArea", name: zone.department },
    },
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://supremenergies.com/#localbusiness",
      name: "SupremEnergies",
      telephone: "+33186046889",
      address: {
        "@type": "PostalAddress",
        streetAddress: "55 rue Cartier Bresson",
        addressLocality: "Pantin",
        postalCode: "93500",
        addressRegion: "Île-de-France",
        addressCountry: "FR",
      },
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: pMin,
      highPrice: pMax,
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: meta.faqQuestion,
        acceptedAnswer: { "@type": "Answer", text: meta.faqAnswer },
      },
      ...zone.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    ],
  };

  return (
    <div>
      <SeoBreadcrumb
        items={[
          { name: "Accueil", url: "/" },
          { name: "Services", url: "/services" },
          { name: meta.name, url: `/services/${meta.slug}` },
          { name: zone.name, url: canonical },
        ]}
      />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="fr-FR" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE}/og-image.jpg`} />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-supreme-primary to-supreme-primary/80 text-white py-14 md:py-20">
        <div className="container-custom">
          <Breadcrumb
            items={[
              { label: "Services", href: "/services" },
              { label: meta.name, href: `/services/${meta.slug}` },
              { label: zone.name },
            ]}
          />
          <div className="flex items-center gap-2 text-white/80 mb-3 mt-4">
            <MapPin size={18} />
            <span className="text-sm">
              {zone.fullName} · {zone.population}
            </span>
          </div>
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {meta.name} à {zone.name}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6">{meta.intro}</p>
              <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                {meta.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/95">
                    <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-supreme-accent hover:bg-supreme-accent/90 text-white px-6 py-6 text-lg"
                >
                  <a
                    href={QUOTE_FORM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Devis gratuit à {zone.name} <ArrowRight size={18} />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10 px-6 py-6 text-lg"
                >
                  <a href="tel:0186046889" className="flex items-center gap-2">
                    <Phone size={18} /> 01 86 04 68 89
                  </a>
                </Button>
              </div>
              <p className="text-white/80 text-sm mt-4">
                💰 {meta.priceLabel} · Réponse sous 48h
              </p>
            </div>

            <div className="lg:col-span-2">
              <LeadForm
                source={`service-city-${meta.slug}-${zone.slug}`}
                defaultProject={meta.name}
                defaultCity={zone.name}
                title={`Recevez votre devis ${meta.name} à ${zone.name}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contexte logement local */}
      <section className="py-14 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {meta.name} à {zone.name} : nos solutions adaptées
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">{zone.housingContext}</p>
          <p className="text-gray-700 leading-relaxed text-lg">
            SupremEnergies réalise l'installation complète : diagnostic gratuit, dimensionnement,
            pose, mise en service et accompagnement administratif (MaPrimeRénov', CEE).
          </p>
        </div>
      </section>

      {/* Aides locales */}
      <section className="py-14 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Aides {meta.name.toLowerCase()} disponibles à {zone.name}
          </h2>
          <ul className="space-y-3">
            {zone.localAids.map((aid, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100"
              >
                <CheckCircle2 className="text-supreme-primary mt-0.5 flex-shrink-0" size={20} />
                <span className="text-gray-800">{aid}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90 text-white px-6 py-5">
              <Link to="/simulateur-aides">Simuler mes aides en 2 minutes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Témoignage local */}
      <section className="py-14 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="bg-supreme-light p-8 md:p-10 rounded-xl border border-gray-100">
            <Quote className="text-supreme-primary mb-4" size={36} />
            <p className="text-lg italic text-gray-800 mb-4 leading-relaxed">
              « {zone.testimonialQuote} »
            </p>
            <div className="font-semibold text-supreme-primary">— {zone.testimonialAuthor}</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            FAQ {meta.name} à {zone.name}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="srv">
              <AccordionTrigger className="text-left font-semibold">
                {meta.faqQuestion}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">{meta.faqAnswer}</AccordionContent>
            </AccordionItem>
            {zone.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`zfaq-${i}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Maillage interne — autres villes pour ce service */}
      <section className="py-12 bg-white border-t">
        <div className="container-custom">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
            {meta.name} dans d'autres villes d'Île-de-France
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.values(zones)
              .filter((z) => z.slug !== zone.slug)
              .slice(0, 14)
              .map((z) => (
                <Link
                  key={z.slug}
                  to={`/services/${meta.slug}/${z.slug}`}
                  className="px-4 py-2 bg-supreme-light hover:bg-supreme-primary/10 text-supreme-primary text-sm rounded-full transition-colors"
                >
                  {meta.shortName} {z.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTA
        title={`Démarrez votre projet ${meta.name.toLowerCase()} à ${zone.name}`}
        subtitle="Devis gratuit, accompagnement aides 2026, chantier clé en main."
      />
    </div>
  );
};

export default ServiceCity;
