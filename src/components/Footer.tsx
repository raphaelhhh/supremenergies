import { Link } from "react-router-dom";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import FooterPopularArticles from "./FooterPopularArticles";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { trackLead } from "@/lib/track-lead";
import { Button } from "@/components/ui/button";
const Footer = () => {
  const [newsletterBusy, setNewsletterBusy] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("");
  return <footer className="bg-supreme-dark text-primary-foreground border-t border-secondary">
      <div className="container-custom">
        {/* Newsletter Section */}
        <div className="py-10 border-b border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">Restez informé</h3>
              <p className="text-gray-200">
                Inscrivez-vous à notre newsletter pour recevoir nos actualités et conseils sur l'efficacité énergétique.
              </p>
            </div>
            <div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const email = formData.get('email') as string;
                
                if (!email) {
                  setNewsletterMessage('Veuillez saisir votre email');
                  return;
                }

                setNewsletterBusy(true);
                setNewsletterMessage("");
                try {
                  const { error } = await supabase.functions.invoke("send-lead-magnet", {
                    body: { email, source: "newsletter", consent: true, page_path: window.location.pathname },
                  });
                  if (error) throw error;
                  trackLead({ source: "newsletter" });
                  setNewsletterMessage('Inscription réussie !');
                  form.reset();
                } catch (error) {
                  setNewsletterMessage('Erreur lors de l’inscription. Veuillez réessayer.');
                } finally {
                  setNewsletterBusy(false);
                }
              }} className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  name="email"
                  aria-label="Email pour la newsletter"
                  placeholder="Votre adresse email" 
                  className="flex-grow p-3 bg-card border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-supreme-accent" 
                  required 
                />
                <Button type="submit" disabled={newsletterBusy} className="bg-supreme-accent hover:bg-supreme-accent/90 text-supreme-dark px-6 py-3 h-auto flex-shrink-0">
                  {newsletterBusy ? "Envoi…" : "S'inscrire"} <ArrowRight size={16} className="ml-2" />
                </Button>
              </form>
              <p className="text-xs mt-2">En vous inscrivant, vous acceptez de recevoir notre newsletter. <Link to="/privacy" className="underline">Confidentialité</Link></p>
              {newsletterMessage && <p role="status" className="text-sm mt-2">{newsletterMessage}</p>}
            </div>
          </div>
        </div>

        {/* Footer Main Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">SupremEnergies</h3>
            <p className="mb-6 text-gray-200">
              Experts en rénovation énergétique pour particuliers et professionnels.
              Garantie décennale et accompagnement personnalisé.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Liens Rapides</h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Accueil" },
                { to: "/services", label: "Tous nos services" },
                { to: "/simulateur-aides", label: "Simulateur d'aides 2026" },
                { to: "/aides-renovation-2026", label: "Guide aides 2026" },
                { to: "/devis-gratuit", label: "Devis gratuit" },
                { to: "/temoignages", label: "Témoignages clients" },
                { to: "/blog", label: "Blog & guides" },
                { to: "/about", label: "Qui sommes-nous ?" },
                { to: "/contact", label: "Nous contacter" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-200 hover:text-white transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2 text-supreme-accent" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Nos Services</h3>
            <ul className="space-y-3">
              {[
                { to: "/services/isolation-thermique", label: "Isolation Thermique" },
                { to: "/services/pompe-a-chaleur", label: "Pompe à Chaleur" },
                { to: "/services/panneaux-solaires", label: "Panneaux Solaires" },
                { to: "/services/renovation-globale", label: "Rénovation Globale" },
                { to: "/services/pompe-a-chaleur/paris", label: "PAC à Paris" },
                { to: "/services/isolation-thermique/lille", label: "Isolation à Lille" },
                { to: "/services/panneaux-solaires/versailles", label: "Solaire à Versailles" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-200 hover:text-white transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2 text-supreme-accent" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides piliers SEO */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Guides 2026</h3>
            <ul className="space-y-3">
              {[
                { to: "/aides-renovation-2026", label: "Toutes les aides 2026" },
                { to: "/pompe-a-chaleur-2026", label: "Pompe à chaleur 2026" },
                { to: "/simulateur-aides", label: "Simulateur d'aides" },
                { to: "/region/hauts-de-france", label: "Hauts-de-France" },
                { to: "/blog", label: "Blog rénovation" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-200 hover:text-white transition-colors flex items-center">
                    <ArrowRight size={16} className="mr-2 text-supreme-accent" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Articles récents (SEO maillage interne) */}
          <FooterPopularArticles />

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-supreme-accent flex-shrink-0 mt-1" />
                <span className="text-gray-200">
                  55 rue Cartier-Bresson,<br />93500 Pantin, France
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-supreme-accent flex-shrink-0" />
                <a href="mailto:contact@supremenergies.com" className="text-gray-200 hover:text-white transition-colors break-all">
                  contact@supremenergies.com
                </a>
              </li>
            </ul>
          </div>
        </div>


        {/* Footer Bottom - Copyright */}
        <div className="py-6 border-t border-gray-800 text-center text-gray-200">
          <p>&copy; {new Date().getFullYear()} SupremEnergies. Tous droits réservés.</p>
          <p className="mt-2 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            {" | "}
            <Link to="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</Link>
            {" | "}
            <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            {" | "}
            <Link to="/plan-du-site" className="hover:text-white transition-colors">Plan du site</Link>
            {" | "}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
              className="hover:text-white transition-colors"
            >
              Paramètres des cookies
            </button>
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;
