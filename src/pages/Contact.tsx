import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Clock } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const faqItems = [
  { question: "Comment obtenir un devis ?", answer: "Vous pouvez obtenir un devis gratuit en remplissant notre formulaire de contact ou en nous contactant par mail. Un conseiller prendra contact avec vous pour organiser une visite technique si nécessaire." },
  { question: "Quelles aides puis-je obtenir pour mes travaux ?", answer: "Plusieurs aides sont disponibles selon votre situation : MaPrimeRénov', CEE, éco-PTZ, TVA réduite, aides de l'ANAH... Nos conseillers peuvent vous aider à déterminer celles auxquelles vous êtes éligible et vous accompagner dans vos démarches." },
  { question: "Combien de temps durent les travaux ?", answer: "La durée des travaux varie selon la nature et l'ampleur du projet. Une isolation de combles peut prendre une journée, tandis qu'une rénovation globale peut s'étendre sur plusieurs semaines. Nous établissons un planning détaillé avant le début des travaux." },
  { question: "Proposez-vous un service après-vente ?", answer: "Oui, nous offrons un service après-vente complet comprenant la maintenance, le dépannage et le suivi de performance pour tous nos travaux et installations." },
  { question: "Quelles garanties proposez-vous ?", answer: "Nous proposons une garantie décennale sur tous nos travaux d'installation et une garantie de parfait achèvement d'un an. De plus, nous travaillons exclusivement avec des équipementiers reconnus offrant leurs propres garanties constructeur." },
  { question: "Intervenez-vous dans toute la France ?", answer: "Notre zone d'intervention principale est la région parisienne et l'Île-de-France. Nous pouvons également intervenir dans d'autres régions pour des projets spécifiques." }
];

const Contact = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#formulaire') {
      setTimeout(() => {
        document.getElementById('formulaire')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [location]);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "SupremEnergies",
      "telephone": "01 86 04 68 89",
      "email": "contact@supremenergies.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "55 rue Cartier Bresson",
        "addressLocality": "Pantin",
        "postalCode": "93500",
        "addressCountry": "FR"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <div>
      <Helmet>
        <title>Contactez SupremEnergies | Devis Gratuit Rénovation Énergétique</title>
        <meta name="description" content="Contactez SupremEnergies pour un devis gratuit. Expert en rénovation énergétique en Île-de-France : isolation, pompes à chaleur, panneaux solaires. Réponse sous 24h." />
        <link rel="canonical" href="https://supremenergies.com/contact" />
        <meta property="og:title" content="Contactez SupremEnergies | Devis Gratuit Rénovation Énergétique" />
        <meta property="og:description" content="Devis gratuit pour vos travaux de rénovation énergétique. Réponse sous 24h." />
        <meta property="og:url" content="https://supremenergies.com/contact" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Contact Form Section - First */}
      <section className="section-padding bg-gray-50 pt-32" id="formulaire">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-supreme-primary text-center">Contactez SupremEnergies</h1>
            <p className="text-lg mb-8 text-gray-700 text-center">
              Remplissez le formulaire ci-dessous pour nous faire part de votre projet. Un conseiller vous recontactera dans les 24h.
            </p>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-supreme-primary">Nos Coordonnées</h2>
              <p className="text-lg mb-8 text-gray-700">
                N'hésitez pas à nous contacter par email ou en venant directement à nos bureaux. Notre équipe de conseillers spécialisés se fera un plaisir de vous accompagner dans vos projets.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-supreme-light rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-supreme-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Adresse</h3>
                    <p className="text-gray-600">55 rue cartier bresson, 93500 pantin, France</p>
                    <p className="text-gray-600">Téléphone: 01 86 04 68 89</p>
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
                    <p className="text-gray-600">Lundi - Vendredi: 9h00 - 19h00</p>
                    <p className="text-gray-600">Samedi - Dimanche: Fermé</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px] shadow-md">
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
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-supreme-light">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-supreme-primary text-center">Questions Fréquemment Posées</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
