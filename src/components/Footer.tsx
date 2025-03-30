
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container-custom">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">SupremEnergies</h3>
            <p className="mb-4 text-gray-300">
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
            <h3 className="text-xl font-bold mb-4 text-white">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Nos Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#isolation" className="text-gray-300 hover:text-white transition-colors">
                  Isolation Thermique
                </Link>
              </li>
              <li>
                <Link to="/services#chauffage" className="text-gray-300 hover:text-white transition-colors">
                  Pompes à Chaleur
                </Link>
              </li>
              <li>
                <Link to="/services#eau-chaude" className="text-gray-300 hover:text-white transition-colors">
                  Eau Chaude Sanitaire
                </Link>
              </li>
              <li>
                <Link to="/services#solaire" className="text-gray-300 hover:text-white transition-colors">
                  Panneaux Solaires
                </Link>
              </li>
              <li>
                <Link to="/services#renovation" className="text-gray-300 hover:text-white transition-colors">
                  Rénovation Globale
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-supreme-accent flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  123 Rue de l'Énergie,<br />75001 Paris, France
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-supreme-accent flex-shrink-0" />
                <a href="tel:+33123456789" className="text-gray-300 hover:text-white transition-colors">
                  01 23 45 67 89
                </a>
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
        <div className="pt-8 border-t border-gray-800 mt-8 text-center text-gray-400">
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
    </footer>
  );
};

export default Footer;
