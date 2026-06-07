import { Link } from "react-router-dom";
import SeoMeta from "@/components/SeoMeta";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <SeoMeta
        title="Conditions Générales d'Utilisation | SupremEnergies"
        description="Conditions Générales d'Utilisation du site SupremEnergies, expert en rénovation énergétique."
        canonical="/terms"
        robots="noindex, follow"
      />
      <div className="container-custom max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <nav className="mb-8">
            <Link
              to="/"
              className="text-supreme-primary hover:text-supreme-primary/80 transition-colors"
            >
              ← Retour à l'accueil
            </Link>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold mb-8">Conditions Générales d'Utilisation</h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Objet</h2>
            <p className="mb-6">
              Les présentes Conditions Générales d'Utilisation (« CGU ») encadrent juridiquement l'utilisation
              du site SupremEnergies (https://www.supremenergies.com) et des services en ligne mis à disposition
              par SupremEnergies, entreprise spécialisée dans la rénovation énergétique
              (isolation, pompes à chaleur, panneaux solaires, rénovation globale).
              Tout accès ou utilisation du site implique l'acceptation pleine et entière des présentes CGU.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Éditeur</h2>
            <p className="mb-6">
              Le site est édité par <strong>SupremEnergies</strong>, dont le siège social est situé au
              55 rue Cartier-Bresson, 93500 Pantin.<br/>
              Téléphone : 01 86 04 68 89 — Email : contact@supremenergies.com.<br/>
              Voir les <Link to="/mentions-legales" className="text-supreme-primary underline">mentions légales</Link>
              {" "}pour les informations complémentaires.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Accès aux services</h2>
            <p className="mb-4">Le site permet à l'Utilisateur d'accéder gratuitement aux services suivants :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Information sur les solutions de rénovation énergétique et les aides associées
                (MaPrimeRénov', CEE, éco-PTZ, TVA réduite…)</li>
              <li>Demande de devis en ligne et prise de contact avec nos conseillers</li>
              <li>Téléchargement de guides et utilisation du simulateur d'aides</li>
              <li>Inscription à la newsletter et consultation du blog</li>
            </ul>
            <p className="mb-6">
              Le site est accessible 24/7, sauf interruption pour maintenance ou cas de force majeure.
              SupremEnergies ne saurait être tenue responsable d'une indisponibilité temporaire.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Devis et nature des informations</h2>
            <p className="mb-6">
              Les estimations, simulations d'aides et contenus publiés sur le site sont fournis à titre
              indicatif. Seul un devis personnalisé établi par SupremEnergies après visite technique
              ou étude détaillée a une valeur contractuelle. L'éligibilité aux aides publiques dépend
              de la réglementation en vigueur, de la situation du demandeur et de la nature des travaux.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Obligations de l'Utilisateur</h2>
            <p className="mb-4">L'Utilisateur s'engage à :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Fournir des informations exactes et à jour lors de ses demandes</li>
              <li>Ne pas utiliser le site à des fins illicites ou portant atteinte aux droits de tiers</li>
              <li>Ne pas tenter de perturber le fonctionnement du site (intrusion, scraping massif, etc.)</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Données personnelles</h2>
            <p className="mb-6">
              Le traitement des données collectées via le site est décrit dans notre
              {" "}<Link to="/privacy" className="text-supreme-primary underline">politique de confidentialité</Link>,
              conforme au RGPD.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Propriété intellectuelle</h2>
            <p className="mb-6">
              La marque SupremEnergies, son logo, ainsi que l'ensemble des contenus du site (textes, images,
              infographies, vidéos, code source) sont protégés par le droit d'auteur et le droit des marques.
              Toute reproduction ou diffusion, totale ou partielle, sans autorisation préalable écrite est
              interdite et constitue une contrefaçon (art. L.335-2 et suivants du Code de la propriété intellectuelle).
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Responsabilité</h2>
            <p className="mb-6">
              SupremEnergies met tout en œuvre pour fournir des informations fiables et actualisées, sans pour
              autant garantir l'absence d'erreurs, d'omissions ou d'inexactitudes. La société ne pourra être
              tenue responsable des dommages directs ou indirects résultant de l'utilisation du site ou de
              l'impossibilité d'y accéder. Les décisions prises sur la base des informations diffusées le sont
              sous l'entière responsabilité de l'Utilisateur.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Liens hypertextes</h2>
            <p className="mb-6">
              Le site peut contenir des liens vers des sites tiers (sites gouvernementaux, partenaires,
              fabricants). SupremEnergies n'exerce aucun contrôle sur ces sites et décline toute
              responsabilité quant à leur contenu.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">10. Cookies</h2>
            <p className="mb-6">
              Le site utilise des cookies à des fins de fonctionnement, de mesure d'audience et de marketing.
              Le détail et les modalités de gestion sont décrits dans la
              {" "}<Link to="/privacy" className="text-supreme-primary underline">politique de confidentialité</Link>.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">11. Modification des CGU</h2>
            <p className="mb-6">
              SupremEnergies se réserve le droit de modifier les présentes CGU à tout moment. La version
              applicable est celle en ligne au moment de la consultation. Il est recommandé à l'Utilisateur
              de les consulter régulièrement.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">12. Médiation et droit applicable</h2>
            <p className="mb-6">
              Les présentes CGU sont soumises au droit français. En cas de litige, et après tentative de
              résolution amiable, l'Utilisateur consommateur peut saisir gratuitement un médiateur de la
              consommation (article L.612-1 du Code de la consommation). À défaut, compétence est attribuée
              aux tribunaux français.
            </p>

            <p className="text-sm text-gray-600 mt-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
