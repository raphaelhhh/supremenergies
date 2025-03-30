
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import FeatureBox from "@/components/FeatureBox";
import CTA from "@/components/CTA";
import { Home, ThermometerSun, Droplets, SunMedium, Building, CheckCircle2, BadgeCheck, Clock, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const services = [
    {
      title: "Isolation Thermique",
      description: "Solutions d'isolation pour combles, murs, fenêtres et planchers pour maximiser votre confort et réduire vos factures.",
      icon: <ThermometerSun size={32} />,
      link: "/services#isolation"
    },
    {
      title: "Pompes à Chaleur",
      description: "Des systèmes performants et économiques pour chauffer votre habitation tout en réduisant votre consommation d'énergie.",
      icon: <Home size={32} />,
      link: "/services#chauffage"
    },
    {
      title: "Eau Chaude Sanitaire",
      description: "Chauffe-eau thermodynamiques et systèmes solaires combinés pour une eau chaude économique et écologique.",
      icon: <Droplets size={32} />,
      link: "/services#eau-chaude"
    },
    {
      title: "Panneaux Solaires",
      description: "Production d'électricité verte grâce aux panneaux photovoltaïques. Réduisez vos factures et votre empreinte carbone.",
      icon: <SunMedium size={32} />,
      link: "/services#solaire"
    },
    {
      title: "Rénovation Globale",
      description: "Accompagnement complet pour votre projet de rénovation énergétique dans le cadre des programmes de l'ANAH.",
      icon: <Building size={32} />,
      link: "/services#renovation"
    }
  ];

  const testimonials = [
    {
      name: "Marie Dupont",
      role: "Propriétaire à Paris",
      testimonial: "Grâce à SupremEnergies, nous avons réduit nos factures d'énergie de 40%. L'équipe a été professionnelle et efficace du début à la fin.",
      rating: 5
    },
    {
      name: "Jean Martin",
      role: "Dirigeant d'entreprise",
      testimonial: "Excellent accompagnement pour la rénovation énergétique de nos locaux. Travail soigné et équipe à l'écoute de nos besoins spécifiques.",
      rating: 5
    },
    {
      name: "Sophie Leroux",
      role: "Propriétaire à Lyon",
      testimonial: "Je recommande vivement SupremEnergies pour leur expertise et leur service client exceptionnel. Installation de panneaux solaires parfaite !",
      rating: 4
    }
  ];

  const features = [
    {
      title: "Expertise Certifiée",
      description: "Tous nos professionnels sont certifiés RGE (Reconnu Garant de l'Environnement) pour vous garantir un travail de qualité.",
      icon: <BadgeCheck size={48} />
    },
    {
      title: "Garantie Décennale",
      description: "Nous offrons une garantie décennale sur tous nos travaux pour votre tranquillité d'esprit à long terme.",
      icon: <CheckCircle2 size={48} />
    },
    {
      title: "Intervention Rapide",
      description: "Notre équipe réactive intervient rapidement pour répondre à vos besoins en rénovation énergétique.",
      icon: <Clock size={48} />
    },
    {
      title: "Aides Financières",
      description: "Nous vous accompagnons dans toutes vos démarches pour obtenir les aides financières auxquelles vous avez droit.",
      icon: <Award size={48} />
    }
  ];

  return (
    <div>
      <Hero 
        title="Experts en rénovation énergétique pour un avenir durable"
        subtitle="Réduisez votre consommation énergétique et votre empreinte carbone avec des solutions performantes et éco-responsables."
        buttonText="Découvrir nos services"
        buttonLink="/services"
        imageSrc="https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      />

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader 
            title="Nos Services" 
            subtitle="Découvrez notre gamme complète de solutions pour améliorer l'efficacité énergétique de votre habitation ou de votre entreprise."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90">
              <Link to="/services">Voir tous nos services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader 
            title="Pourquoi Nous Choisir ?" 
            subtitle="SupremEnergies s'engage à fournir des services de qualité pour garantir votre satisfaction et la performance énergétique de votre habitat."
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
      <section className="section-padding bg-supreme-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-supreme-primary">À Propos de SupremEnergies</h2>
              <p className="text-lg mb-6 text-gray-700">
                Depuis notre création, SupremEnergies s'est engagée à offrir des solutions de rénovation énergétique de haute qualité pour les particuliers et les professionnels.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                Notre mission est de contribuer à la transition énergétique en rendant les bâtiments plus efficaces et en réduisant leur empreinte environnementale.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Une équipe de professionnels certifiés RGE</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Plus de 1000 chantiers réalisés avec succès</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Accompagnement personnalisé pour vos projets</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>Engagement pour un avenir durable</span>
                </li>
              </ul>
              <Button asChild className="bg-supreme-secondary hover:bg-supreme-secondary/90">
                <Link to="/about">En savoir plus sur nous</Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Équipe SupremEnergies"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader 
            title="Ce Que Disent Nos Clients" 
            subtitle="Découvrez les témoignages de nos clients satisfaits qui ont fait confiance à SupremEnergies pour leurs projets de rénovation énergétique."
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
      <section className="section-padding bg-gray-50">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-supreme-primary">Solutions pour Entreprises</h2>
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

      {/* CTA Section */}
      <CTA />

    </div>
  );
};

export default Index;
