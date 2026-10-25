import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, CheckCircle2, Home, MapPin, Phone, Thermometer, Users, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedArticles from "@/components/RelatedArticles";
import SeoBreadcrumb from "@/components/SeoBreadcrumb";
import RelatedServices from "@/components/RelatedServices";
import RelatedZones from "@/components/RelatedZones";
import installationPhoto from "../gettyimages-2160605901-612x612.jpg";
import { heatPumpCoverage } from "@/data/pompe-a-chaleur";

const faqItems = [
  { question: "Installez-vous des pompes à chaleur partout en France ?", answer: "Oui. Nos équipes réalisent les installations de pompes à chaleur partout en France. Indiquez votre commune et votre code postal dans la demande de devis : nous étudions votre logement et organisons l'intervention avec vous." },
  { question: "Qui réalise mon installation ?", answer: "L'installation est réalisée par les équipes de SupremEnergies. Nous vous accompagnons dans le choix de l'équipement, la préparation du chantier et la mise en service." },
  { question: "Quelle pompe à chaleur choisir pour ma maison ?", answer: "Le choix dépend de votre isolation, de la surface à chauffer, de votre chauffage actuel et du climat local. Une PAC air/eau peut alimenter des radiateurs ou un plancher chauffant ; une PAC air/air chauffe et peut rafraîchir les pièces. Une étude permet de choisir une puissance adaptée." },
  { question: "Quel est le prix d’une installation de pompe à chaleur ?", answer: "Le prix dépend de l'équipement, de sa puissance et des adaptations nécessaires dans votre logement. Votre devis détaille les travaux et le coût de l'installation. Les aides éventuelles sont étudiées séparément : elles ne sont ni automatiques ni garanties." },
  { question: "Quelles aides pour une pompe à chaleur en 2026 ?", answer: "En 2026, MaPrimeRénov', les primes CEE ou un éco-prêt à taux zéro peuvent être étudiés selon votre situation, le type de pompe à chaleur et les conditions en vigueur. Les dispositifs ne financent pas tous les mêmes équipements : l’éligibilité d’une PAC air/eau et d’une PAC air/air doit être vérifiée séparément. Vérifiez les critères avant tout engagement ; la décision appartient aux organismes concernés." },
  { question: "Une pompe à chaleur fonctionne-t-elle en hiver ?", answer: "Oui, mais ses performances dépendent de la température extérieure, du modèle et du dimensionnement. Dans les régions froides, l'étude du logement tient compte des besoins en hiver et d'un éventuel appoint. Les économies dépendent aussi de l'isolation et de l'usage." },
];
const solutions = [
  { icon: Thermometer, title: "PAC air/eau", text: "Pour remplacer votre chaudière et alimenter vos radiateurs ou votre plancher chauffant. Selon le modèle, elle peut aussi produire l'eau chaude." },
  { icon: Wind, title: "PAC air/air", text: "Pour chauffer les pièces en hiver et les rafraîchir en été avec un système de climatisation réversible." },
  { icon: Home, title: "PAC géothermique ou hybride", text: "Des solutions à étudier selon votre terrain, votre installation existante et les besoins de votre habitation." },
];
const steps = [
  { title: "Vous nous parlez de votre maison", text: "Votre commune, votre chauffage actuel et votre projet : nous partons de votre situation." },
  { title: "Nous étudions votre installation", text: "Isolation, besoins de chauffage et configuration du logement pour choisir une solution adaptée." },
  { title: "Vous recevez un devis détaillé", text: "Équipement, travaux prévus et budget. Nous faisons aussi le point sur les aides possibles." },
  { title: "Nos équipes réalisent les travaux", text: "Nous organisons l'installation et la mise en service, puis vous expliquons le fonctionnement." },
];
const title = "Pompe à chaleur : installation & aides 2026 | SupremEnergies";
const description = "Installation de pompe à chaleur partout en France par nos équipes. PAC air/eau ou air/air, devis gratuit et étude des aides 2026 selon votre éligibilité.";

