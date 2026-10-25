import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import FeatureBox from "@/components/FeatureBox";
import CTA from "@/components/CTA";
import InternalLinksHub from "@/components/InternalLinksHub";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { Home, ThermometerSun, Droplets, SunMedium, Building, CheckCircle2, BadgeCheck, Clock, Award, Users, Leaf, Shield, TrendingUp, Target, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/energy-label.png";
import { heatPumpCoverage } from "@/data/pompe-a-chaleur";

const homeTitle = "Rénovation énergétique & aides 2026 | SupremEnergies";
const homeDescription = "Rénovation énergétique : isolation, solaire et pompe à chaleur installée partout en France par nos équipes. Aides 2026 sous conditions. Devis gratuit.";

const faqItems = [
  {
    question: "Quelles aides pour la rénovation énergétique en 2026 ?",
    answer: "MaPrimeRénov', les primes CEE, l'éco-prêt à taux zéro et la TVA réduite peuvent contribuer au financement de travaux éligibles. Les aides à la rénovation énergétique en 2026 dépendent notamment de vos revenus, du logement, des travaux et des conditions en vigueur. Vérifiez votre éligibilité avant de vous engager : les aides ne sont ni automatiques ni garanties."
  },
  {
    question: "Combien coûte l'isolation des combles ?",
    answer: "Le prix dépend de la surface, de l'accès aux combles, de la technique et des matériaux. Un devis détaillé permet de connaître le budget des travaux. Les aides éventuelles et le reste à charge doivent être étudiés séparément selon votre situation."
  },
  {
    question: "Quelle pompe à chaleur choisir ?",
    answer: "Le choix dépend de l'isolation, de votre chauffage actuel et des besoins de votre maison. Une pompe à chaleur air/eau peut alimenter des radiateurs ou un plancher chauffant ; une PAC air/air chauffe et peut rafraîchir les pièces. Nos équipes étudient le logement pour proposer un équipement et une puissance adaptés."
  },
  {
    question: "Intervenez-vous en Île-de-France ?",
    answer: "Oui, l'Île-de-France reste notre zone principale pour la rénovation énergétique. Pour les pompes à chaleur, nos propres équipes réalisent les installations partout en France. Indiquez votre commune dans votre demande pour organiser l'étude de votre projet."
  }
];

const Index = () => {
  const services = [
    {
      title: "Isolation Thermique",
      description: "Solutions d'isolation pour combles, murs, fenêtres et planchers pour maximiser votre confort et réduire vos factures.",
      icon: <ThermometerSun size={32} />,
      link: "/services/isolation-thermique",
      imageUrl: "https://raw.githubusercontent.com/raphaelhhh/supremenergies/main/src/pages/gettyimages-2210519115-612x612.jpg"
    },
    {
      title: "Pompe à chaleur",
      description: "Installation de pompes à chaleur air/eau et air/air partout en France par nos équipes, avec étude du logement et devis détaillé.",
      icon: <Home size={32} />,
      link: "/services/pompe-a-chaleur",
      imageUrl: "https://raw.githubusercontent.com/raphaelhhh/supremenergies/main/src/pages/gettyimages-2214842911-612x612.jpg"
    },
    {
      title: "Eau Chaude Sanitaire",
      description: "Chauffe-eau thermodynamiques et systèmes solaires combinés pour une eau chaude économique et écologique.",
      icon: <Droplets size={32} />,
      link: "/services#eau-chaude",
      imageUrl: "https://github.com/raphaelhhh/supremenergies/raw/main/src/pages/chauffe-eau-electrique-blanc-mince-moderne-mur-beton_241146-2250.avif"
    },
    
    {
      title: "Panneaux Solaires",
      description: "Production d'électricité verte grâce aux panneaux photovoltaïques. Réduisez vos factures et votre empreinte carbone.",
      icon: <SunMedium size={32} />,
      link: "/services/panneaux-solaires",
      imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Rénovation Globale",
      description: "Accompagnement complet pour votre projet de rénovation énergétique dans le cadre des programmes de l'ANAH.",
      icon: <Building size={32} />,
      link: "/services/renovation-globale",
      imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    }
  ];

  const testimonials = [
    {
      name: "M. Bernard",
      role: "Propriétaire maison individuelle",
      testimonial: "Installation rapide et propre. Les techniciens ont bien expliqué le fonctionnement de la pompe à chaleur. On commence à voir la différence sur les factures.",
      rating: 4
    },
    {
      name: "Famille Rousseau", 
      role: "Propriétaires depuis 8 ans",
      testimonial: "Nous hésitions pour l'isolation des combles. Finalement très content du résultat, la maison garde mieux la chaleur cet hiver.",
      rating: 5
    },
    {
      name: "Mme Petit",
      role: "Retraitée",
      testimonial: "Service sérieux, devis clair. L'installateur a pris le temps de tout expliquer pour les aides financières. Ça aide beaucoup à notre âge.",
      rating: 4
    }
  ];

  const features = [
    {
      title: "Expertise Professionnelle",
      description: "Nos équipes qualifiées vous garantissent un travail de qualité et conforme aux normes en vigueur.",
      icon: <BadgeCheck size={36} />
    },
    {
      title: "Garantie Décennale",
      description: "Nous offrons une garantie décennale sur tous nos travaux pour votre tranquillité d'esprit à long terme.",
      icon: <Shield size={36} />
    },
    {
      title: "Intervention Rapide",
      description: "Notre équipe réactive intervient rapidement pour répondre à vos besoins en rénovation énergétique.",
      icon: <Clock size={36} />
    },
    {
      title: "Aides Financières",
      description: "Nous vous accompagnons dans toutes vos démarches pour obtenir les aides financières auxquelles vous avez droit.",
      icon: <Award size={36} />
    }
  ];

  const values = [
    {
      title: "Engagement écologique",
      description: "Nous nous engageons à réduire l'empreinte carbone de chaque foyer et entreprise.",
      icon: <Leaf size={36} />
    },
    {
      title: "Excellence technique",
      description: "Nos solutions sont à la pointe de la technologie pour une efficacité maximale.",
      icon: <Target size={36} />
    },
    {
      title: "Économies durables",
      description: "Nous concevons des solutions qui généreront des économies sur le long terme.",
      icon: <TrendingUp size={36} />
    }
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://supremenergies.com/#localbusiness",
    "name": "SupremEnergies",
    "alternateName": "Suprem Energies",
    "description": homeDescription,
    "url": "https://supremenergies.com",
    "telephone": "+33186046889",
    "email": "contact@supremenergies.com",
    "image": "https://supremenergies.com/og-image.jpg",
    "logo": "https://supremenergies.com/favicon.png",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "55 rue Cartier Bresson",
      "addressLocality": "Pantin",
      "postalCode": "93500",
      "addressRegion": "Île-de-France",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.9020924,
      "longitude": 2.4012571
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Île-de-France" },
      { "@type": "City", "name": "Paris" },
      { "@type": "City", "name": "Pantin" },
      { "@type": "AdministrativeArea", "name": "Seine-Saint-Denis" },
      { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" },
      { "@type": "AdministrativeArea", "name": "Val-de-Marne" },
      {
        "@type": "GeoCircle",
        "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 48.8566, "longitude": 2.3522 },
        "geoRadius": "100000"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de rénovation énergétique",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Isolation thermique" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Installation de pompe à chaleur", "url": "https://supremenergies.com/services/pompe-a-chaleur", "areaServed": heatPumpCoverage.areaServed } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Panneaux solaires" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Rénovation globale" } }
      ]
    },
    "sameAs": [
      "https://www.google.com/maps/place/?q=place_id:ChIJ9z-FH6XlRkARdJA1ALkFU38"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://supremenergies.com/#website",
    "url": "https://supremenergies.com/",
    "name": "SupremEnergies",
    "inLanguage": "fr-FR",
    "publisher": { "@id": "https://supremenergies.com/#localbusiness" },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://supremenergies.com/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div>
      <Helmet>
        <title>{homeTitle}</title>
        <meta name="description" content={homeDescription} />
        <link rel="canonical" href="https://supremenergies.com/" />
        <meta property="og:title" content={homeTitle} />
        <meta property="og:description" content={homeDescription} />
        <meta property="og:url" content="https://supremenergies.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://supremenergies.com/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="SupremEnergies" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={homeTitle} />
        <meta name="twitter:description" content={homeDescription} />
        <meta name="twitter:image" content="https://supremenergies.com/og-image.jpg" />
        <meta name="twitter:site" content="@supremenergies" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>


      <Hero 
        title="Votre rénovation énergétique, menée avec sérieux de A à Z"
        subtitle="Isolation et solaire en Île-de-France, pompe à chaleur partout en France par nos équipes. Un devis détaillé et un accompagnement pour comprendre les aides à la rénovation énergétique en 2026."
        features={["Devis gratuit et sans engagement", "Garantie décennale sur nos travaux", "Montage des dossiers MaPrimeRénov' et CEE"]}
        buttonText="Demander un devis"
        buttonLink="/devis-gratuit"
        secondaryButtonText="Voir nos solutions"
        secondaryButtonLink="/services"
        imageSrc={heroImage}
        imageAlt="Rénovation énergétique et isolation thermique"
      />

      {/* Trust strip */}
      <section className="border-y border-border bg-card">
        <div className="container-custom py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <a href="https://www.google.com/maps/place/?q=place_id:ChIJ9z-FH6XlRkARdJA1ALkFU38" target="_blank" rel="noopener noreferrer" className="group">
            <p className="font-display text-2xl text-foreground">19 avis Google</p>
            <p className="text-sm text-muted-foreground group-hover:underline">Lire les avis clients</p>
          </a>
          <div>
            <p className="font-display text-2xl text-foreground">Décennale</p>
            <p className="text-sm text-muted-foreground">Travaux assurés 10 ans</p>
          </div>
          <div>
            <p className="font-display text-2xl text-foreground">1 interlocuteur</p>
            <p className="text-sm text-muted-foreground">Du devis à la mise en service</p>
          </div>
          <div>
            <p className="font-display text-2xl text-foreground">Île-de-France</p>
            <p className="text-sm text-muted-foreground">Zone d'intervention principale</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-supreme-light" aria-labelledby="home-aides-title">
        <div className="container-custom max-w-4xl">
          <h2 id="home-aides-title" className="mb-5 text-2xl font-bold md:text-3xl">Quelles aides pour votre rénovation énergétique en 2026 ?</h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">Vous préparez une isolation ou l’installation d’une pompe à chaleur ? MaPrimeRénov’, les primes CEE, l’éco-prêt à taux zéro et la TVA réduite peuvent être étudiés selon votre logement, vos revenus et les travaux envisagés.</p>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">Le montant dépend des conditions en vigueur et de l’examen de votre dossier. Une estimation n’est pas une attribution d’aide : vérifiez les critères avant de signer ou de commencer les travaux.</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild><Link to="/aides-renovation-2026">Comprendre les aides rénovation 2026</Link></Button>
            <Button asChild variant="outline"><Link to="/simulateur-aides">Estimer mes aides</Link></Button>
          </div>
        </div>
      </section>

      {/* Lead magnet PDF */}
      <section className="py-12 bg-gradient-to-b from-supreme-light/30 to-white">
        <div className="container-custom max-w-2xl">
          <LeadMagnetForm source="home_lead_magnet" />
        </div>
      </section>



      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader 
            title="Nos travaux de rénovation énergétique" 
            subtitle="Découvrez notre gamme complète de solutions pour améliorer l'efficacité énergétique de votre habitation ou de votre entreprise."
            highlightedWord="rénovation"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
                imageUrl={service.imageUrl}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90">
              <Link to="/services">Voir toutes nos solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader 
            title="Pourquoi Nous Choisir ?" 
            subtitle="SupremEnergies s'engage à fournir des services de qualité pour garantir votre satisfaction et la performance énergétique de votre habitat."
            highlightedWord="Choisir"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureBox
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Preview Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-supreme-primary">SupremEnergies</span>, votre partenaire de confiance
              </h2>
              <p className="text-lg mb-6 text-gray-700">
                Depuis notre création, SupremEnergies s'est engagée à offrir des solutions de rénovation énergétique de haute qualité pour les particuliers et les professionnels.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                Notre mission est de contribuer à la transition énergétique en rendant les bâtiments plus efficaces et en réduisant leur empreinte environnementale.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {values.map((value, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-4">
                    <div className="h-16 w-16 rounded-full bg-supreme-light flex items-center justify-center mb-4 text-supreme-primary">
                      {value.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
              
              <Button asChild className="bg-supreme-secondary hover:bg-supreme-secondary/90">
                <Link to="/about">En savoir plus sur nous</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://github.com/raphaelhhh/supremenergies/raw/main/src/pages/serrer-main-collegues-sourire-pour-reunion-dans-accord-bureau-vous-remercier-pour-affaires-collaboration-hommes-serrer-main-pour-travail-equipe-dans-projet-heureux-fusion-entreprise-pour-conception_590464-403903.avif" 
                alt="Équipe SupremEnergies"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader 
            title="Comment se déroule votre projet" 
            subtitle="Quatre étapes claires, sans surprise, avec un seul interlocuteur du premier appel à la mise en service."
            highlightedWord="projet"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Consultation", description: "Évaluation gratuite de vos besoins et objectifs énergétiques", step: "01" },
              { title: "Proposition", description: "Solutions personnalisées et devis transparent sans engagement", step: "02" },
              { title: "Installation", description: "Travaux réalisés par nos équipes qualifiées", step: "03" },
              { title: "Suivi", description: "Accompagnement continu et service après-vente réactif", step: "04" }
            ].map((process, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute -right-4 -top-4 text-8xl font-bold text-supreme-light/70 group-hover:text-supreme-light transition-colors">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 relative z-10">{process.title}</h3>
                <p className="text-gray-600 relative z-10">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section — real Google reviews only */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center rounded-2xl border border-border bg-card p-10 shadow-sm">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Avis clients</p>
            <div className="flex justify-center items-center gap-1 text-supreme-accent mb-2" aria-label="Note 5 sur 5">
              {[0,1,2,3,4].map((i) => <Star key={i} className="h-7 w-7 fill-current" />)}
            </div>
            <p className="text-2xl font-bold text-foreground mb-6">5/5 <span className="text-base font-normal text-muted-foreground">· 19 avis vérifiés sur Google</span></p>
            <h2 className="text-3xl md:text-4xl mb-4">Ce que nos clients disent de nous</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Plutôt que des témoignages choisis par nos soins, consultez directement les 19 avis laissés par nos clients sur notre fiche Google.
            </p>
            <Button asChild size="lg">
              <a href="https://www.google.com/maps/place/?q=place_id:ChIJ9z-FH6XlRkARdJA1ALkFU38" target="_blank" rel="noopener noreferrer">Lire les avis sur Google</a>
            </Button>
          </div>
        </div>
      </section>

      {/* B2B Section */}
      <section className="section-padding bg-supreme-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Solutions pour entreprises"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Solutions pour <span className="text-supreme-primary">Entreprises</span>
              </h2>
              <p className="text-lg mb-6 text-gray-700">
                SupremEnergies accompagne les entreprises dans leur transition énergétique avec des solutions sur mesure pour réduire leur consommation et optimiser leurs installations.
              </p>
              <p className="text-lg mb-8 text-gray-700">
                Nos experts analysent vos besoins et vous proposent des solutions adaptées à votre activité, vos locaux et vos objectifs en matière de développement durable.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Users className="h-10 w-10 text-supreme-secondary p-2 bg-supreme-secondary/10 rounded-full" />
                  <span className="font-medium">Audits énergétiques</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ThermometerSun className="h-10 w-10 text-supreme-secondary p-2 bg-supreme-secondary/10 rounded-full" />
                  <span className="font-medium">Isolation industrielle</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SunMedium className="h-10 w-10 text-supreme-secondary p-2 bg-supreme-secondary/10 rounded-full" />
                  <span className="font-medium">Panneaux solaires</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-10 w-10 text-supreme-secondary p-2 bg-supreme-secondary/10 rounded-full" />
                  <span className="font-medium">Solutions complètes</span>
                </div>
              </div>
              <Button asChild className="bg-supreme-secondary hover:bg-supreme-secondary/90">
                <Link to="/services#business">Solutions B2B</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader 
            title="Questions Fréquentes" 
            subtitle="Les réponses aux questions les plus posées sur la rénovation énergétique"
            highlightedWord="Fréquentes"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-3 text-supreme-primary">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinksHub
        title="Explorez nos solutions de rénovation énergétique"
        subtitle="Services, simulateur d'aides 2026, guides experts et avis clients vérifiés : tout pour réussir vos travaux d'économies d'énergie."
        links={[
          { to: "/services/isolation-thermique", label: "Isolation des combles, murs et planchers", desc: "Solutions d'isolation adaptées à votre logement" },
          { to: "/services/pompe-a-chaleur", label: "Pompe à chaleur air/eau et air/air", desc: "Remplacement chaudière fioul ou gaz" },
          { to: "/services/panneaux-solaires", label: "Panneaux photovoltaïques en autoconsommation", desc: "Solaire résidentiel 3 à 9 kWc, prime EDF OA" },
          { to: "/services/renovation-globale", label: "Rénovation énergétique globale", desc: "Coordonner isolation et chauffage selon vos besoins" },
          { to: "/aides-renovation-2026", label: "Aides rénovation énergétique 2026", desc: "MaPrimeRénov', CEE et financements sous conditions" },
          { to: "/simulateur-aides", label: "Calculer mes aides à la rénovation 2026", desc: "Simulateur MaPrimeRénov', CEE et Éco-PTZ" },
          { to: "/temoignages", label: "Avis clients sur nos chantiers de rénovation", desc: "Témoignages vérifiés de particuliers" },
        ]}
      />

      {/* CTA Section */}
      <CTA />
    </div>
  );
};

export default Index;
