import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import FeatureBox from "@/components/FeatureBox";
import CTA from "@/components/CTA";
import InternalLinksHub from "@/components/InternalLinksHub";
import { Home, ThermometerSun, Droplets, SunMedium, Building, CheckCircle2, BadgeCheck, Clock, Award, Users, Leaf, Shield, TrendingUp, Target, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/energy-label.png";

const faqItems = [
  {
    question: "Quelles aides pour la rénovation énergétique en 2026 ?",
    answer: "En 2026, vous pouvez bénéficier de MaPrimeRénov' (jusqu'à 90% du coût selon vos revenus), des CEE, de l'éco-PTZ jusqu'à 50 000 €, et de la TVA à 5,5%. SupremEnergies vous accompagne dans toutes les démarches."
  },
  {
    question: "Combien coûte l'isolation des combles ?",
    answer: "Le coût de l'isolation des combles varie de 20 à 60 €/m² selon la technique utilisée. Avec les aides (MaPrimeRénov' + CEE), le reste à charge peut être très faible, parfois moins de 10 €/m²."
  },
  {
    question: "Quelle pompe à chaleur choisir ?",
    answer: "Le choix dépend de votre logement : la PAC air/eau est idéale pour remplacer une chaudière, la PAC air/air convient pour chauffer et climatiser, et la PAC géothermique offre le meilleur rendement. Nos experts réalisent un diagnostic gratuit."
  },
  {
    question: "Intervenez-vous en Île-de-France ?",
    answer: "Oui, notre zone d'intervention principale couvre toute l'Île-de-France. Nous intervenons aussi dans d'autres régions pour des projets spécifiques. Contactez-nous pour vérifier notre disponibilité."
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
      title: "Pompes à Chaleur",
      description: "Des systèmes performants et économiques pour chauffer votre habitation tout en réduisant votre consommation d'énergie.",
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
      title: "Adoucisseur d'Eau",
      description: "Protégez vos équipements du calcaire et améliorez la qualité de votre eau pour plus de confort au quotidien.",
      icon: <Waves size={32} />,
      link: "/services#adoucisseur",
      imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
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
    "description": "Expert en rénovation énergétique : isolation thermique, pompes à chaleur, panneaux solaires et rénovation globale en Île-de-France.",
    "url": "https://supremenergies.com",
    "telephone": "+33186046889",
    "email": "contact@supremenergies.com",
    "image": "https://supremenergies.com/og-image.jpg",
    "logo": "https://supremenergies.com/favicon.ico",
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
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pompe à chaleur" } },
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
        <title>Rénovation Énergétique Île-de-France ★ Jusqu'à 11 000€ d'aides 2026</title>
        <meta name="description" content="✓ Devis gratuit en 48h ✓ Jusqu'à 11 000€ d'aides MaPrimeRénov' 2026. Pompe à chaleur, isolation, panneaux solaires. Experts certifiés en Île-de-France. ★ 4.8/5" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://supremenergies.com/" />
        <link rel="alternate" hrefLang="fr-FR" href="https://supremenergies.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://supremenergies.com/" />
        {/* Préchargement de l'image LCP du Hero */}
        <link rel="preload" as="image" href={heroImage} fetchPriority="high" />
        <meta property="og:title" content="Rénovation Énergétique Île-de-France ★ Jusqu'à 11 000€ d'aides 2026" />
        <meta property="og:description" content="Devis gratuit en 48h. Jusqu'à 11 000€ d'aides MaPrimeRénov' 2026. Experts en Île-de-France." />
        <meta property="og:url" content="https://supremenergies.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://supremenergies.com/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="SupremEnergies" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rénovation Énergétique Île-de-France ★ Aides 2026" />
        <meta name="twitter:description" content="Devis gratuit 48h. Jusqu'à 11 000€ d'aides MaPrimeRénov' 2026." />
        <meta name="twitter:image" content="https://supremenergies.com/og-image.jpg" />
        <meta name="twitter:site" content="@supremenergies" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>


      <Hero 
        title="Transformez votre habitat et réduisez vos factures énergétiques"
        subtitle="Experts en rénovation énergétique pour un avenir plus durable et économique"
        buttonText="Découvrir nos solutions"
        buttonLink="/services"
        imageSrc={heroImage}
        imageAlt="Rénovation énergétique et isolation thermique"
      />

      <SocialProof />

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader 
            title="Nos Solutions Énergétiques" 
            subtitle="Découvrez notre gamme complète de solutions pour améliorer l'efficacité énergétique de votre habitation ou de votre entreprise."
            highlightedWord="Solutions"
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
            title="Notre Processus Simple" 
            subtitle="Nous rendons votre transition énergétique facile et sans stress avec notre processus en quatre étapes"
            highlightedWord="Simple"
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

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader 
            title="Ce Que Disent Nos Clients" 
            subtitle="Découvrez les témoignages de nos clients satisfaits qui ont fait confiance à SupremEnergies pour leurs projets de rénovation énergétique."
            highlightedWord="Clients"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                testimonial={testimonial.testimonial}
                rating={testimonial.rating}
              />
            ))}
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

      {/* CTA Section */}
      <CTA />
    </div>
  );
};

export default Index;
