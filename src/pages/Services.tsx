
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import CTA from "@/components/CTA";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ThermometerSun, Home, Droplets, SunMedium, Building, CheckCircle2, ArrowRight } from "lucide-react";

const Services = () => {
  const location = useLocation();
  const isolationRef = useRef<HTMLDivElement>(null);
  const chauffageRef = useRef<HTMLDivElement>(null);
  const eauChaudeRef = useRef<HTMLDivElement>(null);
  const solaireRef = useRef<HTMLDivElement>(null);
  const renovationRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle hash navigation
    if (location.hash) {
      setTimeout(() => {
        const hash = location.hash.substring(1);
        const refs = {
          isolation: isolationRef,
          chauffage: chauffageRef,
          "eau-chaude": eauChaudeRef,
          solaire: solaireRef,
          renovation: renovationRef,
          business: businessRef,
        };

        // @ts-ignore
        const ref = refs[hash];
        if (ref && ref.current) {
          const yOffset = -100; // Adjust for navbar height
          const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 300);
    }
  }, [location]);

  return (
    <div>
      <Hero 
        title="Nos Services de Rénovation Énergétique"
        subtitle="Des solutions complètes et efficaces pour réduire votre consommation d'énergie et améliorer votre confort."
        buttonText="Demander un devis"
        buttonLink="/contact"
        imageSrc="https://images.pexels.com/photos/4489732/pexels-photo-4489732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        imageAlt="Isolation thermique par l'extérieur et des combles"
      />

      {/* Service navigation */}
      <section className="py-8 bg-supreme-light">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="ghost" className="text-supreme-primary hover:bg-supreme-primary/10">
              <a href="#isolation">Isolation Thermique</a>
            </Button>
            <Button asChild variant="ghost" className="text-supreme-primary hover:bg-supreme-primary/10">
              <a href="#chauffage">Pompes à Chaleur</a>
            </Button>
            <Button asChild variant="ghost" className="text-supreme-primary hover:bg-supreme-primary/10">
              <a href="#eau-chaude">Eau Chaude Sanitaire</a>
            </Button>
            <Button asChild variant="ghost" className="text-supreme-primary hover:bg-supreme-primary/10">
              <a href="#solaire">Panneaux Solaires</a>
            </Button>
            <Button asChild variant="ghost" className="text-supreme-primary hover:bg-supreme-primary/10">
              <a href="#renovation">Rénovation Globale</a>
            </Button>
            <Button asChild variant="ghost" className="text-supreme-primary hover:bg-supreme-primary/10">
              <a href="#business">Solutions Entreprises</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Isolation Thermique */}
      <section ref={isolationRef} id="isolation" className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <ThermometerSun className="w-8 h-8 text-supreme-primary mr-2" />
                <h2 className="text-3xl md:text-4xl font-bold text-supreme-primary">Isolation Thermique</h2>
              </div>
              <p className="text-lg mb-6 text-gray-700">
                Une bonne isolation est la base d'un logement économe en énergie. Nous proposons des solutions d'isolation adaptées à tous les types d'habitations pour réduire vos pertes de chaleur et améliorer votre confort.
              </p>
              <h3 className="text-xl font-semibold mb-4">Nos solutions d'isolation comprennent :</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Isolation des combles</span>
                    <p className="text-gray-600">Réduisez jusqu'à 30% de vos pertes de chaleur grâce à une isolation performante des combles.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Isolation des murs</span>
                    <p className="text-gray-600">Isolation par l'intérieur ou par l'extérieur pour une enveloppe thermique efficace.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Remplacement des fenêtres</span>
                    <p className="text-gray-600">Installation de fenêtres à double ou triple vitrage pour une meilleure performance thermique.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Isolation des planchers bas</span>
                    <p className="text-gray-600">Isolation des sous-sols et vides sanitaires pour un confort optimal.</p>
                  </div>
                </li>
              </ul>
              <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90">
                <Link to="/contact" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/4489773/pexels-photo-4489773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Isolation Thermique par l'extérieur"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pompes à Chaleur */}
      <section ref={chauffageRef} id="chauffage" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/5591874/pexels-photo-5591874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Pompes à Chaleur"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center mb-4">
                <Home className="w-8 h-8 text-supreme-primary mr-2" />
                <h2 className="text-3xl md:text-4xl font-bold text-supreme-primary">Pompes à Chaleur</h2>
              </div>
              <p className="text-lg mb-6 text-gray-700">
                Les pompes à chaleur représentent une solution économique et écologique pour chauffer votre logement. Elles utilisent les calories présentes dans l'air, l'eau ou le sol pour produire de la chaleur.
              </p>
              <h3 className="text-xl font-semibold mb-4">Nos solutions de chauffage incluent :</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Pompes à chaleur air/eau</span>
                    <p className="text-gray-600">Idéales pour remplacer une chaudière traditionnelle et alimenter un système de chauffage central.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Pompes à chaleur air/air</span>
                    <p className="text-gray-600">Solution simple et efficace pour chauffer et climatiser votre logement.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Pompes à chaleur géothermiques</span>
                    <p className="text-gray-600">Utilisation de l'énergie du sol pour un rendement optimal et constant toute l'année.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Installation et maintenance</span>
                    <p className="text-gray-600">Service complet d'installation, mise en service et entretien régulier pour garantir la performance.</p>
                  </div>
                </li>
              </ul>
              <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90">
                <Link to="/contact" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Eau Chaude Sanitaire */}
      <section ref={eauChaudeRef} id="eau-chaude" className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Droplets className="w-8 h-8 text-supreme-primary mr-2" />
                <h2 className="text-3xl md:text-4xl font-bold text-supreme-primary">Eau Chaude Sanitaire</h2>
              </div>
              <p className="text-lg mb-6 text-gray-700">
                La production d'eau chaude sanitaire peut représenter jusqu'à 30% de votre consommation d'énergie. Nos solutions permettent de réduire cette consommation tout en garantissant votre confort au quotidien.
              </p>
              <h3 className="text-xl font-semibold mb-4">Nos solutions pour l'eau chaude sanitaire :</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Chauffe-eau thermodynamiques</span>
                    <p className="text-gray-600">Utilisant la technologie des pompes à chaleur pour produire de l'eau chaude de manière économique.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Chauffe-eau solaires</span>
                    <p className="text-gray-600">Exploitation de l'énergie solaire pour chauffer votre eau gratuitement.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Systèmes solaires combinés</span>
                    <p className="text-gray-600">Production d'eau chaude et chauffage grâce à l'énergie solaire.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Systèmes hybrides</span>
                    <p className="text-gray-600">Combinaison de différentes technologies pour une efficacité maximale.</p>
                  </div>
                </li>
              </ul>
              <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90">
                <Link to="/contact" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/5824538/pexels-photo-5824538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Eau Chaude Sanitaire"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Panneaux Solaires */}
      <section ref={solaireRef} id="solaire" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" 
                alt="Panneaux Solaires"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center mb-4">
                <SunMedium className="w-8 h-8 text-supreme-primary mr-2" />
                <h2 className="text-3xl md:text-4xl font-bold text-supreme-primary">Panneaux Solaires</h2>
              </div>
              <p className="text-lg mb-6 text-gray-700">
                L'énergie solaire est une source d'énergie propre, gratuite et inépuisable. Nos solutions photovoltaïques vous permettent de produire votre propre électricité et de réduire vos factures.
              </p>
              <h3 className="text-xl font-semibold mb-4">Nos solutions solaires incluent :</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Panneaux solaires photovoltaïques</span>
                    <p className="text-gray-600">Production d'électricité à partir de l'énergie solaire, pour l'autoconsommation ou la revente.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Systèmes avec batteries de stockage</span>
                    <p className="text-gray-600">Stockage de l'énergie produite pour une utilisation lorsque le soleil ne brille pas.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Systèmes d'autoconsommation</span>
                    <p className="text-gray-600">Optimisation de la consommation de l'électricité produite sur place.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Maintenance et suivi de production</span>
                    <p className="text-gray-600">Services d'entretien et monitoring de la production pour garantir la performance.</p>
                  </div>
                </li>
              </ul>
              <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90">
                <Link to="/contact" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rénovation Globale */}
      <section ref={renovationRef} id="renovation" className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Building className="w-8 h-8 text-supreme-primary mr-2" />
                <h2 className="text-3xl md:text-4xl font-bold text-supreme-primary">Rénovation Globale</h2>
              </div>
              <p className="text-lg mb-6 text-gray-700">
                La rénovation globale est l'approche la plus efficace pour améliorer significativement la performance énergétique de votre logement. Nous vous accompagnons dans ce projet d'envergure pour maximiser les économies d'énergie.
              </p>
              <h3 className="text-xl font-semibold mb-4">Notre accompagnement comprend :</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Audit énergétique complet</span>
                    <p className="text-gray-600">Analyse détaillée de votre logement pour identifier les travaux prioritaires.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Plan de rénovation personnalisé</span>
                    <p className="text-gray-600">Proposition d'un programme de travaux adapté à votre budget et vos objectifs.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Accompagnement ANAH</span>
                    <p className="text-gray-600">Aide pour l'obtention des subventions de l'Agence Nationale de l'Habitat.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-supreme-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Coordination des travaux</span>
                    <p className="text-gray-600">Gestion complète du projet de la conception à la réalisation.</p>
                  </div>
                </li>
              </ul>
              <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90">
                <Link to="/contact" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1534237710431-e2fc6984a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Rénovation Globale"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions pour Entreprises */}
      <section ref={businessRef} id="business" className="section-padding bg-supreme-light">
        <div className="container-custom">
          <SectionHeader 
            title="Solutions pour Entreprises" 
            subtitle="Accompagnement des professionnels dans leur transition énergétique avec des solutions sur mesure adaptées aux besoins spécifiques de chaque activité."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-supreme-secondary">Audit Énergétique Industriel</h3>
              <p className="text-gray-600 mb-4">Analyse complète de vos installations pour identifier les potentiels d'économies d'énergie et optimiser votre consommation.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Analyse des flux énergétiques</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Identification des gisements d'économies</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Rapport détaillé et recommandations</span>
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-supreme-secondary">Isolation des Bâtiments Industriels</h3>
              <p className="text-gray-600 mb-4">Solutions d'isolation adaptées aux bâtiments industriels pour réduire les déperditions thermiques et améliorer le confort de travail.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Isolation des toitures et façades</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Traitement des ponts thermiques</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Amélioration de l'étanchéité à l'air</span>
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-supreme-secondary">Installations Photovoltaïques</h3>
              <p className="text-gray-600 mb-4">Production d'électricité verte pour réduire vos coûts énergétiques et votre empreinte carbone. Solutions adaptées aux grandes surfaces.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Étude de faisabilité et dimensionnement</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Installation et mise en service</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Maintenance et suivi de production</span>
                </li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-supreme-secondary">Optimisation des Systèmes CVC</h3>
              <p className="text-gray-600 mb-4">Modernisation et optimisation des systèmes de chauffage, ventilation et climatisation pour améliorer leur efficacité.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Régulation avancée et automatisation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Récupération de chaleur</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-6 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Remplacement par des équipements performants</span>
                </li>
              </ul>
            </div>

            {/* Service 5 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-supreme-secondary">Gestion Technique du Bâtiment</h3>
              <p className="text-gray-600 mb-4">Mise en place de systèmes de gestion intelligents pour optimiser la consommation énergétique de vos installations.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Automatisation des équipements</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Monitoring en temps réel</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Analyse des données de consommation</span>
                </li>
              </ul>
            </div>

            {/* Service 6 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-supreme-secondary">Accompagnement CEE</h3>
              <p className="text-gray-600 mb-4">Assistance complète pour bénéficier des Certificats d'Économies d'Énergie et réduire le coût de vos travaux d'efficacité énergétique.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Identification des opérations éligibles</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Constitution des dossiers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-supreme-secondary mr-2 flex-shrink-0" />
                  <span>Validation et obtention des certificats</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-supreme-secondary hover:bg-supreme-secondary/90">
              <Link to="/contact" className="flex items-center gap-2">
                Contactez notre équipe B2B
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Aides Financières */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader 
            title="Aides Financières" 
            subtitle="Bénéficiez des différentes aides disponibles pour financer vos travaux de rénovation énergétique. Notre équipe vous accompagne dans toutes vos démarches."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Aide 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">MaPrimeRénov'</h3>
              <p className="text-gray-600 mb-4">
                Aide financière de l'État pour la rénovation énergétique, accessible à tous les propriétaires et copropriétés.
              </p>
              <p className="text-sm text-gray-500 italic">
                Le montant de l'aide dépend de vos revenus et des économies d'énergie permises par les travaux.
              </p>
            </div>

            {/* Aide 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Certificats d'Économies d'Énergie (CEE)</h3>
              <p className="text-gray-600 mb-4">
                Dispositif obligeant les fournisseurs d'énergie à financer des travaux d'économies d'énergie.
              </p>
              <p className="text-sm text-gray-500 italic">
                Primes, prêts bonifiés ou diagnostics gratuits selon les offres des fournisseurs d'énergie.
              </p>
            </div>

            {/* Aide 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Éco-Prêt à Taux Zéro</h3>
              <p className="text-gray-600 mb-4">
                Prêt sans intérêts pour financer des travaux de rénovation énergétique dans votre logement.
              </p>
              <p className="text-sm text-gray-500 italic">
                Jusqu'à 50 000 € remboursables sur 20 ans pour un bouquet de travaux.
              </p>
            </div>

            {/* Aide 4 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">TVA à Taux Réduit</h3>
              <p className="text-gray-600 mb-4">
                TVA à 5,5% pour les travaux d'amélioration énergétique dans les logements achevés depuis plus de 2 ans.
              </p>
              <p className="text-sm text-gray-500 italic">
                Applicable directement sur votre facture sans démarche particulière.
              </p>
            </div>

            {/* Aide 5 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Aides des Collectivités Locales</h3>
              <p className="text-gray-600 mb-4">
                Subventions complémentaires proposées par les régions, départements et communes.
              </p>
              <p className="text-sm text-gray-500 italic">
                Variables selon les territoires et cumulables avec les aides nationales.
              </p>
            </div>

            {/* Aide 6 */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Aides de l'ANAH</h3>
              <p className="text-gray-600 mb-4">
                Subventions de l'Agence Nationale de l'Habitat pour les rénovations globales et performantes.
              </p>
              <p className="text-sm text-gray-500 italic">
                Jusqu'à 50% du montant des travaux selon les conditions de ressources.
              </p>
            </div>
          </div>

          <div className="bg-supreme-light rounded-lg p-8 mt-12 shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-center">Besoin d'aide pour y voir plus clair ?</h3>
            <p className="text-lg text-center mb-6">
              Nos conseillers vous accompagnent dans toutes vos démarches pour obtenir les aides auxquelles vous avez droit.
            </p>
            <div className="text-center">
              <Button asChild className="bg-supreme-accent hover:bg-supreme-accent/90">
                <Link to="/contact">Faire une simulation gratuite</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA 
        title="Démarrez votre projet dès maintenant"
        subtitle="Contactez notre équipe pour un devis personnalisé et gratuit. Nos experts sont à votre disposition pour répondre à toutes vos questions."
      />
    </div>
  );
};

export default Services;
