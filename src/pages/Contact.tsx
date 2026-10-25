import { Helmet } from "react-helmet-async";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Clock, Phone, Star, CheckCircle2 } from "lucide-react";
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
        <title>Contact | SupremEnergies – Rénovation énergétique</title>
        <meta name="description" content="✓ Devis gratuit en 48h ✓ Conseiller dédié. Pompe à chaleur, isolation, solaire en Île-de-France. Jusqu'à 11 000€ d'aides MaPrimeRénov' 2026." />
        <link rel="canonical" href="https://supremenergies.com/contact" />
        <meta property="og:title" content="Devis Gratuit Rénovation Énergétique 48h ★ SupremEnergies" />
        <meta property="og:description" content="Devis gratuit pour vos travaux de rénovation énergétique. Réponse sous 48h." />
        <meta property="og:url" content="https://supremenergies.com/contact" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="bg-supreme-light pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-supreme-primary">Parlons de votre projet</h1>
            <p className="text-lg text-muted-foreground">Un conseiller vous rappelle sous 24h, du lundi au vendredi. Devis gratuit et sans engagement.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div id="formulaire" className="lg:col-span-2 bg-card rounded-2xl shadow-md p-6 md:p-8 border border-border">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Envoyez-nous un message</h2>
              <ContactForm />
            </div>
            <aside className="space-y-5">
              <a href="tel:0186046889" className="block rounded-2xl bg-supreme-primary p-6 text-white shadow-md hover:bg-supreme-primary/90 transition-colors">
                <Phone className="h-6 w-6 mb-3 text-supreme-accent" />
                <p className="text-sm text-white/80">Vous préférez appeler ?</p>
                <p className="text-2xl font-bold">01 86 04 68 89</p>
                <p className="text-sm text-white/80 mt-1">Lun – Ven · 9h – 19h</p>
              </a>
              <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-supreme-primary mt-0.5" />
                  <a href="mailto:contact@supremenergies.com" className="text-foreground break-all hover:underline">contact@supremenergies.com</a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-supreme-primary mt-0.5" />
                  <p className="text-foreground">Lundi – Vendredi : 9h – 19h<br /><span className="text-muted-foreground">Week-end : fermé</span></p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-supreme-primary mt-0.5" />
                  <p className="text-foreground">55 rue Cartier-Bresson, 93500 Pantin<br /><span className="text-sm text-muted-foreground">Siège administratif — pas d'accueil du public</span></p>
                </div>
              </div>
              <a href="https://www.google.com/maps/place/?q=place_id:ChIJ9z-FH6XlRkARdJA1ALkFU38" target="_blank" rel="noopener noreferrer" className="block rounded-2xl bg-card border border-border p-6 hover:shadow-md transition-shadow">
                <div className="flex text-supreme-accent mb-2" aria-hidden="true">{[0,1,2,3,4].map((i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
                <p className="font-bold text-foreground">5/5 · 19 avis Google</p>
                <p className="text-sm text-muted-foreground">Lire les avis de nos clients</p>
              </a>
              <ul className="space-y-2 px-1">
                {["Réponse sous 24h", "Devis gratuit et sans engagement", "Aide pour vos dossiers d'aides"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-foreground"><CheckCircle2 className="h-5 w-5 text-supreme-primary" />{t}</li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-supreme-primary text-center">Questions fréquentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
