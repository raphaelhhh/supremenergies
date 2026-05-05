import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import SeoBreadcrumb from "@/components/SeoBreadcrumb";
import RelatedServices from "@/components/RelatedServices";
import { Building, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import renovationGlobaleHero from "@/assets/renovation-globale-maison.jpg";

const faqItems = [
  { question: "Qu'est-ce que la rénovation globale ?", answer: "La rénovation globale consiste à traiter simultanément tous les postes de déperdition énergétique d'un logement : isolation (combles, murs, fenêtres), chauffage, ventilation. Cette approche intégrée garantit une performance optimale et des économies maximales." },
  { question: "Quelles aides pour une rénovation globale en 2026 ?", answer: "La rénovation globale bénéficie d'aides bonifiées : MaPrimeRénov' Parcours accompagné (jusqu'à 63 000 €), CEE bonifiés, éco-PTZ jusqu'à 50 000 €, TVA à 5,5%. Le cumul peut couvrir 60 à 90% du coût total selon vos revenus." },
  { question: "Combien de temps durent les travaux ?", answer: "Une rénovation globale dure généralement 4 à 12 semaines selon l'ampleur des travaux. Nous coordonnons tous les corps de métier pour minimiser les nuisances et respecter les délais." },
  { question: "Mon logement est-il éligible ?", answer: "Tout logement de plus de 15 ans est potentiellement éligible. Les passoires thermiques (DPE F ou G) sont prioritaires et bénéficient d'aides renforcées. Contactez-nous pour un diagnostic gratuit." }
];

const RenovationGlobale = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Rénovation Énergétique Globale",
    "provider": {
      "@type": "LocalBusiness",
      "name": "SupremEnergies",
      "telephone": "01 86 04 68 89",
      "address": { "@type": "PostalAddress", "streetAddress": "55 rue Cartier Bresson", "addressLocality": "Pantin", "postalCode": "93500", "addressCountry": "FR" }
    },
    "areaServed": "Île-de-France",
    "description": "Rénovation énergétique globale : isolation + chauffage + ventilation en un seul chantier. Économies de 60 à 80%. Aides bonifiées.",
    "serviceType": "Rénovation énergétique globale"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <div>
      <SeoBreadcrumb items={[
        { name: "Accueil", url: "/" },
        { name: "Services", url: "/services" },
        { name: "Rénovation globale", url: "/services/renovation-globale" },
      ]} />
      <Helmet>
        <title>Rénovation Globale en Île-de-France | SupremEnergies</title>
        <meta name="description" content="Rénovation énergétique globale en Île-de-France. Isolation + chauffage + ventilation en un seul chantier. Économies de 60 à 80%. Aides bonifiées MaPrimeRénov' jusqu'à 63 000 €. Devis gratuit." />
        <link rel="canonical" href="https://supremenergies.com/services/renovation-globale" />
        <meta property="og:title" content="Rénovation Globale en Île-de-France | SupremEnergies" />
        <meta property="og:description" content="Rénovation globale : isolation + chauffage + ventilation. Économies de 60 à 80%. Devis gratuit." />
        <meta property="og:url" content="https://supremenergies.com/services/renovation-globale" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Hero
        title="Rénovation Énergétique Globale"
        subtitle="Traitez tous les postes de déperdition en un seul chantier et économisez 60 à 80% sur vos factures."
        buttonText="Demander un diagnostic gratuit"
        buttonLink="/contact"
        imageSrc="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        imageAlt="Rénovation énergétique globale d'une maison"
      />

      <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: "Rénovation Globale" }]} />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-supreme-primary">Pourquoi une rénovation globale ?</h2>
              <p className="text-lg mb-4 text-gray-700">
                Plutôt que des travaux ponctuels et dispersés, la rénovation globale propose une approche intégrée où isolation, chauffage et ventilation sont traités simultanément pour des résultats optimaux.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                C'est la solution recommandée par l'État pour les logements énergivores (DPE E, F ou G), avec des aides financières bonifiées pouvant couvrir jusqu'à 90% du coût des travaux.
              </p>

              <h3 className="text-xl font-semibold mb-4">Les avantages de la rénovation globale</h3>
              <ul className="space-y-3 mb-8">
                {[
                  { title: "Performance maximale", desc: "Les travaux se complètent et s'optimisent mutuellement pour des économies de 60 à 80%." },
                  { title: "Aides bonifiées", desc: "MaPrimeRénov' Parcours accompagné : jusqu'à 63 000 € selon vos revenus et le gain énergétique." },
                  { title: "Un seul chantier coordonné", desc: "Moins de dérangement, des délais optimisés, un seul interlocuteur." },
                  { title: "Valorisation immobilière", desc: "Gain de 2 à 4 classes DPE. Indispensable avec l'interdiction de louer les passoires thermiques." },
                  { title: "Confort toute l'année", desc: "Plus de courants d'air, plus de murs froids, une température homogène été comme hiver." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">{item.title}</span>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Notre accompagnement</h3>
              <div className="space-y-4 mb-8">
                {[
                  { step: "01", title: "Audit énergétique", desc: "Diagnostic complet de votre logement pour identifier les travaux prioritaires et calculer les gains." },
                  { step: "02", title: "Plan de travaux", desc: "Proposition d'un programme de travaux optimisé avec estimation des économies et des aides." },
                  { step: "03", title: "Montage des dossiers d'aides", desc: "Nous gérons toutes les démarches administratives pour maximiser vos aides financières." },
                  { step: "04", title: "Réalisation des travaux", desc: "Coordination de tous les corps de métier pour un chantier fluide et dans les délais." },
                  { step: "05", title: "Suivi post-travaux", desc: "Vérification des performances, réglage des équipements et accompagnement sur la durée." }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex gap-4">
                    <span className="text-2xl font-bold text-supreme-primary/30">{item.step}</span>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-4">Aides financières cumulables</h3>
              <ul className="space-y-2 mb-8">
                {[
                  "MaPrimeRénov' Parcours accompagné : jusqu'à 63 000 €",
                  "CEE bonifiés pour les rénovations performantes",
                  "Éco-PTZ : jusqu'à 50 000 € à taux zéro",
                  "TVA à 5,5% sur tous les travaux",
                  "Aides locales (région, département, commune)"
                ].map((aide, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{aide}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90 w-full">
                <Link to="/contact" className="flex items-center justify-center gap-2">
                  Demander un diagnostic gratuit <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-supreme-primary text-center">Questions fréquentes sur la rénovation globale</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-3 text-supreme-primary">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedArticles
        keywords={["rénovation", "MaPrimeRénov", "DPE", "passoire thermique", "audit"]}
        title="Pour aller plus loin sur la rénovation globale"
      />

      <RelatedServices excludeSlug="renovation-globale" title="Découvrez aussi" />

      <CTA title="Prêt à rénover votre logement ?" subtitle="Contactez-nous pour un audit énergétique gratuit et découvrez les aides auxquelles vous avez droit." />
    </div>
  );
};

export default RenovationGlobale;
