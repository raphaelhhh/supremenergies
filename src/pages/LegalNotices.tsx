import { Link } from "react-router-dom";

const LegalNotices = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
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
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Éditeur du site</h2>
            <p className="mb-6">
              <strong>Raison sociale :</strong> [NOM DE VOTRE SOCIÉTÉ]<br/>
              <strong>Forme juridique :</strong> [SARL, SAS, etc.]<br/>
              <strong>Capital social :</strong> [MONTANT]<br/>
              <strong>Siège social :</strong> [ADRESSE COMPLÈTE]<br/>
              <strong>RCS :</strong> [VILLE ET NUMÉRO]<br/>
              <strong>SIRET :</strong> [NUMÉRO SIRET]<br/>
              <strong>TVA intracommunautaire :</strong> [NUMÉRO TVA]<br/>
              <strong>Téléphone :</strong> [NUMÉRO]<br/>
              <strong>Email :</strong> contact@supremenergies.fr
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Directeur de publication</h2>
            <p className="mb-6">
              <strong>Nom :</strong> [NOM DU DIRIGEANT]<br/>
              <strong>Qualité :</strong> [Gérant, Président, etc.]
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Hébergement</h2>
            <p className="mb-6">
              Le site SupremEnergies est hébergé par :<br/>
              <strong>Lovable</strong><br/>
              Site web : https://lovable.dev
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Activité</h2>
            <p className="mb-6">
              SupremEnergies est spécialisée dans la rénovation énergétique :<br/>
              - Isolation thermique<br/>
              - Installation de pompes à chaleur<br/>
              - Systèmes d'eau chaude sanitaire<br/>
              - Panneaux solaires photovoltaïques<br/>
              - Rénovation globale
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Certifications</h2>
            <p className="mb-6">
              <strong>RGE (Reconnu Garant de l'Environnement) :</strong> [NUMÉRO DE CERTIFICATION]<br/>
              <strong>Assurance décennale :</strong> [NOM DE L'ASSUREUR - NUMÉRO DE POLICE]<br/>
              <strong>Garantie de parfait achèvement :</strong> [DÉTAILS]
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Propriété intellectuelle</h2>
            <p className="mb-6">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
              et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour 
              les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Données personnelles</h2>
            <p className="mb-6">
              Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement 
              Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification 
              et de suppression des données vous concernant.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Médiation</h2>
            <p className="mb-6">
              En cas de litige, le consommateur peut recourir à la médiation de la consommation.<br/>
              <strong>Médiateur :</strong> [NOM DU MÉDIATEUR]<br/>
              <strong>Site web :</strong> [SITE DU MÉDIATEUR]
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