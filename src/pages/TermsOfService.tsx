import { Link } from "react-router-dom";

const TermsOfService = () => {
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

          <h1 className="text-3xl md:text-4xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Objet</h2>
            <p className="mb-6">
              Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique 
              des modalités de mise à disposition du site SupremEnergies et des services par l'entreprise et de définir 
              les conditions d'accès et d'utilisation des services par « l'Utilisateur ».
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Mentions légales</h2>
            <p className="mb-6">
              L'édition du site SupremEnergies est assurée par la société [NOM DE VOTRE SOCIÉTÉ].<br/>
              Siège social : [ADRESSE COMPLÈTE]<br/>
              SIRET : [NUMÉRO SIRET]<br/>
              Téléphone : [NUMÉRO DE TÉLÉPHONE]<br/>
              Email : contact@supremenergies.fr
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Accès au site</h2>
            <p className="mb-6">
              Le site SupremEnergies permet à l'Utilisateur un accès gratuit aux services suivants :
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Informations sur nos services de rénovation énergétique</li>
              <li>Demande de devis en ligne</li>
              <li>Prise de contact avec nos équipes</li>
              <li>Newsletter et conseils énergétiques</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Collecte des données</h2>
            <p className="mb-6">
              Le site est exempté de déclaration à la Commission Nationale Informatique et Libertés (CNIL) 
              dans la mesure où il ne collecte aucune donnée concernant les utilisateurs.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Propriété intellectuelle</h2>
            <p className="mb-6">
              Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son...) 
              font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement 
              par le droit d'auteur.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Responsabilité</h2>
            <p className="mb-6">
              Les sources des informations diffusées sur le site SupremEnergies sont réputées fiables 
              mais le site ne garantit pas qu'il soit exempt de défauts, d'erreurs ou d'omissions.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Liens hypertextes</h2>
            <p className="mb-6">
              Des liens hypertextes peuvent être présents sur le site. L'Utilisateur est informé qu'en 
              cliquant sur ces liens, il sortira du site SupremEnergies.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Évolution des conditions générales d'utilisation</h2>
            <p className="mb-6">
              Le site SupremEnergies se réserve le droit de modifier unilatéralement et à tout moment 
              le contenu des présentes conditions générales d'utilisation.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Droit applicable</h2>
            <p className="mb-6">
              Les présentes conditions générales d'utilisation sont régies par le droit français.
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