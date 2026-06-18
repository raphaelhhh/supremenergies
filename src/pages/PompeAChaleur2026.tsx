import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import RelatedZones from "@/components/RelatedZones";
import {
  CheckCircle2,
  ArrowRight,
  Phone,
  TrendingDown,
  Award,
  Wrench,
  Euro,
  Zap,
  ShieldCheck,
} from "lucide-react";

const CANONICAL = "https://supremenergies.com/pompe-a-chaleur-2026";

const faqs = [
  {
    q: "Quel est le prix d'une pompe à chaleur air/eau en 2026 ?",
    a: "Le prix d'une PAC air/eau pour une maison de 100 m² varie entre 11 000 € et 16 000 € pose comprise. Avec MaPrimeRénov' + CEE, le reste à charge peut descendre à 3 000 € pour les foyers modestes.",
  },
  {
    q: "Quelles aides pour installer une pompe à chaleur en 2026 ?",
    a: "MaPrimeRénov' (jusqu'à 5 000 € pour une PAC air/eau, 11 000 € en rénovation globale), Coup de pouce chauffage CEE (jusqu'à 5 000 €), éco-PTZ jusqu'à 50 000 € et TVA 5,5%. Toutes ces aides sont cumulables.",
  },
  {
    q: "PAC air/air ou air/eau : laquelle choisir ?",
    a: "La PAC air/eau remplace une chaudière sur un circuit existant (radiateurs ou plancher chauffant) et donne droit à MaPrimeRénov'. La PAC air/air (climatisation réversible) chauffe et rafraîchit, mais n'est pas éligible à MaPrimeRénov'.",
  },
  {
    q: "Quel COP viser pour une pompe à chaleur ?",
    a: "Visez un COP nominal ≥ 4 et un SCOP ≥ 4 pour bénéficier des aides maximales. Les meilleurs modèles 2026 (R290) atteignent un SCOP de 4,5 à 5.",
  },
  {
    q: "Combien d'économies avec une pompe à chaleur ?",
    a: "Une PAC air/eau bien dimensionnée réduit la facture de chauffage de 50 à 70 % par rapport à une chaudière fioul, et de 30 à 50 % par rapport au gaz. Économies typiques : 800 à 1 800 €/an.",
  },
  {
    q: "Combien de temps dure l'installation ?",
    a: "Comptez 2 à 3 jours pour la pose d'une PAC air/eau en remplacement de chaudière, en gardant le circuit existant. 1 jour de plus si plancher chauffant à raccorder.",
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

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Installation de pompe à chaleur 2026",
  serviceType: "Installation pompe à chaleur air/eau",
  provider: {
    "@type": "LocalBusiness",
    name: "SupremEnergies",
    telephone: "+33186046889",
    url: "https://supremenergies.com",
  },
  areaServed: { "@type": "Country", name: "France" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "3000",
    highPrice: "16000",
    offerCount: "12",
  },
};

const PompeAChaleur2026 = () => (
  <div>
    <Helmet>
      <title>Pompe à chaleur 2026 : prix, aides & installation</title>
      <meta
        name="description"
        content="Guide complet pompe à chaleur 2026 : prix, MaPrimeRénov' jusqu'à 5 000 €, COP & SCOP, comparatif air/eau vs air/air, installation en 48h. Devis gratuit."
      />
      <link rel="canonical" href={CANONICAL} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Pompe à chaleur 2026 : prix, aides, COP et installation" />
      <meta property="og:description" content="Tout savoir sur la PAC en 2026 : aides, économies, technologies, devis gratuit." />
      <meta property="og:url" content={CANONICAL} />
      <meta property="og:type" content="article" />
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
    </Helmet>

    <Breadcrumb items={[{ label: "Pompe à chaleur 2026" }]} />

    {/* Hero */}
    <section className="bg-gradient-to-br from-supreme-light via-white to-supreme-light/40 py-12 md:py-16">
      <div className="container-custom">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-supreme-primary/10 text-supreme-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">
            <Award className="h-4 w-4" /> Guide complet 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Pompe à chaleur 2026 : <span className="text-supreme-primary">prix, aides et installation</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Tout ce qu'il faut savoir pour choisir, financer et installer la pompe à chaleur idéale
            en 2026 : barèmes MaPrimeRénov', COP, comparatif air/eau vs air/air, économies réelles.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-supreme-primary hover:bg-supreme-primary/90">
              <Link to="/devis-gratuit">
                Devis gratuit en 48h <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="tel:0186046889">
                <Phone className="h-5 w-5 mr-2" /> 01 86 04 68 89
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* TOC + body */}
    <section className="py-12 md:py-16">
      <div className="container-custom max-w-4xl">
        <div className="bg-supreme-light/40 border border-gray-200 rounded-xl p-5 mb-10">
          <h2 className="font-semibold mb-3 text-supreme-dark">Au sommaire</h2>
          <ol className="grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-supreme-primary">
            <li><a href="#prix" className="hover:underline">1. Prix d'une PAC en 2026</a></li>
            <li><a href="#aides" className="hover:underline">2. Aides et MaPrimeRénov'</a></li>
            <li><a href="#cop" className="hover:underline">3. COP, SCOP et performance</a></li>
            <li><a href="#comparatif" className="hover:underline">4. Air/eau vs Air/air</a></li>
            <li><a href="#installation" className="hover:underline">5. Installation pas à pas</a></li>
            <li><a href="#economies" className="hover:underline">6. Économies réelles</a></li>
            <li><a href="#faq" className="hover:underline">7. FAQ</a></li>
          </ol>
        </div>

        <article className="prose prose-lg max-w-none prose-headings:text-supreme-dark prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-strong:text-supreme-dark prose-a:text-supreme-primary">
          <p>
            La pompe à chaleur (PAC) est devenue en 2026 <strong>le système de chauffage le plus subventionné en France</strong>,
            avec jusqu'à <strong>11 000 € d'aides cumulées</strong> en rénovation globale. Encore faut-il choisir
            la bonne technologie, le bon installateur et tirer parti de toutes les primes disponibles.
          </p>

          <h2 id="prix">1. Prix d'une pompe à chaleur en 2026</h2>
          <p>
            Les prix 2026 sont stables après deux années de hausse, portés par l'arrivée massive des modèles
            R290 (propane) plus performants. Voici les fourchettes constatées pose comprise :
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-supreme-light/60">
                <tr>
                  <th className="text-left p-3">Type de PAC</th>
                  <th className="text-left p-3">Surface adaptée</th>
                  <th className="text-left p-3">Prix moyen (pose comprise)</th>
                  <th className="text-left p-3">Reste à charge ménage modeste</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">PAC air/eau</td>
                  <td className="p-3">80 – 200 m²</td>
                  <td className="p-3">11 000 – 16 000 €</td>
                  <td className="p-3 font-semibold text-supreme-primary">≈ 3 000 €</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">PAC air/air (climatisation réversible)</td>
                  <td className="p-3">50 – 150 m²</td>
                  <td className="p-3">4 000 – 9 000 €</td>
                  <td className="p-3">Non éligible MPR</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">PAC géothermique (sol/eau)</td>
                  <td className="p-3">100 – 250 m²</td>
                  <td className="p-3">18 000 – 28 000 €</td>
                  <td className="p-3">≈ 6 000 €</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">PAC hybride (PAC + chaudière)</td>
                  <td className="p-3">100 – 200 m²</td>
                  <td className="p-3">9 000 – 13 000 €</td>
                  <td className="p-3">≈ 4 000 €</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="aides">2. Aides disponibles en 2026</h2>
          <p>
            Le cumul d'aides reste le levier n°1 pour rentabiliser une PAC. Détail des dispositifs actifs en 2026 :
          </p>
          <ul>
            <li><strong>MaPrimeRénov'</strong> : 2 000 à 5 000 € pour une PAC air/eau selon revenus (jusqu'à 11 000 € en rénovation globale).</li>
            <li><strong>Coup de pouce chauffage (CEE)</strong> : 4 000 à 5 000 € selon le foyer pour remplacer fioul/gaz par une PAC.</li>
            <li><strong>Éco-PTZ</strong> : jusqu'à 50 000 € à taux zéro sur 20 ans.</li>
            <li><strong>TVA 5,5 %</strong> sur l'équipement et la pose.</li>
            <li><strong>Aides locales</strong> : conseil régional, département, métropole (variables).</li>
          </ul>
          <p>
            Notre <Link to="/simulateur-aides">simulateur d'aides 2026</Link> calcule en 2 minutes le montant
            exact auquel vous avez droit selon vos revenus et votre commune.
          </p>

          <div className="my-8 not-prose">
            <LeadMagnetForm
              source="pillar_pac2026_mid"
              title="Recevez le détail des aides 2026 par email"
              subtitle="Barèmes MaPrimeRénov', CEE, éco-PTZ, plafonds et exemples chiffrés. PDF gratuit."
            />
          </div>

          <h2 id="cop">3. COP, SCOP et performance énergétique</h2>
          <p>
            Le <strong>COP</strong> (Coefficient de Performance) mesure le ratio d'énergie restituée par kWh consommé.
            Le <strong>SCOP</strong> (Seasonal COP) est plus réaliste car il prend en compte les variations saisonnières.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-supreme-light/60">
                <tr>
                  <th className="text-left p-3">Indicateur</th>
                  <th className="text-left p-3">Niveau correct</th>
                  <th className="text-left p-3">Excellent (top 10 % 2026)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t"><td className="p-3">COP nominal</td><td className="p-3">≥ 3,5</td><td className="p-3 font-semibold text-supreme-primary">≥ 4,5</td></tr>
                <tr className="border-t"><td className="p-3">SCOP</td><td className="p-3">≥ 3,8</td><td className="p-3 font-semibold text-supreme-primary">≥ 4,8</td></tr>
                <tr className="border-t"><td className="p-3">ETAS (efficacité saisonnière)</td><td className="p-3">≥ 126 %</td><td className="p-3 font-semibold text-supreme-primary">≥ 180 %</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            Un SCOP de 4 signifie que pour 1 kWh d'électricité consommée, la PAC restitue 4 kWh de chaleur.
            <strong> Visez toujours un SCOP ≥ 4</strong> pour rester éligible à MaPrimeRénov'.
          </p>

          <h2 id="comparatif">4. Air/eau vs Air/air : que choisir ?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-supreme-light/60">
                <tr>
                  <th className="text-left p-3">Critère</th>
                  <th className="text-left p-3">PAC air/eau</th>
                  <th className="text-left p-3">PAC air/air</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t"><td className="p-3 font-semibold">MaPrimeRénov'</td><td className="p-3">✅ Jusqu'à 5 000 €</td><td className="p-3">❌ Non éligible</td></tr>
                <tr className="border-t"><td className="p-3 font-semibold">Eau chaude sanitaire</td><td className="p-3">✅ Souvent intégrée</td><td className="p-3">❌ Non</td></tr>
                <tr className="border-t"><td className="p-3 font-semibold">Climatisation été</td><td className="p-3">⚠️ Selon modèle</td><td className="p-3">✅ Oui (réversible)</td></tr>
                <tr className="border-t"><td className="p-3 font-semibold">Compatible radiateurs existants</td><td className="p-3">✅ Oui</td><td className="p-3">❌ Non (splits intérieurs)</td></tr>
                <tr className="border-t"><td className="p-3 font-semibold">Coût installation</td><td className="p-3">11 000 – 16 000 €</td><td className="p-3">4 000 – 9 000 €</td></tr>
                <tr className="border-t"><td className="p-3 font-semibold">Idéal pour</td><td className="p-3">Remplacer chaudière fioul/gaz</td><td className="p-3">Remplacer convecteurs électriques</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="installation">5. Installation : étapes clés (HowTo)</h2>
          <ol>
            <li><strong>Audit thermique gratuit</strong> : dimensionnement précis selon la déperdition de votre logement.</li>
            <li><strong>Devis détaillé</strong> + montage du dossier MaPrimeRénov' & CEE.</li>
            <li><strong>Validation</strong> des aides avant démarrage (sous 15 jours).</li>
            <li><strong>Pose</strong> de l'unité extérieure + module hydraulique (2 à 3 jours).</li>
            <li><strong>Mise en service</strong>, équilibrage, formation utilisateur.</li>
            <li><strong>Versement</strong> de MaPrimeRénov' sous 1 à 3 mois après facture.</li>
          </ol>

          <h2 id="economies">6. Économies réelles : nos retours terrain</h2>
          <div className="grid sm:grid-cols-3 gap-4 not-prose my-6">
            {[
              { icon: <TrendingDown className="h-6 w-6 text-supreme-primary" />, t: "−65 %", s: "Remplacement chaudière fioul" },
              { icon: <Euro className="h-6 w-6 text-supreme-primary" />, t: "1 600 €/an", s: "Économies moyennes 130 m²" },
              { icon: <Zap className="h-6 w-6 text-supreme-primary" />, t: "5 à 8 ans", s: "Retour sur investissement" },
            ].map((b) => (
              <div key={b.t} className="border border-gray-200 rounded-xl p-5 bg-white">
                <div className="mb-2">{b.icon}</div>
                <div className="text-2xl font-bold text-supreme-dark">{b.t}</div>
                <div className="text-sm text-gray-600 mt-1">{b.s}</div>
              </div>
            ))}
          </div>
          <p>
            Voir aussi : <Link to="/services/pompe-a-chaleur">notre service Pompe à chaleur</Link> ·
            <Link to="/aides-renovation-2026"> Guide complet des aides 2026</Link> ·
            <Link to="/simulateur-aides"> Simulateur d'aides</Link>.
          </p>

          <h2 id="faq">7. Questions fréquentes</h2>
          {faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </article>

        <div className="mt-12 grid md:grid-cols-3 gap-4 not-prose">
          {[
            { icon: <Wrench className="h-6 w-6" />, t: "Pose en 48h" },
            { icon: <ShieldCheck className="h-6 w-6" />, t: "Garantie décennale" },
            { icon: <CheckCircle2 className="h-6 w-6" />, t: "Aides garanties" },
          ].map((b) => (
            <div key={b.t} className="flex items-center gap-3 bg-supreme-light/40 border border-gray-200 rounded-xl p-4">
              <div className="text-supreme-primary">{b.icon}</div>
              <div className="font-semibold">{b.t}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-supreme-light rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Prêt à installer votre pompe à chaleur ?</h3>
          <p className="text-gray-700 mb-5">Devis personnalisé sous 48h, 100 % gratuit et sans engagement.</p>
          <Button asChild size="lg" className="bg-supreme-primary hover:bg-supreme-primary/90">
            <Link to="/devis-gratuit">
              Demander mon devis <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>

    <RelatedZones
      serviceSlug="pompe-a-chaleur"
      serviceName="Pompe à chaleur"
      title="Installation de pompe à chaleur près de chez vous"
      subtitle="SupremEnergies installe des PAC dans toute l'Île-de-France et les Hauts-de-France."
      limit={12}
    />
  </div>
);

export default PompeAChaleur2026;
