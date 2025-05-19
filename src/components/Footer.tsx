import { Link } from "react-router-dom";
import { Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from "lucide-react";
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
              <form className="flex flex-col sm:flex-row gap-2">
                <input type="email" placeholder="Votre adresse email" className="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-supreme-primary" required />
                <button type="submit" className="bg-supreme-primary hover:bg-supreme-primary/90 text-white px-6 py-3 rounded-md transition-colors flex-shrink-0 flex items-center justify-center">
                  S'inscrire <ArrowRight size={16} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Main Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">SupremEnergies</h3>
            <p className="mb-6 text-gray-300">
              Experts en rénovation énergétique pour particuliers et professionnels.
              Qualification RGE, garantie décennale et accompagnement personnalisé.
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
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2 text-supreme-accent" />
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2 text-supreme-accent" />
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2 text-supreme-accent" />
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2 text-supreme-accent" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2 text-supreme-accent" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Nos Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services#isolation" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2 text-supreme-accent" />
                  Isolation Thermique
                </Link>
              </li>
              <li>
                <Link to="/services#chauffage" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2 text-supreme-accent" />
                  Pompes à Chaleur
                </Link>
              </li>
              <li>
                <Link to="/services#eau-chaude" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2 text-supreme-accent" />
                  Eau Chaude Sanitaire
                </Link>
              </li>
              <li>
                <Link to="/services#solaire" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2 text-supreme-accent" />
                  Panneaux Solaires
                </Link>
              </li>
              <li>
                <Link to="/services#renovation" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2 text-supreme-accent" />
                  Rénovation Globale
                </Link>
              </li>
            </ul>
          </div>

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

        {/* Certifications Section with Real RGE Logos */}
        <div className="py-6 border-t border-gray-800">
          <h4 className="text-center text-lg font-medium mb-4 text-white">Nos certifications</h4>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex flex-col items-center">
              <div className="bg-transparent p-2 rounded-lg flex items-center justify-center" style={{
              width: '120px',
              height: '120px'
            }}>
                <img src="https://raw.githubusercontent.com/raphaelhhh/supremenergies/main/src/components/logo-QualiPAC-2025-RGE_sc.png" alt="QualiPAC RGE" className="max-w-full max-h-full object-contain drop-shadow-md" />
              </div>
              <span className="text-gray-300 text-xs mt-1"></span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-transparent p-2 rounded-lg flex items-center justify-center" style={{
              width: '120px',
              height: '120px'
            }}>
                <img src="https://raw.githubusercontent.com/raphaelhhh/supremenergies/main/src/components/download-Photoroom.png" alt="QualiSol RGE" className="max-w-full max-h-full object-contain drop-shadow-md" />
              </div>
              <span className="text-gray-300 text-xs mt-1"></span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-transparent p-2 rounded-lg flex items-center justify-center" style={{
              width: '120px',
              height: '120px'
            }}>
                <img src="https://raw.githubusercontent.com/raphaelhhh/supremenergies/main/src/components/download-1.png" alt="QualiBois RGE" className="max-w-full max-h-full object-contain drop-shadow-md" />
              </div>
              <span className="text-gray-300 text-xs mt-1"></span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-transparent p-2 rounded-lg flex items-center justify-center" style={{
              width: '120px',
              height: '120px'
            }}>
                <img src="https://raw.githubusercontent.com/raphaelhhh/supremenergies/main/src/components/download-Photoroom%20(1).png" alt="Qualibat RGE" className="max-w-full max-h-full object-contain drop-shadow-md" />
              </div>
              <span className="text-gray-300 text-xs mt-1"></span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-transparent p-2 rounded-lg flex items-center justify-center" style={{
              width: '120px',
              height: '120px'
            }}>
                <img src="https://raw.githubusercontent.com/raphaelhhh/supremenergies/main/src/pages/download-Photoroom123456.png" alt="QualiPV RGE" className="max-w-full max-h-full object-contain drop-shadow-md" />
              </div>
              <span className="text-gray-300 text-xs mt-1"></span>
            </div>
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
