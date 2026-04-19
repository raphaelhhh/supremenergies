import { Helmet } from "react-helmet-async";
import { useParams, Navigate, Link } from "react-router-dom";
import { MapPin, CheckCircle2, ArrowRight, Phone, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Breadcrumb from "@/components/Breadcrumb";
import CTA from "@/components/CTA";
import RelatedArticles from "@/components/RelatedArticles";
import { zones } from "@/data/zones";

const QUOTE_FORM = "https://docs.google.com/forms/d/e/1FAIpQLScnhgMR8AwvJG2UkAibutS6EHPI-a-lLnFNqjtOdlpsrBXBcQ/viewform?usp=header";

const services = [
  { slug: "pompe-a-chaleur", title: "Pompe à chaleur", desc: "Air/eau, air/air, géothermie" },
  { slug: "isolation-thermique", title: "Isolation thermique", desc: "Combles, murs, ITE" },
  { slug: "panneaux-solaires", title: "Panneaux solaires", desc: "Photovoltaïque & autoconsommation" },
  { slug: "renovation-globale", title: "Rénovation globale", desc: "Bouquet de travaux complet" },
];

const ZoneLocale = () => {
  const { ville } = useParams<{ ville: string }>();
  const zone = ville ? zones[ville] : undefined;

  if (!zone) return <Navigate to="/services" replace />;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `SupremEnergies - ${zone.name}`,
    description: `Rénovation énergétique à ${zone.name} : pompe à chaleur, isolation, panneaux solaires.`,
    telephone: "01 86 04 68 89",
    url: `https://supremenergies.com/zones/${zone.slug}`,
    areaServed: {
      "@type": "City",
      name: zone.name,
      containedInPlace: { "@type": "AdministrativeArea", name: zone.department },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: zone.name,
      postalCode: zone.postalCode,
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: zone.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const title = `Rénovation énergétique ${zone.name} | Pompe à chaleur, isolation, solaire | SupremEnergies`;
  const description = `Spécialiste de la rénovation énergétique à ${zone.name} (${zone.postalCode}) : pompe à chaleur, isolation, panneaux solaires. Devis gratuit, aides MaPrimeRénov' 2026.`;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://supremenergies.com/zones/${zone.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://supremenergies.com/zones/${zone.slug}`} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero local */}
      <section className="bg-gradient-to-br from-supreme-primary to-supreme-primary/80 text-white py-16 md:py-20">
        <div className="container-custom">
          <Breadcrumb
            items={[
              { label: "Zones d'intervention", href: "/services" },
              { label: zone.name },
            ]}
          />
          <div className="flex items-center gap-2 text-white/80 mb-3 mt-4">
            <MapPin size={20} />
            <span className="text-sm">
              {zone.fullName} · {zone.population}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl">
            Rénovation énergétique à {zone.name}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-8">{zone.intro}</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-supreme-accent hover:bg-supreme-accent/90 text-white px-6 py-6 text-lg">
              <a href={QUOTE_FORM} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Devis gratuit à {zone.name} <ArrowRight size={18} />
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

      {/* Contexte local */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Le contexte du logement à {zone.name}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{zone.housingContext}</p>
        </div>
      </section>

      {/* Services dispo dans la ville */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Nos services à {zone.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <h3 className="font-bold text-lg mb-2 text-supreme-primary">{s.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{s.desc}</p>
                <span className="text-supreme-accent text-sm font-medium flex items-center gap-1">
                  En savoir plus <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Aides locales */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Aides à la rénovation disponibles à {zone.name}
          </h2>
          <p className="text-gray-700 mb-6">
            Cumulez plusieurs dispositifs pour réduire fortement le coût de vos travaux. Nous vérifions
            votre éligibilité et montons les dossiers à votre place.
          </p>
          <ul className="space-y-3">
            {zone.localAids.map((aid, i) => (
              <li key={i} className="flex items-start gap-3 p-4 bg-supreme-primary/5 rounded-lg">
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
      <section className="py-16 bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-gray-100">
            <Quote className="text-supreme-primary mb-4" size={36} />
            <p className="text-lg md:text-xl italic text-gray-800 mb-6 leading-relaxed">
              « {zone.testimonialQuote} »
            </p>
            <div className="font-semibold text-supreme-primary">— {zone.testimonialAuthor}</div>
            <div className="mt-6">
              <Link to="/temoignages" className="text-supreme-accent font-medium flex items-center gap-1">
                Voir tous les témoignages <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Questions fréquentes à {zone.name}
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {zone.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <RelatedArticles theme={zone.name} />

      <CTA
        title={`Démarrez votre projet à ${zone.name}`}
        subtitle="Devis gratuit, accompagnement aides, chantier clé en main."
      />
    </div>
  );
};

export default ZoneLocale;
