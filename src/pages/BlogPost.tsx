
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import BlogCard from "@/components/BlogCard";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Blog posts data
  const blogPosts = [
    {
      id: "1",
      title: "Comment choisir la meilleure isolation pour votre maison",
      excerpt: "Découvrez les différents types d'isolation et leurs avantages pour faire le choix le plus adapté à votre habitation et votre budget.",
      date: "15 Novembre 2025",
      author: "Pierre Durand",
      imageSrc: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content: `
        <p>L'isolation est l'un des aspects les plus importants de l'efficacité énergétique d'une maison. Une bonne isolation peut réduire considérablement vos factures d'énergie, améliorer votre confort et diminuer votre empreinte carbone. Mais avec tant d'options disponibles, comment savoir quelle solution d'isolation est la meilleure pour votre situation ?</p>
        
        <h2>Les différents types d'isolation</h2>
        
        <h3>Isolation des combles</h3>
        <p>Les combles sont souvent responsables de 25 à 30% des pertes de chaleur dans une maison. Deux techniques principales sont utilisées :</p>
        <ul>
          <li><strong>Isolation par soufflage</strong> : rapide et efficace pour les combles perdus</li>
          <li><strong>Isolation par panneaux ou rouleaux</strong> : adaptée aux combles aménagés ou à aménager</li>
        </ul>
        
        <h3>Isolation des murs</h3>
        <p>Pour les murs, vous avez le choix entre :</p>
        <ul>
          <li><strong>Isolation par l'intérieur (ITI)</strong> : moins coûteuse mais réduit la surface habitable</li>
          <li><strong>Isolation par l'extérieur (ITE)</strong> : plus performante et ne réduit pas l'espace intérieur, mais plus onéreuse</li>
        </ul>
        
        <h3>Isolation des fenêtres</h3>
        <p>Les fenêtres peuvent être responsables de 10 à 15% des pertes thermiques. Les options incluent :</p>
        <ul>
          <li><strong>Double vitrage</strong> : standard aujourd'hui, bon rapport qualité-prix</li>
          <li><strong>Triple vitrage</strong> : performance supérieure, idéal pour les régions très froides</li>
        </ul>
        
        <h3>Isolation des planchers bas</h3>
        <p>Souvent négligée, l'isolation des planchers peut représenter jusqu'à 10% d'économies d'énergie. Les techniques varient selon la configuration :</p>
        <ul>
          <li><strong>Isolation sous chape</strong> : pour les constructions neuves ou rénovations lourdes</li>
          <li><strong>Isolation en sous-face</strong> : pour les planchers sur vide sanitaire ou cave</li>
        </ul>
        
        <h2>Les matériaux isolants</h2>
        
        <p>Le choix du matériau isolant dépend de plusieurs facteurs : performance thermique, impact environnemental, coût, facilité d'installation...</p>
        
        <h3>Isolants synthétiques</h3>
        <ul>
          <li><strong>Polystyrène expansé (PSE)</strong> : bon marché, facile à poser, mais impact environnemental élevé</li>
          <li><strong>Polyuréthane (PUR)</strong> : très performant, résistant à l'humidité, mais plus cher</li>
        </ul>
        
        <h3>Isolants minéraux</h3>
        <ul>
          <li><strong>Laine de verre</strong> : bon rapport qualité-prix, bonne résistance au feu</li>
          <li><strong>Laine de roche</strong> : excellente résistance au feu, bonne isolation phonique</li>
        </ul>
        
        <h3>Isolants biosourcés</h3>
        <ul>
          <li><strong>Laine de bois</strong> : bon déphasage thermique, régulation naturelle de l'humidité</li>
          <li><strong>Ouate de cellulose</strong> : bonne performance été comme hiver, faible impact environnemental</li>
          <li><strong>Chanvre</strong> : excellent régulateur d'humidité, bonne isolation phonique</li>
        </ul>
        
        <h2>Comment choisir ?</h2>
        
        <p>Pour faire le bon choix, posez-vous ces questions :</p>
        
        <ol>
          <li><strong>Quelles sont vos priorités</strong> : performance thermique, impact environnemental, budget ?</li>
          <li><strong>Quelle est la configuration de votre logement</strong> : maison ancienne, appartement, maison neuve ?</li>
          <li><strong>Quel est votre climat local</strong> : humide, sec, grandes variations de température ?</li>
        </ol>
        
        <p>La meilleure solution est souvent une combinaison de différentes techniques et matériaux, adaptée à votre situation spécifique. N'hésitez pas à faire appel à un professionnel pour réaliser un audit énergétique de votre logement avant de prendre une décision.</p>
        
        <p>Chez SupremEnergies, nous proposons un accompagnement personnalisé pour vous aider à choisir la solution d'isolation la plus adaptée à vos besoins et à votre budget. Contactez-nous pour un devis gratuit et des conseils d'experts.</p>
      `
    },
    {
      id: "2",
      title: "Les pompes à chaleur : guide complet pour comprendre leur fonctionnement",
      excerpt: "Tout ce que vous devez savoir sur les pompes à chaleur : principes de fonctionnement, différents types, avantages et points d'attention.",
      date: "28 Octobre 2025",
      author: "Marie Laurent",
      imageSrc: "https://images.unsplash.com/photo-1643756055617-608c1492f932?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content: `
        <p>Les pompes à chaleur représentent une solution de chauffage de plus en plus populaire, permettant de réduire considérablement les factures d'énergie tout en diminuant l'impact environnemental. Mais comment fonctionnent-elles exactement ?</p>
        
        <h2>Principe de fonctionnement d'une pompe à chaleur</h2>
        
        <p>Une pompe à chaleur fonctionne sur un principe simple : elle capte l'énergie présente dans l'environnement (air, eau ou sol) et la transfère à votre système de chauffage. Contrairement aux systèmes de chauffage traditionnels qui produisent de la chaleur, une pompe à chaleur la déplace.</p>
        
        <p>Le processus se déroule en quatre étapes :</p>
        
        <ol>
          <li><strong>Évaporation</strong> : Un fluide frigorigène capte la chaleur de la source extérieure et s'évapore.</li>
          <li><strong>Compression</strong> : Le compresseur comprime le gaz, ce qui augmente sa température.</li>
          <li><strong>Condensation</strong> : Le gaz chaud transfère sa chaleur au système de chauffage et se condense.</li>
          <li><strong>Détente</strong> : Le fluide refroidi passe par un détendeur et le cycle recommence.</li>
        </ol>
        
        <h2>Les différents types de pompes à chaleur</h2>
        
        <h3>Pompes à chaleur air/air</h3>
        <p>Ces pompes captent l'énergie présente dans l'air extérieur et la restituent sous forme d'air chaud à l'intérieur. Elles sont simples à installer et peuvent aussi climatiser en été.</p>
        
        <h3>Pompes à chaleur air/eau</h3>
        <p>Elles captent la chaleur de l'air extérieur pour la transférer à un circuit d'eau qui alimente radiateurs, planchers chauffants ou production d'eau chaude sanitaire.</p>
        
        <h3>Pompes à chaleur géothermiques</h3>
        <p>Ces systèmes extraient la chaleur du sol via des capteurs enterrés. Très performants toute l'année grâce à la température stable du sol.</p>
        
        <h2>Performances et économies</h2>
        
        <p>La performance d'une pompe à chaleur est mesurée par son COP (Coefficient de Performance). Un COP de 4 signifie que pour 1 kWh d'électricité consommé, la PAC produit 4 kWh de chaleur.</p>
        
        <p>En moyenne, une pompe à chaleur permet de réaliser 50 à 75% d'économies par rapport à un chauffage électrique classique.</p>
        
        <p>Chez SupremEnergies, nos experts vous accompagnent dans le choix de la pompe à chaleur la plus adaptée à vos besoins. Contactez-nous pour une étude personnalisée de votre projet.</p>
      `
    },
    {
      id: "3",
      title: "Les aides financières pour la rénovation énergétique en 2026",
      excerpt: "Le point sur toutes les aides disponibles cette année pour financer vos travaux de rénovation énergétique et maximiser vos économies.",
      date: "10 Octobre 2025",
      author: "Sophie Bernard",
      imageSrc: "https://images.unsplash.com/photo-1621551711576-89c8861760b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
      content: `
        <p>La rénovation énergétique représente un investissement important, mais de nombreuses aides financières sont disponibles pour alléger le coût de vos travaux en 2026.</p>
        
        <h2>MaPrimeRénov' 2026</h2>
        
        <p>MaPrimeRénov' reste l'aide principale pour la rénovation énergétique. En 2026, le dispositif est renforcé avec des montants revalorisés pour les ménages modestes et des bonus pour les rénovations globales.</p>
        
        <h3>Montants selon les revenus</h3>
        <ul>
          <li><strong>Ménages très modestes</strong> : jusqu'à 90% du coût des travaux</li>
          <li><strong>Ménages modestes</strong> : jusqu'à 75% du coût des travaux</li>
          <li><strong>Ménages intermédiaires</strong> : jusqu'à 60% du coût des travaux</li>
          <li><strong>Ménages aisés</strong> : jusqu'à 40% pour certains travaux</li>
        </ul>
        
        <h2>Certificats d'Économies d'Énergie (CEE)</h2>
        
        <p>Les CEE sont des primes versées par les fournisseurs d'énergie. Elles sont cumulables avec MaPrimeRénov' et peuvent représenter plusieurs centaines d'euros selon les travaux.</p>
        
        <h2>Éco-Prêt à Taux Zéro (Éco-PTZ)</h2>
        
        <p>L'éco-PTZ permet d'emprunter jusqu'à 50 000 € sans intérêts pour financer des travaux de rénovation énergétique. La durée de remboursement peut aller jusqu'à 20 ans.</p>
        
        <h2>TVA à taux réduit</h2>
        
        <p>Les travaux de rénovation énergétique bénéficient d'une TVA à 5,5% au lieu de 20%, directement appliquée sur votre facture.</p>
        
        <h2>Aides locales</h2>
        
        <p>De nombreuses régions, départements et communes proposent des aides complémentaires. Renseignez-vous auprès de votre collectivité locale ou de l'ADIL.</p>
        
        <p>Chez SupremEnergies, nous vous accompagnons dans toutes vos démarches pour obtenir les aides auxquelles vous avez droit. Contactez-nous pour une estimation personnalisée.</p>
      `
    },
    {
      id: "4",
      title: "Panneaux solaires : autoconsommation ou revente totale ?",
      excerpt: "Analyse comparative des deux modèles économiques pour votre installation photovoltaïque et conseils pour faire le meilleur choix.",
      date: "2 Septembre 2025",
      author: "Thomas Martin",
      imageSrc: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
      content: `
        <p>L'installation de panneaux solaires photovoltaïques est un excellent investissement pour réduire vos factures d'électricité et votre empreinte carbone. Mais faut-il opter pour l'autoconsommation ou la revente totale ?</p>
        
        <h2>L'autoconsommation : consommer sa propre électricité</h2>
        
        <p>L'autoconsommation consiste à utiliser directement l'électricité produite par vos panneaux. Le surplus peut être vendu au réseau ou stocké dans des batteries.</p>
        
        <h3>Avantages de l'autoconsommation</h3>
        <ul>
          <li>Réduction immédiate de votre facture d'électricité</li>
          <li>Indépendance énergétique partielle</li>
          <li>Protection contre la hausse des prix de l'électricité</li>
          <li>Prime à l'autoconsommation versée par l'État</li>
        </ul>
        
        <h2>La revente totale : vendre toute sa production</h2>
        
        <p>Avec la revente totale, vous vendez toute l'électricité produite à EDF OA à un tarif garanti pendant 20 ans.</p>
        
        <h3>Avantages de la revente totale</h3>
        <ul>
          <li>Revenus garantis et prévisibles sur 20 ans</li>
          <li>Pas besoin d'adapter sa consommation</li>
          <li>Rentabilité calculable précisément</li>
        </ul>
        
        <h2>Quel choix faire ?</h2>
        
        <p>Le choix dépend principalement de votre profil de consommation :</p>
        <ul>
          <li>Si vous consommez beaucoup la journée (télétravail, famille) : <strong>autoconsommation</strong></li>
          <li>Si vous êtes absent la journée : <strong>autoconsommation avec batteries</strong> ou <strong>revente totale</strong></li>
          <li>Si vous voulez un investissement sûr sans contrainte : <strong>revente totale</strong></li>
        </ul>
        
        <p>Chez SupremEnergies, nous analysons votre consommation pour vous recommander la solution la plus adaptée. Contactez-nous pour une étude gratuite.</p>
      `
    },
    {
      id: "5",
      title: "Rénovation globale : pourquoi opter pour une approche complète ?",
      excerpt: "Les avantages d'une rénovation énergétique globale par rapport à des travaux séparés, tant en termes de performance que de rentabilité.",
      date: "20 Août 2025",
      author: "Pierre Durand",
      imageSrc: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content: `
        <p>Plutôt que de réaliser des travaux de rénovation énergétique un par un, la rénovation globale propose une approche intégrée et coordonnée. Quels sont les avantages de cette méthode ?</p>
        
        <h2>Une meilleure performance énergétique</h2>
        
        <p>En traitant tous les postes de déperdition d'énergie en même temps (isolation, chauffage, ventilation, fenêtres), vous obtenez un résultat optimal. Les différents travaux se complètent et s'optimisent mutuellement.</p>
        
        <h2>Des économies plus importantes</h2>
        
        <p>Une rénovation globale peut faire passer votre logement d'une étiquette F ou G à une étiquette A ou B. Les économies d'énergie peuvent atteindre 60 à 80% par rapport à la situation initiale.</p>
        
        <h2>Des aides financières bonifiées</h2>
        
        <p>Le gouvernement encourage les rénovations globales avec des aides majorées :</p>
        <ul>
          <li>Bonus de 10% sur MaPrimeRénov' pour les rénovations globales</li>
          <li>Éco-PTZ jusqu'à 50 000 € pour les bouquets de travaux</li>
          <li>CEE bonifiés pour les rénovations ambitieuses</li>
        </ul>
        
        <h2>Un chantier unique</h2>
        
        <p>Au lieu de subir plusieurs chantiers étalés sur des années, vous n'avez qu'un seul chantier coordonné. Moins de dérangement, moins de poussière, et des travaux optimisés.</p>
        
        <h2>Une valorisation de votre bien</h2>
        
        <p>Un logement rénové globalement gagne significativement en valeur sur le marché immobilier, surtout avec les nouvelles réglementations sur la performance énergétique.</p>
        
        <p>Chez SupremEnergies, nous proposons un accompagnement complet pour votre projet de rénovation globale. Contactez-nous pour une étude personnalisée.</p>
      `
    },
    {
      id: "6",
      title: "Comment réduire la consommation énergétique de votre entreprise",
      excerpt: "Stratégies et solutions pratiques pour les entreprises souhaitant diminuer leur facture énergétique et leur impact environnemental.",
      date: "5 Juillet 2025",
      author: "Marie Laurent",
      imageSrc: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content: `
        <p>La maîtrise de l'énergie est devenue un enjeu stratégique pour les entreprises. Au-delà des économies financières, elle répond aux attentes des clients et partenaires en matière de responsabilité environnementale.</p>
        
        <h2>Réaliser un audit énergétique</h2>
        
        <p>La première étape est de comprendre où part votre énergie. Un audit énergétique permet d'identifier les postes de consommation et les gisements d'économies.</p>
        
        <h2>Optimiser l'éclairage</h2>
        
        <p>L'éclairage peut représenter jusqu'à 40% de la consommation électrique d'un bâtiment tertiaire. Solutions :</p>
        <ul>
          <li>Passage aux LED (économie de 50 à 80%)</li>
          <li>Détecteurs de présence dans les zones de passage</li>
          <li>Gradation automatique selon la luminosité naturelle</li>
        </ul>
        
        <h2>Améliorer l'isolation du bâtiment</h2>
        
        <p>L'isolation des murs, toitures et fenêtres permet de réduire considérablement les besoins en chauffage et climatisation.</p>
        
        <h2>Installer des équipements performants</h2>
        
        <ul>
          <li>Pompes à chaleur pour le chauffage et la climatisation</li>
          <li>Panneaux solaires pour l'autoconsommation</li>
          <li>Systèmes de récupération de chaleur</li>
        </ul>
        
        <h2>Sensibiliser les collaborateurs</h2>
        
        <p>Les comportements quotidiens ont un impact significatif : extinction des équipements, gestion raisonnée du chauffage et de la climatisation, etc.</p>
        
        <p>Chez SupremEnergies, nous accompagnons les entreprises dans leur transition énergétique. Contactez notre équipe B2B pour une étude personnalisée.</p>
      `
    },
    {
      id: "7",
      title: "MaPrimeRénov' 2026 : ce qui change cette année",
      excerpt: "Découvrez les nouvelles modalités de MaPrimeRénov' en 2026, les montants des aides et les conditions d'éligibilité mises à jour.",
      date: "2 Janvier 2026",
      author: "Sophie Bernard",
      imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
      content: `
        <p>L'année 2026 apporte son lot de nouveautés pour MaPrimeRénov', le dispositif phare d'aide à la rénovation énergétique. Voici tout ce qu'il faut savoir pour en bénéficier.</p>
        
        <h2>Les principales évolutions 2026</h2>
        
        <h3>Renforcement du parcours "rénovation d'ampleur"</h3>
        <p>Le gouvernement mise sur les rénovations globales permettant un gain de 2 classes énergétiques minimum. Les aides sont bonifiées pour ce type de projets.</p>
        
        <h3>Simplification des démarches</h3>
        <p>La plateforme France Rénov' a été modernisée pour faciliter les demandes. Le suivi des dossiers est désormais plus transparent.</p>
        
        <h3>Nouveaux plafonds de ressources</h3>
        <p>Les seuils de revenus ont été réévalués pour tenir compte de l'inflation. Davantage de ménages peuvent désormais bénéficier des aides maximales.</p>
        
        <h2>Les montants pour 2026</h2>
        
        <p>Quelques exemples de primes pour les ménages modestes :</p>
        <ul>
          <li>Pompe à chaleur air/eau : jusqu'à 5 000 €</li>
          <li>Isolation des combles : jusqu'à 25 €/m²</li>
          <li>Isolation des murs par l'extérieur : jusqu'à 75 €/m²</li>
          <li>Chauffe-eau thermodynamique : jusqu'à 1 200 €</li>
        </ul>
        
        <h2>Comment en bénéficier ?</h2>
        
        <ol>
          <li>Créez votre compte sur France Rénov'</li>
          <li>Faites réaliser des devis par des professionnels</li>
          <li>Déposez votre demande avant le début des travaux</li>
          <li>Attendez l'accord avant de signer les devis</li>
          <li>Réalisez les travaux et transmettez les factures</li>
        </ol>
        
        <p>Chez SupremEnergies, nous vous accompagnons dans toutes ces démarches. Contactez-nous pour une estimation de vos aides.</p>
      `
    },
    {
      id: "8",
      title: "Chaleur record en 2025 : comment préparer votre maison pour l'été 2026",
      excerpt: "Après un été 2025 caniculaire, découvrez les solutions pour garder votre logement frais sans climatisation énergivore.",
      date: "18 Décembre 2025",
      author: "Thomas Martin",
      imageSrc: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      content: `
        <p>L'été 2025 a battu des records de chaleur en France. Ces épisodes caniculaires de plus en plus fréquents nous obligent à repenser notre façon de rafraîchir nos logements. Voici les solutions pour l'été 2026.</p>
        
        <h2>L'isolation : efficace été comme hiver</h2>
        
        <p>Une bonne isolation ne sert pas qu'en hiver ! En été, elle empêche la chaleur extérieure de pénétrer dans votre logement. L'isolation des combles est particulièrement importante car c'est par le toit que la chaleur entre le plus.</p>
        
        <h2>Les protections solaires</h2>
        
        <p>Bloquer le rayonnement solaire avant qu'il n'atteigne les fenêtres est la solution la plus efficace :</p>
        <ul>
          <li><strong>Volets extérieurs</strong> : les plus efficaces, surtout orientés sud et ouest</li>
          <li><strong>Stores extérieurs</strong> : bonne solution pour les grandes baies vitrées</li>
          <li><strong>Brise-soleil orientables</strong> : permettent de moduler la lumière</li>
          <li><strong>Pergolas bioclimatiques</strong> : protègent les terrasses et baies vitrées</li>
        </ul>
        
        <h2>La ventilation nocturne</h2>
        
        <p>Créer des courants d'air la nuit permet de rafraîchir naturellement le logement. Une VMC double flux peut inverser son fonctionnement pour optimiser ce rafraîchissement.</p>
        
        <h2>La pompe à chaleur réversible</h2>
        
        <p>Si vous devez climatiser, la pompe à chaleur air/air est la solution la plus économique. Elle consomme 3 à 4 fois moins qu'un climatiseur classique.</p>
        
        <h2>Les solutions naturelles</h2>
        
        <ul>
          <li>Végétaliser les abords de la maison</li>
          <li>Installer une pergola végétale</li>
          <li>Peindre le toit en blanc (réflexion de la chaleur)</li>
        </ul>
        
        <p>Chez SupremEnergies, nous vous conseillons sur les solutions les plus adaptées à votre logement. Contactez-nous pour préparer l'été 2026.</p>
      `
    },
    {
      id: "9",
      title: "L'adoucisseur d'eau : un investissement rentable pour votre foyer",
      excerpt: "Protégez vos équipements, réduisez vos dépenses et améliorez votre quotidien grâce à l'installation d'un adoucisseur d'eau.",
      date: "5 Décembre 2025",
      author: "Pierre Durand",
      imageSrc: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content: `
        <p>En France, de nombreuses régions ont une eau dure, c'est-à-dire chargée en calcaire. Cette eau entartre vos équipements et peut impacter votre confort au quotidien. L'adoucisseur d'eau est une solution efficace pour y remédier.</p>
        
        <h2>Les problèmes causés par le calcaire</h2>
        
        <ul>
          <li><strong>Entartrage des équipements</strong> : chauffe-eau, lave-linge, lave-vaisselle s'usent plus vite</li>
          <li><strong>Surconsommation d'énergie</strong> : un mm de tartre = 10% d'énergie en plus pour chauffer l'eau</li>
          <li><strong>Canalisations bouchées</strong> : le calcaire s'accumule et réduit le débit</li>
          <li><strong>Inconfort</strong> : peau sèche, linge rêche, traces blanches</li>
        </ul>
        
        <h2>Comment fonctionne un adoucisseur ?</h2>
        
        <p>L'adoucisseur utilise une résine qui échange les ions calcium et magnésium (responsables du calcaire) contre des ions sodium. L'eau devient ainsi "douce" et ne forme plus de dépôts calcaires.</p>
        
        <h2>Les avantages de l'eau adoucie</h2>
        
        <ul>
          <li><strong>Protection des équipements</strong> : durée de vie prolongée</li>
          <li><strong>Économies d'énergie</strong> : jusqu'à 20% sur le chauffage de l'eau</li>
          <li><strong>Moins de produits d'entretien</strong> : -50% de savon et détergent</li>
          <li><strong>Plus de confort</strong> : peau douce, linge souple</li>
          <li><strong>Moins d'entretien</strong> : fini les traces de calcaire</li>
        </ul>
        
        <h2>L'installation d'un adoucisseur</h2>
        
        <p>L'adoucisseur s'installe généralement à l'arrivée d'eau de la maison, après le compteur. L'installation prend quelques heures et nécessite un raccordement électrique et une évacuation d'eau.</p>
        
        <h2>L'entretien</h2>
        
        <p>L'entretien est simple : il suffit d'ajouter du sel régénérant (environ tous les 2-3 mois selon la consommation) et de faire vérifier l'appareil une fois par an.</p>
        
        <p>Chez SupremEnergies, nous proposons l'installation et la maintenance d'adoucisseurs d'eau de qualité. Contactez-nous pour un devis gratuit.</p>
      `
    },
    {
      id: "10",
      title: "Chauffe-eau thermodynamique vs chauffe-eau solaire : le comparatif",
      excerpt: "Quelle solution choisir pour produire votre eau chaude sanitaire de manière économique et écologique ? Notre analyse détaillée.",
      date: "22 Novembre 2025",
      author: "Marie Laurent",
      imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content: `
        <p>Le chauffe-eau thermodynamique et le chauffe-eau solaire sont deux solutions performantes pour produire de l'eau chaude sanitaire de manière économique et écologique. Comment choisir ?</p>
        
        <h2>Le chauffe-eau thermodynamique</h2>
        
        <p>Il fonctionne comme une petite pompe à chaleur : il capte les calories de l'air ambiant pour chauffer l'eau.</p>
        
        <h3>Avantages</h3>
        <ul>
          <li>Installation simple et peu coûteuse (2 000 à 3 500 €)</li>
          <li>Fonctionne toute l'année, quel que soit l'ensoleillement</li>
          <li>Consomme 3 fois moins d'électricité qu'un cumulus classique</li>
          <li>Éligible aux aides MaPrimeRénov'</li>
        </ul>
        
        <h3>Inconvénients</h3>
        <ul>
          <li>Nécessite un local non chauffé d'au moins 10 m³</li>
          <li>Peut générer du bruit (à installer loin des chambres)</li>
          <li>Performance réduite si l'air ambiant est froid</li>
        </ul>
        
        <h2>Le chauffe-eau solaire</h2>
        
        <p>Des panneaux solaires thermiques captent la chaleur du soleil pour chauffer l'eau stockée dans un ballon.</p>
        
        <h3>Avantages</h3>
        <ul>
          <li>Énergie 100% gratuite et renouvelable</li>
          <li>Couvre 50 à 80% des besoins annuels</li>
          <li>Très longue durée de vie (20+ ans)</li>
          <li>Pas de consommation électrique pour le chauffage</li>
        </ul>
        
        <h3>Inconvénients</h3>
        <ul>
          <li>Coût d'installation plus élevé (4 000 à 7 000 €)</li>
          <li>Nécessite un appoint pour les jours sans soleil</li>
          <li>Installation plus complexe (panneaux sur le toit)</li>
        </ul>
        
        <h2>Notre recommandation</h2>
        
        <p>Le chauffe-eau thermodynamique est souvent le meilleur choix pour sa simplicité et son rapport qualité-prix. Le solaire est idéal si vous êtes dans une région très ensoleillée ou si vous souhaitez maximiser l'autoconsommation avec des panneaux photovoltaïques.</p>
        
        <p>Chez SupremEnergies, nous analysons votre situation pour vous recommander la solution la plus adaptée. Contactez-nous pour un devis gratuit.</p>
      `
    },
    {
      id: "11",
      title: "Les nouvelles normes RE2020 et leur impact sur la rénovation",
      excerpt: "Comprendre les exigences de la réglementation environnementale et comment elles influencent vos projets de rénovation énergétique.",
      date: "8 Novembre 2025",
      author: "Sophie Bernard",
      imageSrc: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content: `
        <p>La Réglementation Environnementale 2020 (RE2020) est entrée en vigueur pour les constructions neuves et influence également les pratiques de rénovation. Décryptage.</p>
        
        <h2>Les objectifs de la RE2020</h2>
        
        <p>Cette réglementation vise trois objectifs principaux :</p>
        <ul>
          <li><strong>Sobriété énergétique</strong> : réduire les besoins en énergie des bâtiments</li>
          <li><strong>Décarbonation</strong> : privilégier les énergies décarbonées et les matériaux bas carbone</li>
          <li><strong>Confort d'été</strong> : garantir le confort en période de canicule sans recours à la climatisation</li>
        </ul>
        
        <h2>L'impact sur la rénovation</h2>
        
        <p>Si la RE2020 ne s'applique pas directement à la rénovation, elle oriente les politiques d'aides et les pratiques :</p>
        
        <h3>Fin des chaudières à gaz</h3>
        <p>Les aides pour les chaudières gaz sont progressivement supprimées. Les pompes à chaleur et le chauffage biomasse sont privilégiés.</p>
        
        <h3>Isolation renforcée</h3>
        <p>Les niveaux de performance thermique exigés pour bénéficier des aides augmentent.</p>
        
        <h3>Prise en compte du carbone</h3>
        <p>Les matériaux biosourcés (bois, chanvre, ouate de cellulose) sont encouragés pour leur faible impact carbone.</p>
        
        <h2>Les interdictions de location</h2>
        
        <p>Le calendrier des interdictions de location se poursuit :</p>
        <ul>
          <li>2025 : interdiction de louer les logements classés G</li>
          <li>2028 : interdiction de louer les logements classés F</li>
          <li>2034 : interdiction de louer les logements classés E</li>
        </ul>
        
        <p>Chez SupremEnergies, nous vous accompagnons pour anticiper ces évolutions et rénover votre logement de manière pérenne. Contactez-nous pour un diagnostic.</p>
      `
    },
    {
      id: "12",
      title: "5 conseils pratiques pour réduire votre facture de chauffage cet hiver",
      excerpt: "Des gestes simples et des astuces efficaces pour diminuer votre consommation énergétique pendant la saison froide.",
      date: "1 Novembre 2025",
      author: "Thomas Martin",
      imageSrc: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
      content: `
        <p>Le chauffage représente environ 60% de la consommation d'énergie d'un logement. Voici 5 conseils pratiques pour réduire votre facture sans sacrifier votre confort.</p>
        
        <h2>1. Réglez correctement votre chauffage</h2>
        
        <p>La température idéale est de 19°C dans les pièces à vivre et 17°C dans les chambres. Chaque degré supplémentaire augmente la consommation de 7%.</p>
        <ul>
          <li>Installez un thermostat programmable</li>
          <li>Réduisez la température la nuit et pendant vos absences</li>
          <li>Ne chauffez pas les pièces inoccupées</li>
        </ul>
        
        <h2>2. Entretenez votre système de chauffage</h2>
        
        <p>Un système bien entretenu consomme moins :</p>
        <ul>
          <li>Purgez vos radiateurs chaque automne</li>
          <li>Faites réviser votre chaudière ou PAC annuellement</li>
          <li>Nettoyez les filtres des pompes à chaleur air/air</li>
        </ul>
        
        <h2>3. Améliorez l'isolation à moindre coût</h2>
        
        <ul>
          <li>Installez des joints sur vos fenêtres et portes</li>
          <li>Utilisez des boudins de porte</li>
          <li>Installez des rideaux épais devant les fenêtres</li>
          <li>Isolez les coffres de volets roulants</li>
        </ul>
        
        <h2>4. Optimisez la diffusion de chaleur</h2>
        
        <ul>
          <li>Ne placez pas de meubles devant les radiateurs</li>
          <li>Installez des panneaux réflecteurs derrière les radiateurs</li>
          <li>Fermez les volets et rideaux dès la tombée de la nuit</li>
          <li>Aérez brièvement (5 min) plutôt que longuement</li>
        </ul>
        
        <h2>5. Adoptez les bons réflexes</h2>
        
        <ul>
          <li>Portez un pull plutôt que de surchauffer</li>
          <li>Fermez les portes des pièces peu chauffées</li>
          <li>Profitez des apports solaires en journée (ouvrez les volets)</li>
          <li>Utilisez un plaid sur le canapé</li>
        </ul>
        
        <p>Pour aller plus loin, SupremEnergies vous accompagne dans vos projets de rénovation énergétique. Contactez-nous pour un diagnostic gratuit de votre logement.</p>
      `
    }
  ];

  const post = blogPosts.find(post => post.id === id);
  const relatedPosts = blogPosts.filter(p => p.id !== id).slice(0, 3);

  useEffect(() => {
    if (!post) {
      navigate("/blog");
    }
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [post, navigate, id]);

  if (!post) return null;

  return (
    <div>
      <div className="pt-24 md:pt-32 bg-supreme-light">
        <div className="container-custom">
          <Button 
            asChild 
            variant="ghost"
            className="mb-6 hover:bg-white/50"
          >
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Retour aux articles
            </Link>
          </Button>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-supreme-primary">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Image */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
        <img 
          src={post.imageSrc}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-3">
              <article className="prose prose-lg max-w-none prose-headings:text-supreme-primary prose-headings:font-semibold prose-a:text-supreme-secondary prose-a:decoration-supreme-secondary/30 hover:prose-a:decoration-supreme-secondary">
                <div dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p><p>Contenu complet de l'article à venir...</p>` }} />
              </article>
              
              {/* Tags */}
              <div className="mt-12 flex flex-wrap gap-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Tag size={18} />
                  <span>Tags:</span>
                </div>
                <Button variant="outline" size="sm" className="rounded-full">Rénovation énergétique</Button>
                <Button variant="outline" size="sm" className="rounded-full">Économies d'énergie</Button>
                <Button variant="outline" size="sm" className="rounded-full">Habitat durable</Button>
              </div>
              
              {/* Share */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold mb-4">Partager cet article</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Facebook size={18} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter size={18} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin size={18} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Mail size={18} />
                  </Button>
                </div>
              </div>
              
              {/* Author */}
              <div className="mt-12 bg-supreme-light rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-supreme-primary font-semibold text-xl">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{post.author}</h3>
                    <p className="text-gray-600">Expert en rénovation énergétique</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  Notre équipe d'experts partage régulièrement ses connaissances et conseils pour vous aider à réaliser vos projets de rénovation énergétique dans les meilleures conditions.
                </p>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-supreme-light rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold mb-4">Besoin d'aide ?</h3>
                <p className="text-gray-600 mb-6">
                  Nos experts sont disponibles pour répondre à toutes vos questions sur la rénovation énergétique.
                </p>
                <Button asChild className="w-full bg-supreme-primary hover:bg-supreme-primary/90">
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Posts */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader 
            title="Articles Similaires" 
            subtitle="Découvrez d'autres articles qui pourraient vous intéresser"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <BlogCard
                key={relatedPost.id}
                id={relatedPost.id}
                title={relatedPost.title}
                excerpt={relatedPost.excerpt}
                date={relatedPost.date}
                author={relatedPost.author}
                imageSrc={relatedPost.imageSrc}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
