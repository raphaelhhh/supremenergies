import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import SeoBreadcrumb from "@/components/SeoBreadcrumb";
import RelatedServices from "@/components/RelatedServices";
import { Home, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqItems = [
  { question: "Quelle pompe à chaleur choisir ?", answer: "La PAC air/eau est idéale pour remplacer une chaudière et alimenter radiateurs ou plancher chauffant. La PAC air/air convient pour chauffer et climatiser. La PAC géothermique offre le meilleur rendement toute l'année mais nécessite un terrain." },
  { question: "Combien coûte une pompe à chaleur ?", answer: "Le coût varie de 8 000 à 18 000 € selon le type et la puissance. Avec MaPrimeRénov' (jusqu'à 5 000 €) et les CEE, le reste à charge peut être considérablement réduit." },
  { question: "Quelles économies avec une pompe à chaleur ?", answer: "Une PAC permet de réaliser 50 à 75% d'économies par rapport à un chauffage électrique classique, et jusqu'à 40% par rapport à une chaudière gaz. Le retour sur investissement est généralement de 5 à 8 ans." },
  { question: "Une PAC fonctionne-t-elle par grand froid ?", answer: "Les PAC modernes fonctionnent jusqu'à -15°C voire -25°C. En Île-de-France, elles couvrent 100% des besoins de chauffage. Un appoint électrique intégré prend le relais si nécessaire." }
];

const PompeAChaleur = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Installation de Pompes à Chaleur",
    "provider": {
      "@type": "LocalBusiness",
      "name": "SupremEnergies",
      "telephone": "01 86 04 68 89",
      "address": { "@type": "PostalAddress", "streetAddress": "55 rue Cartier Bresson", "addressLocality": "Pantin", "postalCode": "93500", "addressCountry": "FR" }
    },
    "areaServed": "Île-de-France",
    "description": "Installation de pompes à chaleur air/eau, air/air et géothermiques. Réduisez vos factures de chauffage de 50 à 75%.",
    "serviceType": "Installation pompe à chaleur"
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
        { name: "Pompe à chaleur", url: "/services/pompe-a-chaleur" },
      ]} />
      <Helmet>
        <title>Pompe à Chaleur en Île-de-France | Installation PAC | SupremEnergies</title>
        <meta name="description" content="Installation de pompes à chaleur air/eau, air/air et géothermiques en Île-de-France. Économisez 50 à 75% sur votre chauffage. Devis gratuit, aides MaPrimeRénov' 2026." />
        <link rel="canonical" href="https://supremenergies.com/services/pompe-a-chaleur" />
        <meta property="og:title" content="Pompe à Chaleur en Île-de-France | SupremEnergies" />
        <meta property="og:description" content="Installation PAC air/eau, air/air. Économies de 50 à 75%. Devis gratuit." />
        <meta property="og:url" content="https://supremenergies.com/services/pompe-a-chaleur" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Hero
        title="Pompes à Chaleur"
        subtitle="Divisez vos factures de chauffage par 3 à 4 grâce à une pompe à chaleur performante et écologique."
        buttonText="Demander un devis gratuit"
        buttonLink="/contact"
        imageSrc="https://raw.githubusercontent.com/raphaelhhh/supremenergies/main/src/pages/gettyimages-2160605901-612x612.jpg"
        imageAlt="Installation de pompe à chaleur"
      />

      <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: "Pompe à Chaleur" }]} />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-supreme-primary">Comment fonctionne une pompe à chaleur ?</h2>
              <p className="text-lg mb-4 text-gray-700">
                Une pompe à chaleur capte l'énergie gratuite présente dans l'environnement (air, eau ou sol) et la transfère à votre système de chauffage. Pour 1 kWh d'électricité consommé, elle produit 3 à 4 kWh de chaleur.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                C'est aujourd'hui la solution de chauffage la plus économique et écologique, recommandée par l'État dans le cadre de la transition énergétique.
              </p>

              <h3 className="text-xl font-semibold mb-4">Nos solutions PAC</h3>
              <ul className="space-y-3 mb-8">
                {[
                  { title: "PAC air/eau", desc: "Idéale pour remplacer une chaudière. Alimente radiateurs, plancher chauffant et eau chaude sanitaire." },
                  { title: "PAC air/air (climatisation réversible)", desc: "Chauffe en hiver, rafraîchit en été. Installation simple et rapide." },
                  { title: "PAC géothermique", desc: "Puise la chaleur du sol pour un rendement optimal et constant, même par grand froid." },
                  { title: "PAC hybride", desc: "Combine pompe à chaleur et chaudière gaz pour une efficacité maximale en toutes conditions." }
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
              <h3 className="text-xl font-semibold mb-4">Économies réalisables</h3>
              <div className="bg-supreme-light p-6 rounded-lg mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">vs chauffage électrique</span>
                    <span className="text-supreme-primary font-bold text-lg">-50 à -75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">vs chaudière gaz</span>
                    <span className="text-supreme-primary font-bold text-lg">-30 à -40%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">vs chaudière fioul</span>
                    <span className="text-supreme-primary font-bold text-lg">-50 à -60%</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Aides financières</h3>
              <ul className="space-y-2 mb-8">
                {[
                  "MaPrimeRénov' : jusqu'à 5 000 € pour une PAC air/eau",
                  "CEE : primes complémentaires de 2 500 à 4 000 €",
                  "Éco-PTZ : jusqu'à 50 000 € à taux zéro",
                  "TVA à 5,5%"
                ].map((aide, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{aide}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90 w-full">
                <Link to="/contact" className="flex items-center justify-center gap-2">
                  Demander un devis gratuit <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-supreme-primary text-center">Questions fréquentes sur les pompes à chaleur</h2>
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
        keywords={["pompe à chaleur", "PAC", "chauffage", "MaPrimeRénov"]}
        title="Pour aller plus loin sur la pompe à chaleur"
      />

      <RelatedServices excludeSlug="pompe-a-chaleur" title="Découvrez aussi" />

      <CTA title="Prêt à passer à la pompe à chaleur ?" subtitle="Contactez-nous pour un diagnostic gratuit et découvrez combien vous pouvez économiser." />
    </div>
  );
};

export default PompeAChaleur;
