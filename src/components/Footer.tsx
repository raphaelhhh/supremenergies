import { Link } from "react-router-dom";
import { Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
import FooterPopularArticles from "./FooterPopularArticles";
const Footer = () => {
  return <footer className="bg-gray-900 text-white">
      <div className="container-custom">
        {/* Newsletter Section */}
        <div className="py-10 border-b border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">Restez informé</h3>
              <p className="text-gray-300">
                Inscrivez-vous à notre newsletter pour recevoir nos actualités et conseils sur l'efficacité énergétique.
              </p>
            </div>
            <div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = formData.get('email') as string;
                
                if (!email) {
                  alert('Veuillez saisir votre email');
                  return;
                }

                try {
                  await fetch("https://hooks.zapier.com/hooks/catch/23975075/uulr9bm/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    mode: "no-cors",
                    body: JSON.stringify({
                      timestamp: new Date().toISOString(),
                      email: email,
                      type: "Newsletter",
                      source: "Footer site web"
                    }),
                  });
                  
                  alert('Inscription réussie !');
                  e.currentTarget.reset();
                } catch (error) {
                  alert('Erreur lors de l\'inscription');
                }
              }} className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Votre adresse email" 
                  className="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-supreme-primary" 
                  required 
                />
                <button type="submit" className="bg-supreme-primary hover:bg-supreme-primary/90 text-white px-6 py-3 rounded-md transition-colors flex-shrink-0 flex items-center justify-center">
                  S'inscrire <ArrowRight size={16} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Main Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">SupremEnergies</h3>
            <p className="mb-6 text-gray-300">
              Experts en rénovation énergétique pour particuliers et professionnels.
              Garantie décennale et accompagnement personnalisé.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Liens Rapides</h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Accueil" },
                { to: "/services", label: "Tous nos services" },
                { to: "/simulateur-aides", label: "Simulateur d'aides 2026" },
                { to: "/devis-gratuit", label: "Devis gratuit" },
                { to: "/temoignages", label: "Témoignages clients" },
                { to: "/blog", label: "Blog & guides" },
                { to: "/about", label: "Qui sommes-nous ?" },
                { to: "/contact", label: "Nous contacter" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-300 hover:text-white transition-colors flex items-center">
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
                { to: "/services/isolation-thermique/lyon", label: "Isolation à Lyon" },
                { to: "/services/panneaux-solaires/marseille", label: "Solaire à Marseille" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-300 hover:text-white transition-colors flex items-center">
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
                <span className="text-gray-300">
                  55 rue cartier bresson,<br />93500 pantin, France
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-supreme-accent flex-shrink-0" />
                <a href="mailto:contact@supremenergies.com" className="text-gray-300 hover:text-white transition-colors">
                  contact@supremenergies.com
                </a>
              </li>
            </ul>
          </div>
        </div>


        {/* Footer Bottom - Copyright */}
        <div className="py-6 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SupremEnergies. Tous droits réservés.</p>
          <p className="mt-2 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            {" | "}
            <Link to="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</Link>
            {" | "}
            <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;
