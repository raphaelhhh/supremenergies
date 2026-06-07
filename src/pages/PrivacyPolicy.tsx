import { Link } from "react-router-dom";
import SeoMeta from "@/components/SeoMeta";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <SeoMeta
        title="Politique de Confidentialité | SupremEnergies"
        description="Politique de confidentialité et protection des données personnelles de SupremEnergies, expert en rénovation énergétique (RGPD)."
        canonical="/privacy"
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

          <h1 className="text-3xl md:text-4xl font-bold mb-8">Politique de Confidentialité</h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Préambule</h2>
            <p className="mb-6">
              SupremEnergies, entreprise spécialisée dans la rénovation énergétique (isolation, pompes à chaleur,
              panneaux solaires, rénovation globale), accorde une importance essentielle à la protection des données
              personnelles de ses prospects et clients. La présente politique décrit les conditions dans lesquelles
              nous collectons, utilisons, conservons et protégeons vos données, conformément au Règlement Général
              sur la Protection des Données (RGPD - UE 2016/679) et à la loi « Informatique et Libertés » modifiée.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Responsable de traitement</h2>
            <p className="mb-6">
              <strong>SupremEnergies</strong> — 55 rue Cartier-Bresson, 93500 Pantin<br/>
              Téléphone : 01 86 04 68 89 — Email : contact@supremenergies.com
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Données collectées</h2>
            <p className="mb-4">Dans le cadre de nos activités, nous pouvons collecter :</p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Données d'identification :</strong> nom, prénom, civilité</li>
              <li><strong>Coordonnées :</strong> email, téléphone, adresse postale</li>
              <li><strong>Informations sur le logement et le projet :</strong> type de logement, surface,
                année de construction, type de chauffage actuel, statut occupant/propriétaire, revenu fiscal
                de référence (pour évaluer l'éligibilité aux aides MaPrimeRénov', CEE, éco-PTZ, etc.)</li>
              <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages consultées,
                via cookies et outils de mesure d'audience (Google Tag Manager, Meta Pixel)</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Finalités et bases légales</h2>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Traitement de votre demande de devis ou contact</strong> — exécution de mesures
                précontractuelles (art. 6.1.b RGPD)</li>
              <li><strong>Évaluation de votre éligibilité aux aides à la rénovation énergétique</strong> —
                exécution précontractuelle / consentement</li>
              <li><strong>Envoi de la newsletter et d'offres commerciales</strong> — consentement (art. 6.1.a)</li>
              <li><strong>Suivi de la relation client et obligations comptables/fiscales</strong> — obligation
                légale et intérêt légitime</li>
              <li><strong>Mesure d'audience et amélioration du site</strong> — consentement via bandeau cookies</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Destinataires des données</h2>
            <p className="mb-6">
              Vos données sont destinées aux équipes de SupremEnergies et, le cas échéant, à nos partenaires
              techniques et installateurs sélectionnés pour la réalisation de votre projet
              (bureaux d'études, artisans qualifiés, organismes financeurs des aides). Nous ne vendons,
              n'échangeons ni ne louons vos données personnelles à des tiers à des fins commerciales.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Sous-traitants</h2>
            <p className="mb-6">
              Pour le fonctionnement du site et de notre activité, nous faisons appel à des sous-traitants
              respectant le RGPD : hébergement (Lovable / Supabase au sein de l'UE), outils d'envoi d'emails
              transactionnels, outils marketing (Zapier, Google, Meta). Des accords de traitement (DPA) encadrent
              ces relations.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Durée de conservation</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Prospects (devis non concrétisé) : <strong>3 ans</strong> à compter du dernier contact</li>
              <li>Clients : durée de la relation contractuelle + <strong>5 ans</strong> (preuve)</li>
              <li>Données comptables et factures : <strong>10 ans</strong> (obligation légale)</li>
              <li>Cookies de mesure d'audience : <strong>13 mois</strong> maximum</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Cookies</h2>
            <p className="mb-6">
              Notre site utilise des cookies nécessaires au fonctionnement, ainsi que des cookies de mesure
              d'audience et de marketing (Google Analytics via GTM, Meta Pixel). Vous pouvez accepter, refuser
              ou paramétrer leur utilisation à tout moment via le bandeau de consentement ou les paramètres
              de votre navigateur.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Vos droits</h2>
            <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Droit d'accès, de rectification et d'effacement de vos données</li>
              <li>Droit à la limitation et à l'opposition au traitement</li>
              <li>Droit à la portabilité de vos données</li>
              <li>Droit de retirer votre consentement à tout moment</li>
              <li>Droit de définir des directives post-mortem</li>
              <li>Droit d'introduire une réclamation auprès de la <strong>CNIL</strong> (www.cnil.fr)</li>
            </ul>
            <p className="mb-6">
              Pour exercer ces droits, contactez-nous à <strong>contact@supremenergies.com</strong> en
              joignant un justificatif d'identité. Nous répondrons dans un délai maximum d'un mois.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">10. Sécurité</h2>
            <p className="mb-6">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées (chiffrement,
              authentification, accès restreints, sauvegardes) pour préserver la sécurité et la confidentialité
              de vos données face aux risques de perte, altération ou accès non autorisé.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">11. Modifications</h2>
            <p className="mb-6">
              La présente politique peut être mise à jour pour tenir compte d'évolutions légales ou de nos
              services. Toute modification substantielle vous sera notifiée via le site.
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
