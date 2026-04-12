import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import { ThermometerSun, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqItems = [
  { question: "Combien coûte l'isolation des combles ?", answer: "Le coût de l'isolation des combles varie de 20 à 60 €/m² selon la technique (soufflage, panneaux, rouleaux). Avec les aides MaPrimeRénov' et CEE, le reste à charge peut descendre sous 10 €/m²." },
  { question: "Quelle est la durée des travaux d'isolation ?", answer: "L'isolation des combles perdus prend généralement 1 journée. L'isolation des murs par l'extérieur (ITE) nécessite 1 à 3 semaines selon la surface. L'isolation par l'intérieur (ITI) prend 3 à 5 jours par pièce." },
  { question: "Quelles économies peut-on réaliser avec une bonne isolation ?", answer: "Une isolation performante permet de réduire vos factures de chauffage de 25 à 50%. L'isolation des combles seule peut représenter jusqu'à 30% d'économies, car c'est par le toit que s'échappent le plus de calories." },
  { question: "Quels matériaux isolants utilisez-vous ?", answer: "Nous travaillons avec des isolants minéraux (laine de verre, laine de roche), des isolants biosourcés (laine de bois, ouate de cellulose) et des isolants synthétiques (polystyrène, polyuréthane). Le choix dépend de votre projet et de vos priorités." }
];

const IsolationThermique = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Isolation Thermique",
    "provider": {
      "@type": "LocalBusiness",
      "name": "SupremEnergies",
      "telephone": "01 86 04 68 89",
      "address": { "@type": "PostalAddress", "streetAddress": "55 rue Cartier Bresson", "addressLocality": "Pantin", "postalCode": "93500", "addressCountry": "FR" }
    },
    "areaServed": "Île-de-France",
    "description": "Solutions d'isolation thermique pour combles, murs, fenêtres et planchers. Réduisez vos pertes de chaleur et vos factures énergétiques.",
    "serviceType": "Isolation thermique"
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
      <Helmet>
        <title>Isolation Thermique en Île-de-France | SupremEnergies</title>
        <meta name="description" content="Expert en isolation thermique : combles, murs (ITE/ITI), fenêtres, planchers. Réduisez vos factures de 25 à 50%. Devis gratuit, aides MaPrimeRénov' 2026. SupremEnergies, Île-de-France." />
        <link rel="canonical" href="https://supremenergies.com/services/isolation-thermique" />
        <meta property="og:title" content="Isolation Thermique en Île-de-France | SupremEnergies" />
        <meta property="og:description" content="Solutions d'isolation thermique pour combles, murs, fenêtres. Devis gratuit, aides financières." />
        <meta property="og:url" content="https://supremenergies.com/services/isolation-thermique" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Hero
        title="Isolation Thermique"
        subtitle="Réduisez vos pertes de chaleur jusqu'à 30% et vos factures énergétiques grâce à nos solutions d'isolation performantes."
        buttonText="Demander un devis gratuit"
        buttonLink="/contact"
        imageSrc="https://github.com/raphaelhhh/supremenergies/raw/main/src/pages/travailleur-lunettes-protection-respirateur-isolant-isolant-laine-roche-dans-cadre-bois-pour-futurs-murs-maison-pour-barriere-contre-froid-concept-accueil-economie-construction-renovation-chaleureux-confortable_127089-6625.avif"
        imageAlt="Isolation thermique des murs et combles"
      />

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-supreme-primary">Pourquoi isoler votre logement ?</h2>
              <p className="text-lg mb-4 text-gray-700">
                Une bonne isolation est la base d'un logement économe en énergie. Sans elle, jusqu'à 30% de la chaleur s'échappe par le toit, 25% par les murs et 15% par les fenêtres.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                Investir dans l'isolation, c'est réduire durablement vos factures de chauffage, améliorer votre confort été comme hiver, et valoriser votre patrimoine immobilier.
              </p>

              <h3 className="text-xl font-semibold mb-4">Nos solutions d'isolation</h3>
              <ul className="space-y-3 mb-8">
                {[
                  { title: "Isolation des combles", desc: "Soufflage ou panneaux pour combles perdus et aménagés. Jusqu'à 30% d'économies." },
                  { title: "Isolation des murs par l'extérieur (ITE)", desc: "La plus performante. Supprime les ponts thermiques sans réduire la surface habitable." },
                  { title: "Isolation des murs par l'intérieur (ITI)", desc: "Solution économique, idéale quand l'ITE n'est pas possible." },
                  { title: "Remplacement des fenêtres", desc: "Double ou triple vitrage pour une meilleure performance thermique et acoustique." },
                  { title: "Isolation des planchers bas", desc: "Sous-sols et vides sanitaires pour éliminer la sensation de froid au sol." }
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
              <h3 className="text-xl font-semibold mb-4">Les matériaux que nous utilisons</h3>
              <div className="space-y-4 mb-8">
                {[
                  { title: "Laine de verre", desc: "Excellent rapport qualité-prix, résistance au feu, idéale pour les combles." },
                  { title: "Laine de roche", desc: "Performance thermique et acoustique supérieure, incombustible." },
                  { title: "Laine de bois", desc: "Isolant biosourcé avec un excellent déphasage thermique — confort été comme hiver." },
                  { title: "Ouate de cellulose", desc: "Écologique, issue du recyclage, excellente performance été/hiver." },
                  { title: "Polystyrène expansé (PSE)", desc: "Léger, résistant à l'humidité, idéal pour l'ITE." }
                ].map((mat, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 className="font-semibold text-supreme-primary">{mat.title}</h4>
                    <p className="text-gray-600 text-sm">{mat.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-4">Aides financières disponibles</h3>
              <ul className="space-y-2 mb-8">
                {[
                  "MaPrimeRénov' : jusqu'à 75 €/m² pour l'ITE selon vos revenus",
                  "CEE (Certificats d'Économies d'Énergie) : primes complémentaires",
                  "Éco-PTZ : emprunt à taux zéro jusqu'à 50 000 €",
                  "TVA à 5,5% au lieu de 20%"
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

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-supreme-primary text-center">Questions fréquentes sur l'isolation</h2>
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

      <CTA title="Prêt à isoler votre logement ?" subtitle="Contactez-nous pour un diagnostic gratuit et un devis personnalisé. Nos experts vous accompagnent de A à Z." />
    </div>
  );
};

export default IsolationThermique;
