import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SeoMeta from "@/components/SeoMeta";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <SeoMeta
        title="Page introuvable (404) | SupremEnergies"
        description="La page demandée n'existe pas. Découvrez nos services de rénovation énergétique en Île-de-France."
        canonical={location.pathname}
        robots="noindex, nofollow"
      />
      {/* Hint pour les pré-renderers / bots */}
      <meta name="prerender-status-code" content="404" />

      <div className="text-center max-w-xl">
        <h1 className="text-6xl font-bold mb-4 text-supreme-primary">404</h1>
        <p className="text-2xl text-gray-700 mb-3">Cette page est introuvable</p>
        <p className="text-gray-600 mb-8">
          Le lien est peut-être obsolète. Voici quelques pages qui pourraient vous intéresser :
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">
          <li><Link to="/" className="text-supreme-primary hover:underline">→ Accueil</Link></li>
          <li><Link to="/services" className="text-supreme-primary hover:underline">→ Tous nos services</Link></li>
          <li><Link to="/services/pompe-a-chaleur" className="text-supreme-primary hover:underline">→ Pompe à chaleur</Link></li>
          <li><Link to="/services/isolation-thermique" className="text-supreme-primary hover:underline">→ Isolation thermique</Link></li>
          <li><Link to="/services/panneaux-solaires" className="text-supreme-primary hover:underline">→ Panneaux solaires</Link></li>
          <li><Link to="/services/renovation-globale" className="text-supreme-primary hover:underline">→ Rénovation globale</Link></li>
          <li><Link to="/simulateur-aides" className="text-supreme-primary hover:underline">→ Simulateur d'aides 2026</Link></li>
          <li><Link to="/contact" className="text-supreme-primary hover:underline">→ Demander un devis</Link></li>
        </ul>

        <Link
          to="/"
          className="inline-block bg-supreme-primary hover:bg-supreme-primary/90 text-white px-6 py-3 rounded-md font-medium"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
