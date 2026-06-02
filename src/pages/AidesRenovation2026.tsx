import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Euro, FileText, ShieldCheck, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Breadcrumb from "@/components/Breadcrumb";
import SeoBreadcrumb from "@/components/SeoBreadcrumb";
import LeadForm from "@/components/LeadForm";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import CTA from "@/components/CTA";

const SITE = "https://supremenergies.com";
const CANONICAL = `${SITE}/aides-renovation-2026`;

/**
 * Pillar SEO page : « Aides rénovation énergétique 2026 ».
 * Cible longue traîne haute intention :
 *  - "aides renovation 2026"
 *  - "maprimerenov 2026 montant"
 *  - "cumul maprimerenov cee"
 *  - "barème anah 2026"
 */
const AidesRenovation2026 = () => {
  const title = "Aides Rénovation Énergétique 2026 — Guide Complet | MaPrimeRénov', CEE, Éco-PTZ";
  const description =
    "Toutes les aides rénovation énergétique 2026 : MaPrimeRénov' jusqu'à 11 000 €, CEE, Éco-PTZ 50 000 €, TVA 5,5 %. Barème ANAH, cumul, simulateur gratuit.";

  const faqs = [
    {
      q: "Quel est le montant maximum de MaPrimeRénov' en 2026 ?",
      a: "MaPrimeRénov' peut atteindre 11 000 € pour un changement de chauffage (pompe à chaleur géothermique, ménage très modeste). Pour une rénovation globale via le Parcours Accompagné, le plafond monte jusqu'à 70 000 € de travaux subventionnés à hauteur de 30 à 90 % selon vos revenus et le saut de classes énergétiques visé.",
    },
    {
      q: "Peut-on cumuler MaPrimeRénov' et les CEE en 2026 ?",
      a: "Oui, MaPrimeRénov' et les Certificats d'Économies d'Énergie (CEE) sont cumulables sur la majorité des travaux : isolation, pompe à chaleur, ventilation. Le cumul réduit fortement votre reste à charge — souvent jusqu'à 90 % pour les ménages très modestes.",
    },
    {
      q: "Quel est le barème ANAH 2026 par tranche de revenus ?",
      a: "L'ANAH classe les ménages en 4 catégories : Bleu (très modeste), Jaune (modeste), Violet (intermédiaire), Rose (supérieur). En Île-de-France, une personne seule entre dans la catégorie Bleu jusqu'à 23 768 € de revenu fiscal de référence, Jaune jusqu'à 28 933 €, Violet jusqu'à 40 404 €. Les montants varient hors IDF.",
    },
    {
      q: "L'Éco-PTZ 2026, c'est combien et pour qui ?",
      a: "L'Éco-PTZ (Prêt à Taux Zéro) finance jusqu'à 50 000 € de travaux de rénovation énergétique sans intérêts, remboursables sur 20 ans. Il est accessible à tous les propriétaires occupants, bailleurs et copropriétés, sans condition de ressources.",
    },
    {
      q: "Quels travaux bénéficient encore de la TVA à 5,5 % en 2026 ?",
      a: "Tous les travaux d'amélioration énergétique réalisés par un professionnel qualifié : isolation, chauffage performant (PAC, chaudière biomasse), ventilation double-flux, fenêtres double-vitrage. La TVA réduite s'applique à la main-d'œuvre ET aux matériaux fournis par l'entreprise.",
    },
    {
      q: "Comment monter un dossier MaPrimeRénov' sans se tromper ?",
      a: "Étape 1 : créer son compte sur maprimerenov.gouv.fr avant tout devis. Étape 2 : obtenir le devis d'un professionnel qualifié. Étape 3 : déposer la demande EN LIGNE avant le démarrage des travaux. Étape 4 : envoyer la facture une fois les travaux finis. SupremEnergies se charge de l'ensemble du dossier pour vous.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Obtenir MaPrimeRénov' 2026 en 5 étapes",
    description:
      "Procédure officielle 2026 pour obtenir MaPrimeRénov' sur votre projet de rénovation énergétique.",
    totalTime: "P30D",
    step: [
      { "@type": "HowToStep", name: "Créer un compte ANAH", text: "Inscrivez-vous sur maprimerenov.gouv.fr avant tout devis." },
      { "@type": "HowToStep", name: "Demander un devis qualifié", text: "Faites établir un devis par un professionnel qualifié sur les travaux éligibles." },
      { "@type": "HowToStep", name: "Déposer la demande en ligne", text: "Joindre le devis et attendre la notification d'octroi (15 à 30 jours)." },
      { "@type": "HowToStep", name: "Réaliser les travaux", text: "Démarrer uniquement après l'accord ANAH, sinon perte de l'aide." },
      { "@type": "HowToStep", name: "Envoyer la facture", text: "Téléverser la facture pour déclencher le versement sous 1 à 3 mois." },
    ],
  };

  return (
    <div>
      <SeoBreadcrumb
        items={[
          { name: "Accueil", url: "/" },
          { name: "Aides rénovation 2026", url: CANONICAL },
        ]}
      />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="fr-FR" href={CANONICAL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fr_FR" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-supreme-primary to-supreme-primary/80 text-white py-14 md:py-20">
        <div className="container-custom">
          <Breadcrumb items={[{ label: "Aides rénovation 2026" }]} />
          <div className="grid lg:grid-cols-5 gap-10 items-start mt-4">
            <div className="lg:col-span-3">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Aides rénovation énergétique 2026 : le guide complet
              </h1>
              <p className="text-lg md:text-xl text-white/95 mb-6">
                MaPrimeRénov', CEE, Éco-PTZ, TVA 5,5 %, aides locales : jusqu'à
                <strong> 90 % de vos travaux financés</strong> en 2026. On vous explique tout, on
                monte votre dossier.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                <li className="flex items-start gap-2 text-white">
                  <CheckCircle2 className="flex-shrink-0 mt-0.5" size={20} />
                  <span>Jusqu'à <strong>11 000 €</strong> de MaPrimeRénov'</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <CheckCircle2 className="flex-shrink-0 mt-0.5" size={20} />
                  <span>Jusqu'à <strong>70 000 €</strong> en Parcours Accompagné</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <CheckCircle2 className="flex-shrink-0 mt-0.5" size={20} />
                  <span>Éco-PTZ <strong>50 000 € sans intérêts</strong></span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <CheckCircle2 className="flex-shrink-0 mt-0.5" size={20} />
                  <span>Cumul <strong>CEE + MaPrimeRénov'</strong></span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-supreme-accent hover:bg-supreme-accent/90 text-white px-6 py-6 text-lg">
                  <Link to="/simulateur-aides" className="flex items-center gap-2">
                    Simuler mes aides en 60 s <ArrowRight size={18} />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2">
              <LeadForm
                source="pillar-aides-2026"
                title="Recevez votre simulation personnalisée"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vue d'ensemble */}
      <section className="py-14 bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Les 5 aides à connaître en 2026</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: Euro,
                title: "MaPrimeRénov' 2026",
                text: "Aide principale de l'État, modulée selon vos revenus (Bleu, Jaune, Violet, Rose). Jusqu'à 11 000 € pour un changement de chauffage, jusqu'à 70 000 € en Parcours Accompagné.",
              },
              {
                icon: ShieldCheck,
                title: "Certificats d'Économies d'Énergie (CEE)",
                text: "Financés par les fournisseurs d'énergie. Coup de pouce chauffage et isolation : prime directe versée par votre installateur. Cumul avec MaPrimeRénov'.",
              },
              {
                icon: FileText,
                title: "Éco-PTZ 2026",
                text: "Prêt à taux zéro jusqu'à 50 000 € pour financer le reste à charge, sur 20 ans. Sans condition de ressources, accessible à tous les propriétaires.",
              },
              {
                icon: Calculator,
                title: "TVA réduite à 5,5 %",
                text: "Tous les travaux d'amélioration énergétique réalisés par un professionnel qualifié : main-d'œuvre + matériaux fournis par l'entreprise.",
              },
              {
                icon: Euro,
                title: "Aides locales (région, département, ville)",
                text: "Ville de Paris (Éco-rénovons Paris+), Région Hauts-de-France (Pass Rénovation), Département 92, etc. Nous identifions tous les dispositifs cumulables sur votre adresse.",
              },
              {
                icon: ShieldCheck,
                title: "Chèque énergie",
                text: "Aide automatique versée chaque printemps aux foyers modestes (jusqu'à 277 €/an), utilisable pour les factures ou les travaux énergétiques.",
              },
            ].map(({ icon: Icon, title: t, text }) => (
              <div key={t} className="p-6 bg-supreme-light rounded-xl border border-gray-100">
                <Icon className="text-supreme-primary mb-3" size={28} />
                <h3 className="font-bold text-lg mb-2 text-gray-900">{t}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barème ANAH 2026 */}
      <section className="py-14 bg-gray-50">
        <div className="container-custom max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Barème ANAH 2026 : à quelle catégorie appartenez-vous ?
          </h2>
          <p className="text-gray-700 mb-6">
            Le montant de MaPrimeRénov' dépend de votre <strong>revenu fiscal de référence</strong>{" "}
            (avis d'imposition N-1) et de la composition de votre foyer. Voici les plafonds 2026
            pour l'Île-de-France :
          </p>
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-supreme-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Personnes au foyer</th>
                  <th className="px-4 py-3 text-left">Bleu (très modeste)</th>
                  <th className="px-4 py-3 text-left">Jaune (modeste)</th>
                  <th className="px-4 py-3 text-left">Violet (intermédiaire)</th>
                  <th className="px-4 py-3 text-left">Rose (supérieur)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["1", "23 768 €", "28 933 €", "40 404 €", "> 40 404 €"],
                  ["2", "34 884 €", "42 463 €", "59 394 €", "> 59 394 €"],
                  ["3", "41 893 €", "51 000 €", "71 060 €", "> 71 060 €"],
                  ["4", "48 914 €", "59 549 €", "83 637 €", "> 83 637 €"],
                  ["5", "55 961 €", "68 123 €", "95 758 €", "> 95 758 €"],
                ].map(([n, b, j, v, r]) => (
                  <tr key={n}>
                    <td className="px-4 py-3 font-semibold">{n}</td>
                    <td className="px-4 py-3">{b}</td>
                    <td className="px-4 py-3">{j}</td>
                    <td className="px-4 py-3">{v}</td>
                    <td className="px-4 py-3">{r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Source : Agence nationale de l'habitat — barèmes 2026 Île-de-France. Plafonds différents
            hors IDF.
          </p>
        </div>
      </section>

      {/* Aides par type de travaux */}
      <section className="py-14 bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Combien pour chaque type de travaux ?
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Pompe à chaleur air/eau",
                aid: "Jusqu'à 5 000 € MaPrimeRénov' + 4 000 € CEE = 9 000 €",
                link: "/services/pompe-a-chaleur",
              },
              {
                title: "Isolation des combles perdus",
                aid: "Jusqu'à 25 €/m² MaPrimeRénov' + 12 €/m² CEE, reste à charge dès 1 €",
                link: "/services/isolation-thermique",
              },
              {
                title: "Isolation des murs par l'extérieur (ITE)",
                aid: "Jusqu'à 75 €/m² MaPrimeRénov' + 20 €/m² CEE",
                link: "/services/isolation-thermique",
              },
              {
                title: "Panneaux solaires photovoltaïques (autoconsommation)",
                aid: "Prime à l'autoconsommation jusqu'à 1 080 € + TVA 10 %",
                link: "/services/panneaux-solaires",
              },
              {
                title: "Rénovation globale (Parcours Accompagné)",
                aid: "Jusqu'à 70 000 € de travaux subventionnés à 30-90 %",
                link: "/services/renovation-globale",
              },
            ].map((row) => (
              <Link
                key={row.title}
                to={row.link}
                className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-5 border border-gray-200 rounded-lg hover:border-supreme-primary hover:bg-supreme-light transition-colors"
              >
                <div>
                  <h3 className="font-bold text-gray-900">{row.title}</h3>
                  <p className="text-gray-700 text-sm mt-1">{row.aid}</p>
                </div>
                <ArrowRight className="text-supreme-primary flex-shrink-0" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead magnet PDF */}
      <section className="py-14 bg-white">
        <div className="container-custom max-w-3xl">
          <LeadMagnetForm source="pillar_aides2026_end" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            FAQ — Aides rénovation 2026
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-gray-700">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTA
        title="Estimez vos aides 2026 en 60 secondes"
        subtitle="Simulateur officiel basé sur le barème ANAH 2026 — résultat immédiat, sans engagement."
      />
    </div>
  );
};

export default AidesRenovation2026;
