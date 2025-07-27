import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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

          <h1 className="text-3xl md:text-4xl font-bold mb-8">Politique de Confidentialité</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Introduction</h2>
            <p className="mb-6">
              SupremEnergies s'engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité 
              explique comment nous collectons, utilisons et protégeons vos informations personnelles.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Données collectées</h2>
            <p className="mb-4">Nous pouvons collecter les informations suivantes :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse postale</li>
              <li>Informations sur votre projet de rénovation</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Utilisation des données</h2>
            <p className="mb-4">Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Traiter vos demandes de devis</li>
              <li>Vous contacter concernant nos services</li>
              <li>Vous envoyer notre newsletter (avec votre consentement)</li>
              <li>Améliorer nos services</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Partage des données</h2>
            <p className="mb-6">
              Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. 
              Vos données peuvent être partagées uniquement avec nos partenaires techniques nécessaires 
              à la réalisation de votre projet.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Cookies</h2>
            <p className="mb-6">
              Notre site utilise des cookies pour améliorer votre expérience de navigation. 
              Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Vos droits</h2>
            <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit d'effacement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d'opposition</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Sécurité</h2>
            <p className="mb-6">
              Nous mettons en place des mesures de sécurité appropriées pour protéger vos données 
              contre l'accès non autorisé, l'altération, la divulgation ou la destruction.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Conservation des données</h2>
            <p className="mb-6">
              Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles 
              elles ont été collectées, dans le respect des obligations légales.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Contact</h2>
            <p className="mb-6">
              Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, 
              contactez-nous à : contact@supremenergies.fr
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

export default PrivacyPolicy;