import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import SeoBreadcrumb from "@/components/SeoBreadcrumb";
import RelatedServices from "@/components/RelatedServices";
import { SunMedium, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqItems = [
  { question: "Combien coûte une installation de panneaux solaires ?", answer: "Une installation de 3 kWc (environ 8 panneaux) coûte entre 7 000 et 10 000 €. Avec la prime à l'autoconsommation et les aides locales, le retour sur investissement est de 8 à 12 ans pour une durée de vie de 30 ans." },
  { question: "Autoconsommation ou revente totale ?", answer: "L'autoconsommation est idéale si vous êtes présent la journée. La revente totale offre des revenus garantis pendant 20 ans. Nous analysons votre profil de consommation pour vous recommander la meilleure option." },
  { question: "Quelle surface de toiture faut-il ?", answer: "Environ 16 à 20 m² pour une installation de 3 kWc. L'orientation idéale est plein sud avec une inclinaison de 30°, mais les orientations est-ouest fonctionnent aussi avec un rendement légèrement inférieur." },
  { question: "Les panneaux solaires fonctionnent-ils en Île-de-France ?", answer: "Oui, l'Île-de-France bénéficie d'un ensoleillement suffisant pour une installation rentable. Une installation de 3 kWc produit environ 3 000 à 3 500 kWh/an en région parisienne." }
];

const PanneauxSolaires = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Installation de Panneaux Solaires Photovoltaïques",
    "provider": {
      "@type": "LocalBusiness",
      "name": "SupremEnergies",
      "telephone": "01 86 04 68 89",
      "address": { "@type": "PostalAddress", "streetAddress": "55 rue Cartier Bresson", "addressLocality": "Pantin", "postalCode": "93500", "addressCountry": "FR" }
    },
    "areaServed": "Île-de-France",
    "description": "Installation de panneaux solaires photovoltaïques. Autoconsommation ou revente totale. Produisez votre propre électricité verte.",
    "serviceType": "Installation panneaux solaires"
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
        { name: "Panneaux solaires", url: "/services/panneaux-solaires" },
      ]} />
      <Helmet>
        <title>Panneaux Solaires en Île-de-France | Installation Photovoltaïque | SupremEnergies</title>
        <meta name="description" content="Installation de panneaux solaires photovoltaïques en Île-de-France. Autoconsommation ou revente. Produisez votre électricité verte et réduisez vos factures. Devis gratuit." />
        <link rel="canonical" href="https://supremenergies.com/services/panneaux-solaires" />
        <meta property="og:title" content="Panneaux Solaires en Île-de-France | SupremEnergies" />
        <meta property="og:description" content="Installation photovoltaïque, autoconsommation ou revente. Devis gratuit." />
        <meta property="og:url" content="https://supremenergies.com/services/panneaux-solaires" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Hero
        title="Panneaux Solaires Photovoltaïques"
        subtitle="Produisez votre propre électricité verte et réduisez vos factures durablement."
        buttonText="Demander un devis gratuit"
        buttonLink="/contact"
        imageSrc="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        imageAlt="Installation de panneaux solaires photovoltaïques"
      />

      <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: "Panneaux Solaires" }]} />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-supreme-primary">Pourquoi passer au solaire ?</h2>
              <p className="text-lg mb-4 text-gray-700">
                Les panneaux solaires photovoltaïques convertissent la lumière du soleil en électricité. C'est une énergie 100% renouvelable, gratuite et disponible partout en France.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                Avec la hausse constante du prix de l'électricité (+50% en 5 ans), installer des panneaux solaires est un investissement de plus en plus rentable, avec un retour sur investissement de 8 à 12 ans.
              </p>

              <h3 className="text-xl font-semibold mb-4">Deux modèles économiques</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-supreme-light p-5 rounded-lg">
                  <h4 className="font-bold text-supreme-primary mb-2">🏠 Autoconsommation</h4>
                  <p className="text-gray-700 mb-2">Vous consommez directement l'électricité produite et revendez le surplus.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Réduction immédiate de la facture</li>
                    <li>✓ Prime à l'autoconsommation de l'État</li>
                    <li>✓ Protection contre la hausse des prix</li>
                  </ul>
                </div>
                <div className="bg-supreme-light p-5 rounded-lg">
                  <h4 className="font-bold text-supreme-primary mb-2">💰 Revente totale</h4>
                  <p className="text-gray-700 mb-2">Vous vendez toute l'électricité produite à EDF OA à un tarif garanti 20 ans.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Revenus garantis et prévisibles</li>
                    <li>✓ Pas besoin d'adapter sa consommation</li>
                    <li>✓ Rentabilité calculable précisément</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Ce que nous installons</h3>
              <ul className="space-y-3 mb-8">
                {[
                  { title: "Panneaux monocristallins haut rendement", desc: "Rendement de 20 à 22%, garantie 25 ans, durée de vie 30+ ans." },
                  { title: "Micro-onduleurs", desc: "Optimisation panneau par panneau pour une production maximale." },
                  { title: "Systèmes de monitoring", desc: "Suivez votre production en temps réel depuis votre smartphone." },
                  { title: "Batteries de stockage (option)", desc: "Stockez votre surplus pour le consommer le soir ou en cas de coupure." }
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

              <h3 className="text-xl font-semibold mb-4">Aides et avantages fiscaux</h3>
              <ul className="space-y-2 mb-8">
                {[
                  "Prime à l'autoconsommation : jusqu'à 1 500 € pour 3 kWc",
                  "Revente du surplus à 0,13 €/kWh (tarif garanti 20 ans)",
                  "TVA à 10% pour les installations ≤ 3 kWc",
                  "Exonération d'impôt sur les revenus de revente (≤ 3 kWc)"
                ].map((aide, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{aide}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90 w-full">
                <Link to="/contact" className="flex items-center justify-center gap-2">
                  Demander une étude gratuite <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-supreme-primary text-center">Questions fréquentes sur le solaire</h2>
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
        keywords={["panneaux solaires", "photovoltaïque", "autoconsommation", "solaire"]}
        title="Pour aller plus loin sur le solaire"
      />

      <RelatedServices excludeSlug="panneaux-solaires" title="Découvrez aussi" />

      <CTA title="Prêt à produire votre propre énergie ?" subtitle="Contactez-nous pour une étude de faisabilité gratuite et découvrez le potentiel solaire de votre toiture." />
    </div>
  );
};

export default PanneauxSolaires;
