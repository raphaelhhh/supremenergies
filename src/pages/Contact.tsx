
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div>
      <Hero 
        title="Contactez-nous"
        subtitle="Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre projet de rénovation énergétique."
        buttonText="Voir nos services"
        buttonLink="/services"
        imageSrc="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-supreme-primary">Nos Coordonnées</h2>
              <p className="text-lg mb-8 text-gray-700">
                N'hésitez pas à nous contacter par téléphone, email ou en venant directement à nos bureaux. Notre équipe se fera un plaisir de vous accueillir et de répondre à vos questions.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-supreme-light rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-supreme-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Adresse</h3>
                    <p className="text-gray-600">123 Rue de l'Énergie, 75001 Paris, France</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-supreme-light rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-supreme-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Téléphone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+33123456789" className="hover:text-supreme-primary transition-colors">
                        01 23 45 67 89
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-supreme-light rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-supreme-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:contact@supremenergies.com" className="hover:text-supreme-primary transition-colors">
                        contact@supremenergies.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-supreme-light rounded-full p-3 mr-4">
                    <Clock className="h-6 w-6 text-supreme-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Horaires d'ouverture</h3>
                    <p className="text-gray-600">Lundi - Vendredi: 9h00 - 18h00</p>
                    <p className="text-gray-600">Samedi: 9h00 - 12h00</p>
                    <p className="text-gray-600">Dimanche: Fermé</p>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="mt-8 bg-gray-200 rounded-lg overflow-hidden h-[300px] shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047557097!2d2.3414048768644355!3d48.86150940090647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sPalais%20Royal%2C%2075001%20Paris!5e0!3m2!1sfr!2sfr!4v1682504184416!5m2!1sfr!2sfr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carte Google Maps de SupremEnergies"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-supreme-primary">Formulaire de Contact</h2>
              <p className="text-lg mb-8 text-gray-700">
                Remplissez le formulaire ci-dessous pour nous faire part de votre demande. Nous vous répondrons dans les plus brefs délais.
              </p>
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-supreme-light">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-supreme-primary text-center">Questions Fréquentes</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3">Comment obtenir un devis ?</h3>
              <p className="text-gray-600">
                Vous pouvez obtenir un devis gratuit en remplissant notre formulaire de contact, en nous appelant directement ou en nous rendant visite dans nos bureaux. Un conseiller prendra contact avec vous pour organiser une visite technique si nécessaire.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3">Quelles aides puis-je obtenir pour mes travaux ?</h3>
              <p className="text-gray-600">
                Plusieurs aides sont disponibles selon votre situation : MaPrimeRénov', CEE, éco-PTZ, TVA réduite, aides de l'ANAH... Nos conseillers peuvent vous aider à déterminer celles auxquelles vous êtes éligible et vous accompagner dans vos démarches.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3">Combien de temps durent les travaux ?</h3>
              <p className="text-gray-600">
                La durée des travaux varie selon la nature et l'ampleur du projet. Une isolation de combles peut prendre une journée, tandis qu'une rénovation globale peut s'étendre sur plusieurs semaines. Nous établissons un planning détaillé avant le début des travaux.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3">Proposez-vous un service après-vente ?</h3>
              <p className="text-gray-600">
                Oui, nous offrons un service après-vente complet comprenant la maintenance, le dépannage et le suivi de performance pour tous nos travaux et installations. Nous sommes à votre disposition pour répondre à vos questions et résoudre d'éventuels problèmes.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3">Êtes-vous certifiés RGE ?</h3>
              <p className="text-gray-600">
                Oui, SupremEnergies est certifiée RGE (Reconnu Garant de l'Environnement), ce qui garantit notre expertise et vous permet de bénéficier des aides financières pour vos travaux de rénovation énergétique.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3">Intervenez-vous dans toute la France ?</h3>
              <p className="text-gray-600">
                Notre zone d'intervention principale est la région parisienne et l'Île-de-France. Nous pouvons également intervenir dans d'autres régions pour des projets spécifiques, notamment pour les entreprises. N'hésitez pas à nous contacter pour vérifier notre disponibilité.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
