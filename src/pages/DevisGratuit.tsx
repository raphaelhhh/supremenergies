import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, Clock, Euro, Award, Star, ShieldCheck, ArrowRight } from "lucide-react";
import heroImage from "@/assets/energy-label.png";

const QUOTE_FORM = "https://docs.google.com/forms/d/e/1FAIpQLScnhgMR8AwvJG2UkAibutS6EHPI-a-lLnFNqjtOdlpsrBXBcQ/viewform?usp=header";

const DevisGratuit = () => {
  return (
    <div>
      <Helmet>
        <title>Devis Gratuit Rénovation Énergétique 48h | Jusqu'à 11 000€ d'aides</title>
        <meta
          name="description"
          content="✓ Devis gratuit et sans engagement en 48h. Pompe à chaleur, isolation, solaire. Jusqu'à 11 000€ d'aides MaPrimeRénov' 2026. Experts en Île-de-France. ★ 4.8/5"
        />
        <link rel="canonical" href="https://supremenergies.com/devis-gratuit" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Devis Gratuit Rénovation Énergétique 48h | Jusqu'à 11 000€ d'aides" />
        <meta property="og:description" content="Devis gratuit et sans engagement en 48h. Experts rénovation énergétique en Île-de-France." />
      </Helmet>

      {/* Hero offer */}
      <section className="bg-gradient-to-br from-supreme-light via-white to-supreme-light/40 py-12 md:py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-supreme-primary/10 text-supreme-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">
                <Clock className="h-4 w-4" /> Réponse sous 48h
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Obtenez votre <span className="text-supreme-primary">devis gratuit</span> en 48h
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Jusqu'à <strong className="text-supreme-primary">11 000€ d'aides</strong> MaPrimeRénov' 2026
                pour votre rénovation énergétique. Sans engagement, 100% gratuit.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Devis détaillé personnalisé sous 48h",
                  "Estimation des aides (MaPrimeRénov', CEE, éco-PTZ)",
                  "Conseiller dédié à votre projet",
                  "Garantie décennale sur tous les travaux",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-supreme-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 mb-6">
                <Button asChild size="lg" className="bg-supreme-primary hover:bg-supreme-primary/90 text-white text-lg px-8 py-6">
                  <a href={QUOTE_FORM} target="_blank" rel="noopener noreferrer">
                    Demander mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
                  <a href="tel:0186046889" className="flex items-center gap-2">
                    <Phone className="h-5 w-5" /> 01 86 04 68 89
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                  <span className="ml-1 font-semibold">4.8/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-supreme-primary" /> Garantie décennale
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-supreme-primary" /> +1000 projets réalisés
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <img src={heroImage} alt="Aides MaPrimeRénov' 2026 rénovation énergétique" className="rounded-2xl shadow-2xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Aids breakdown */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-10">
            Combien d'aides pouvez-vous toucher en <span className="text-supreme-primary">2026</span> ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Pompe à chaleur air/eau", amount: "Jusqu'à 5 000€", note: "MaPrimeRénov' + CEE cumulables" },
              { title: "Isolation des combles", amount: "Jusqu'à 75€/m²", note: "Quasi gratuit pour foyers modestes" },
              { title: "Rénovation globale", amount: "Jusqu'à 11 000€", note: "Bonus performance énergétique" },
            ].map((aid) => (
              <div key={aid.title} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                <Euro className="h-8 w-8 text-supreme-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2">{aid.title}</h3>
                <div className="text-2xl font-bold text-supreme-primary mb-2">{aid.amount}</div>
                <p className="text-sm text-gray-600">{aid.note}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-supreme-primary hover:bg-supreme-primary/90">
              <Link to="/simulateur-aides">Calculer mes aides en 2 min</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-supreme-light">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à lancer votre projet ?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Recevez votre devis personnalisé sous 48h. Sans engagement, 100% gratuit.
          </p>
          <Button asChild size="lg" className="bg-supreme-primary hover:bg-supreme-primary/90 text-white text-lg px-10 py-6">
            <a href={QUOTE_FORM} target="_blank" rel="noopener noreferrer">
              Demander mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DevisGratuit;
