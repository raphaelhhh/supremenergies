
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import CTA from "@/components/CTA";
import { CheckCircle2, Shield, Award, Users, ThumbsUp, Lightbulb } from "lucide-react";

const About = () => {
  const values = [
    {
      title: "Expertise",
      description: "Notre équipe de professionnels qualifiés possède une connaissance approfondie des dernières technologies en matière d'efficacité énergétique.",
      icon: <Lightbulb size={36} className="text-supreme-primary" />
    },
    {
      title: "Qualité",
      description: "Nous utilisons uniquement des produits et matériaux de haute qualité pour garantir des résultats durables et efficaces.",
      icon: <Award size={36} className="text-supreme-primary" />
    },
    {
      title: "Satisfaction client",
      description: "La satisfaction de nos clients est notre priorité. Nous travaillons avec vous pour comprendre vos besoins et y répondre efficacement.",
      icon: <ThumbsUp size={36} className="text-supreme-primary" />
    },
    {
      title: "Responsabilité",
      description: "Nous nous engageons à promouvoir des pratiques durables et à réduire l'impact environnemental de chaque projet.",
      icon: <Shield size={36} className="text-supreme-primary" />
    }
  ];

  return (
    <div>
      <Hero 
        title="À Propos de SupremEnergies"
        subtitle="Découvrez qui nous sommes et comment nous contribuons à un avenir plus durable grâce à nos solutions de rénovation énergétique."
        buttonText="Nos services"
        buttonLink="/services"
      />

      {/* Notre Histoire */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-supreme-primary">Notre Histoire</h2>
              <p className="text-lg mb-4 text-gray-700">
                Née d'une structure parisienne réunissant des experts passionnés par la performance énergétique, SupremEnergies s'est construite autour d'une vision claire : proposer des solutions innovantes et durables pour réduire l'empreinte carbone des bâtiments.
              </p>
              <p className="text-lg mb-4 text-gray-700">
                Portée par une forte exigence technique et un engagement écologique, notre équipe a progressivement élargi ses domaines d'expertise, de l'isolation thermique à l'installation de systèmes à énergie renouvelable.
              </p>
              <p className="text-lg mb-4 text-gray-700">
                Aujourd'hui, SupremEnergies s'impose comme un acteur incontournable de la transition énergétique en France, avec plus de <strong>1000</strong> projets menés à bien auprès de particuliers comme d'entreprises.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Notre Histoire"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="section-padding bg-supreme-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" 
                alt="Notre Mission"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-supreme-primary">Notre Mission</h2>
              <p className="text-lg mb-6 text-gray-700">
                Notre mission est de contribuer activement à la transition énergétique en proposant des solutions innovantes et accessibles pour améliorer l'efficacité énergétique des bâtiments.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Réduire les émissions de CO2</h3>
                    <p className="text-gray-600">En améliorant l'efficacité énergétique des bâtiments et en favorisant les énergies renouvelables.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Améliorer le confort</h3>
                    <p className="text-gray-600">Des habitations plus confortables, été comme hiver, grâce à nos solutions d'isolation et de chauffage.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Réduire les factures énergétiques</h3>
                    <p className="text-gray-600">Des économies substantielles pour nos clients grâce à des solutions performantes et durables.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader 
            title="Nos Valeurs" 
            subtitle="Les valeurs qui guident nos actions et nous définissent en tant qu'entreprise engagée pour un avenir durable."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Garanties */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-supreme-primary">Nos Garanties</h2>
              <p className="text-lg mb-6 text-gray-700">
                SupremEnergies s'engage à vous fournir des prestations de qualité avec des garanties solides pour votre tranquillité d'esprit.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="h-12 w-12 flex-shrink-0 bg-supreme-primary/10 rounded-full flex items-center justify-center">
                    <Shield size={24} className="text-supreme-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Garantie Décennale</h3>
                    <p className="text-gray-600">Protection de 10 ans sur tous nos travaux d'installation</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="h-12 w-12 flex-shrink-0 bg-supreme-primary/10 rounded-full flex items-center justify-center">
                    <Award size={24} className="text-supreme-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Équipements Certifiés</h3>
                    <p className="text-gray-600">Matériaux et équipements de marques reconnues avec garantie constructeur</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="h-12 w-12 flex-shrink-0 bg-supreme-primary/10 rounded-full flex items-center justify-center">
                    <Users size={24} className="text-supreme-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Équipe Qualifiée</h3>
                    <p className="text-gray-600">Techniciens formés et expérimentés pour des installations conformes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="h-12 w-12 flex-shrink-0 bg-supreme-primary/10 rounded-full flex items-center justify-center">
                    <ThumbsUp size={24} className="text-supreme-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Satisfaction Client</h3>
                    <p className="text-gray-600">Service après-vente réactif et accompagnement personnalisé</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Nos Garanties"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA 
        title="Prêt à collaborer avec nous ?"
        subtitle="Contactez notre équipe pour discuter de votre projet de rénovation énergétique et découvrir comment nous pouvons vous aider."
      />
    </div>
  );
};

export default About;
