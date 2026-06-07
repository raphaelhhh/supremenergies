import { Link } from "react-router-dom";
import SeoMeta from "@/components/SeoMeta";

const LegalNotices = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <SeoMeta
        title="Mentions Légales | SupremEnergies"
        description="Mentions légales du site SupremEnergies : éditeur, hébergeur, propriété intellectuelle, activité de rénovation énergétique."
        canonical="/mentions-legales"
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

          <h1 className="text-3xl md:text-4xl font-bold mb-8">Mentions Légales</h1>

          <div className="prose prose-lg max-w-none">
            <p className="mb-6 text-gray-700">
              Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004
              pour la Confiance dans l'économie numérique (LCEN), il est précisé aux utilisateurs du site
              SupremEnergies l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Éditeur du site</h2>
            <p className="mb-6">
              <strong>Raison sociale :</strong> SupremEnergies<br/>
              <strong>Siège social :</strong> 55 rue Cartier-Bresson, 93500 Pantin, France<br/>
              <strong>Téléphone :</strong> 01 86 04 68 89<br/>
              <strong>Email :</strong> contact@supremenergies.com<br/>
              <strong>Site internet :</strong> https://www.supremenergies.com
            </p>
            <p className="mb-6 text-sm text-gray-600">
              Les informations légales complémentaires (forme juridique, capital social, numéro SIRET,
              RCS et numéro de TVA intracommunautaire) sont communiquées sur simple demande à l'adresse
              contact@supremenergies.com.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Directeur de la publication</h2>
            <p className="mb-6">
              Le directeur de la publication est le représentant légal de SupremEnergies.
              Il peut être contacté à l'adresse : contact@supremenergies.com.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Hébergement du site</h2>
            <p className="mb-6">
              Le site SupremEnergies est hébergé par :<br/>
              <strong>Lovable</strong> — https://lovable.dev
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Activité</h2>
            <p className="mb-4">
              SupremEnergies est une entreprise spécialisée dans la rénovation énergétique des logements
              de particuliers et bâtiments tertiaires. Elle accompagne ses clients dans la conception,
              le financement (via les aides publiques) et la réalisation des travaux suivants :
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Isolation thermique (combles, murs, planchers bas, ITE)</li>
              <li>Installation de pompes à chaleur (air/eau, air/air, géothermie)</li>
              <li>Production d'eau chaude sanitaire (chauffe-eau thermodynamique, solaire)</li>
              <li>Installation de panneaux solaires photovoltaïques et autoconsommation</li>
              <li>Rénovation énergétique globale (audit, BBC, MaPrimeRénov' Parcours accompagné)</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Qualifications et assurances</h2>
            <p className="mb-6">
              Les travaux sont réalisés par SupremEnergies et/ou par des entreprises partenaires sélectionnées
              pour leurs qualifications professionnelles adaptées à chaque type de chantier
              (qualifications délivrées par les organismes de référence du bâtiment et de l'efficacité énergétique).
              Les justificatifs des qualifications mobilisées et des assurances (responsabilité civile professionnelle
              et garantie décennale) applicables à votre chantier vous sont communiqués avant la signature du devis,
              sur simple demande.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Propriété intellectuelle</h2>
            <p className="mb-6">
              L'ensemble du site (structure, textes, images, logos, vidéos, illustrations, photographies, icônes,
              code source) est la propriété exclusive de SupremEnergies ou de ses partenaires et est protégé par
              la législation française et internationale relative au droit d'auteur et à la propriété intellectuelle.
              Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation
              écrite préalable est strictement interdite et constituerait une contrefaçon au sens des articles
              L.335-2 et suivants du Code de la propriété intellectuelle.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Données personnelles &amp; RGPD</h2>
            <p className="mb-6">
              Les données personnelles collectées via les formulaires du site (demande de devis, contact, newsletter,
              téléchargement de guides) sont traitées par SupremEnergies, responsable de traitement, dans le seul
              but de répondre à votre demande et, le cas échéant, de vous adresser des informations commerciales.
              Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi « Informatique et Libertés » modifiée,
              vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et
              de portabilité, en écrivant à contact@supremenergies.com. Pour plus de détails, consultez notre
              {" "}
              <Link to="/privacy" className="text-supreme-primary underline">politique de confidentialité</Link>.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Médiation de la consommation</h2>
            <p className="mb-6">
              Conformément à l'article L.612-1 du Code de la consommation, tout consommateur a le droit de
              recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige
              l'opposant à un professionnel. Les coordonnées du médiateur compétent peuvent être obtenues sur
              simple demande auprès de SupremEnergies à l'adresse contact@supremenergies.com.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Droit applicable</h2>
            <p className="mb-6">
              Les présentes mentions légales sont régies par le droit français. En cas de litige, et après
              tentative de résolution amiable, compétence est attribuée aux tribunaux français.
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

export default LegalNotices;