const PompeAChaleur = () => {
  const ownTeams = heatPumpCoverage.installationTeam === "internal";
  const serviceSchema = {
    "@context": "https://schema.org", "@type": "Service", name: "Installation de pompes à chaleur",
    provider: { "@type": "LocalBusiness", name: "SupremEnergies", telephone: "01 86 04 68 89", address: { "@type": "PostalAddress", streetAddress: "55 rue Cartier-Bresson", addressLocality: "Pantin", postalCode: "93500", addressCountry: "FR" } },
    areaServed: heatPumpCoverage.areaServed, description, serviceType: "Installation pompe à chaleur", url: "https://supremenergies.com/services/pompe-a-chaleur",
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };

  return <div>
    <SeoBreadcrumb items={[{ name: "Accueil", url: "/" }, { name: "Services", url: "/services" }, { name: "Pompe à chaleur", url: "/services/pompe-a-chaleur" }]} />
    <Helmet>
      <title>{title}</title><meta name="description" content={description} />
      <link rel="canonical" href="https://supremenergies.com/services/pompe-a-chaleur" />
      <meta property="og:title" content={title} /><meta property="og:description" content={description} />
      <meta property="og:url" content="https://supremenergies.com/services/pompe-a-chaleur" /><meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} />
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script><script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>

    <section className="relative isolate overflow-hidden bg-supreme-primary pt-24 pb-12 md:pt-28 md:pb-16">
      <img src={installationPhoto} alt="Installation d’une unité extérieure de pompe à chaleur sur une maison" width={612} height={408} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-right" />
      <div className="absolute inset-0 -z-10 bg-supreme-primary/90 md:bg-supreme-primary/80" />
      <div className="container-custom">
        <div className="[&_nav]:py-0 [&_a]:text-primary-foreground/80 [&_span]:text-primary-foreground [&_svg]:text-primary-foreground/80"><Breadcrumb items={[{ label: "Services", href: "/services" }, { label: "Pompe à chaleur" }]} /></div>
        <div className="mt-6 max-w-2xl">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary-foreground"><MapPin size={18} className="text-supreme-accent" /> Installation partout en France</p>
          <h1 className="text-3xl font-bold leading-tight text-primary-foreground md:text-5xl">Installation de pompe à chaleur<br className="hidden sm:block" /> par nos équipes</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/90">Une pompe à chaleur air/eau ou air/air adaptée à votre maison, partout en France. SupremEnergies vous accompagne de l’étude du logement à la mise en service et fait le point sur les aides 2026 sous conditions.</p>
          <ul className="my-6 space-y-2 text-sm text-primary-foreground">
            {["Devis gratuit et sans engagement", ownTeams ? "Installation par les équipes SupremEnergies" : "Installation accompagnée par SupremEnergies", "Étude des aides selon votre situation"].map(feature => <li key={feature} className="flex items-start gap-2"><Check size={18} className="shrink-0 text-supreme-accent" />{feature}</li>)}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-auto min-h-12 whitespace-normal bg-supreme-accent px-5 text-supreme-dark hover:bg-supreme-accent/90"><Link to={heatPumpCoverage.quotePath}>Demander un devis gratuit <ArrowRight /></Link></Button>
            <Button asChild variant="outline" size="lg" className="h-auto min-h-12 border-primary-foreground/50 bg-transparent px-5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><a href="tel:0186046889"><Phone />01 86 04 68 89</a></Button>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container-custom grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold text-supreme-secondary">Votre logement, votre solution</p>
          <h2 className="mb-5 text-2xl font-bold md:text-3xl">Comment fonctionne une pompe à chaleur ?</h2>
          <p className="mb-5 leading-relaxed text-muted-foreground">Une pompe à chaleur récupère la chaleur de l’air ou du sol pour chauffer votre logement. Le bon équipement dépend de votre isolation, de vos émetteurs de chaleur et du climat de votre région.</p>
          <p className="leading-relaxed text-muted-foreground">Dans un projet de rénovation énergétique, le chauffage et l’isolation se pensent ensemble : une maison mieux isolée n’a pas les mêmes besoins de puissance. Nos équipes interviennent dans toute la France pour étudier vos besoins, choisir l’équipement et préparer l’installation.</p>
          <Link to="/services/isolation-thermique" className="mt-4 inline-block font-medium text-supreme-primary underline underline-offset-4">Préparer aussi l’isolation de votre logement</Link>
          <div className="mt-6 flex items-start gap-3 border-t border-border pt-5"><Users className="shrink-0 text-supreme-primary" /><p className="text-sm leading-relaxed text-muted-foreground"><strong className="text-foreground">Les équipes SupremEnergies à vos côtés.</strong> Vous savez qui réalise vos travaux et comment votre projet est organisé.</p></div>
        </div>
        <figure>
          <img src={installationPhoto} alt="Technicien intervenant sur une pompe à chaleur extérieure" width={612} height={408} loading="lazy" className="aspect-[3/2] w-full rounded-lg object-cover" />
          <figcaption className="mt-2 text-xs text-muted-foreground">Photo illustrative d’une installation de pompe à chaleur.</figcaption>
        </figure>
      </div>
    </section>

    <section className="section-padding bg-supreme-light">
      <div className="container-custom">
        <h2 className="text-2xl font-bold md:text-3xl">Quelle pompe à chaleur pour votre logement ?</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">Nous vous aidons à choisir selon votre chauffage actuel et vos besoins de confort.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">{solutions.map(({ icon: Icon, title: name, text }) => <article key={name} className="rounded-lg border border-border bg-card p-6"><Icon className="mb-5 text-supreme-primary" size={28} /><h3 className="mb-3 text-xl font-bold">{name}</h3><p className="text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-custom">
        <h2 className="text-2xl font-bold md:text-3xl">Les étapes de votre installation de pompe à chaleur</h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step, i) => <li key={step.title} className="border-t-2 border-supreme-primary pt-5"><span className="text-sm font-bold text-supreme-secondary">Étape {i + 1}</span><h3 className="my-3 text-lg font-bold">{step.title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p></li>)}</ol>
      </div>
    </section>

    <section className="section-padding bg-supreme-light">
      <div className="container-custom grid gap-10 md:grid-cols-2">
        <div><h2 className="mb-4 text-2xl font-bold md:text-3xl">Prix d’une pompe à chaleur : un devis adapté à votre maison</h2><p className="leading-relaxed text-muted-foreground">Le prix dépend du type de PAC, de sa puissance, des raccordements et des adaptations de votre chauffage actuel. Votre devis précise l’équipement, les travaux et le coût de l’installation. Les économies dépendent du logement, du système remplacé et de l’utilisation : elles ne peuvent pas être garanties à l’avance.</p></div>
        <div><h2 className="mb-4 text-2xl font-bold md:text-3xl">Aides pompe à chaleur 2026 : que vérifier ?</h2><ul className="space-y-3">{["MaPrimeRénov’ et primes CEE, selon l’éligibilité", "Éco-prêt à taux zéro, sous conditions", "TVA réduite lorsque les travaux sont éligibles"].map(item => <li key={item} className="flex items-start gap-2 text-muted-foreground"><CheckCircle2 size={20} className="shrink-0 text-supreme-primary" />{item}</li>)}</ul><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Les aides dépendent notamment de vos revenus, du logement et du type d’équipement. Une PAC air/eau et une PAC air/air ne relèvent pas nécessairement des mêmes dispositifs. Les conditions sont à vérifier avant de vous engager ; l’attribution relève des organismes concernés.</p><div className="mt-4 flex flex-col items-start gap-3"><Button asChild variant="link" className="h-auto justify-start whitespace-normal p-0"><Link to="/aides-renovation-2026">Consulter le guide des aides rénovation 2026 <ArrowRight /></Link></Button><Button asChild variant="link" className="h-auto justify-start whitespace-normal p-0"><Link to="/simulateur-aides">Estimer mes aides <ArrowRight /></Link></Button></div></div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-custom max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">Pompe à chaleur : installation, prix et aides 2026</h2>
        <div className="divide-y divide-border border-y border-border">{faqItems.map(item => <details key={item.question} className="group py-5"><summary className="cursor-pointer text-base font-semibold text-supreme-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{item.question}</summary><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p></details>)}</div>
      </div>
    </section>

    <section className="bg-supreme-primary py-12">
      <div className="container-custom flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><h2 className="text-2xl font-bold text-primary-foreground">Parlons de votre projet de chauffage</h2><p className="mt-3 max-w-xl text-primary-foreground/90">Indiquez votre commune et votre chauffage actuel. Nos équipes étudient votre projet partout en France.</p></div><Button asChild size="lg" className="h-auto min-h-12 shrink-0 whitespace-normal bg-supreme-accent text-supreme-dark hover:bg-supreme-accent/90"><Link to={heatPumpCoverage.quotePath}>Demander un devis <ArrowRight /></Link></Button></div>
    </section>
    <RelatedArticles keywords={["pompe à chaleur", "PAC", "chauffage", "MaPrimeRénov"]} title="Nos conseils pour préparer votre projet" />
    <RelatedServices excludeSlug="pompe-a-chaleur" title="Découvrez aussi" />
    <RelatedZones serviceSlug="pompe-a-chaleur" serviceName="Pompe à chaleur" title="Des installations partout en France" subtitle="Nos équipes interviennent dans toute la France. Retrouvez ici nos pages locales en Île-de-France et dans les Hauts-de-France ; votre commune peut aussi être étudiée même si elle n’est pas listée." />
  </div>;
};
export default PompeAChaleur;
