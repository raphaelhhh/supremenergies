
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: "1",
      title: "Comment choisir la meilleure isolation pour votre maison",
      excerpt: "Découvrez les différents types d'isolation et leurs avantages pour faire le choix le plus adapté à votre habitation et votre budget.",
      date: "15 Mars 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1170&q=80",
      content: `
        <p>L'isolation est l'un des aspects les plus importants de l'efficacité énergétique d'une maison. Une bonne isolation peut réduire considérablement vos factures d'énergie et améliorer votre confort au quotidien.</p>
        
        <h2>Les différents types d'isolation</h2>
        
        <h3>Isolation des combles</h3>
        <p>Les combles sont responsables de 25 à 30% des pertes de chaleur. Deux techniques principales :</p>
        <ul>
          <li><strong>Isolation par soufflage</strong> : rapide et efficace pour les combles perdus</li>
          <li><strong>Isolation par panneaux ou rouleaux</strong> : adaptée aux combles aménagés</li>
        </ul>
        
        <h3>Isolation des murs</h3>
        <p>Pour les murs, deux options s'offrent à vous :</p>
        <ul>
          <li><strong>Isolation par l'intérieur (ITI)</strong> : moins coûteuse mais réduit la surface habitable</li>
          <li><strong>Isolation par l'extérieur (ITE)</strong> : plus performante, ne réduit pas l'espace intérieur</li>
        </ul>
        
        <h3>Isolation des fenêtres</h3>
        <p>Les fenêtres représentent 10 à 15% des pertes thermiques :</p>
        <ul>
          <li><strong>Double vitrage</strong> : standard, bon rapport qualité-prix</li>
          <li><strong>Triple vitrage</strong> : performance supérieure, idéal pour les régions froides</li>
        </ul>
        
        <h2>Les matériaux isolants</h2>
        
        <h3>Isolants minéraux</h3>
        <ul>
          <li><strong>Laine de verre</strong> : bon rapport qualité-prix, résistance au feu</li>
          <li><strong>Laine de roche</strong> : excellente résistance au feu, bonne isolation phonique</li>
        </ul>
        
        <h3>Isolants biosourcés</h3>
        <ul>
          <li><strong>Laine de bois</strong> : bon déphasage thermique, régulation de l'humidité</li>
          <li><strong>Ouate de cellulose</strong> : bonne performance été comme hiver</li>
        </ul>
        
        <h2>Comment choisir ?</h2>
        <p>Le choix dépend de vos priorités (performance, budget, écologie), de la configuration de votre logement et de votre climat local. Chez SupremEnergies, nous réalisons un diagnostic personnalisé pour vous recommander la solution la plus adaptée.</p>
        
        <p><strong>Contactez-nous pour un devis gratuit et des conseils d'experts.</strong></p>
      `
    },
    {
      id: "2",
      title: "Pompes à chaleur : guide complet pour bien choisir",
      excerpt: "Tout ce que vous devez savoir sur les pompes à chaleur : fonctionnement, types, avantages et conseils pour bien choisir votre installation.",
      date: "28 Février 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1643756055617-608c1492f932?auto=format&fit=crop&w=1170&q=80",
      content: `
        <p>Les pompes à chaleur (PAC) sont aujourd'hui la solution de chauffage la plus économique et écologique. Elles permettent de diviser par 3 à 4 votre facture de chauffage.</p>
        
        <h2>Comment fonctionne une pompe à chaleur ?</h2>
        <p>Une PAC capte l'énergie présente dans l'environnement (air, eau ou sol) et la transfère à votre système de chauffage. Pour 1 kWh d'électricité consommé, elle produit 3 à 4 kWh de chaleur.</p>
        
        <h2>Les différents types</h2>
        
        <h3>PAC air/air</h3>
        <p>Capte la chaleur de l'air extérieur et la restitue sous forme d'air chaud. Simple à installer, elle peut aussi climatiser en été.</p>
        
        <h3>PAC air/eau</h3>
        <p>Capte la chaleur de l'air pour alimenter radiateurs, planchers chauffants ou production d'eau chaude. La plus polyvalente.</p>
        
        <h3>PAC géothermique</h3>
        <p>Extrait la chaleur du sol via des capteurs enterrés. Très performante toute l'année grâce à la température stable du sol.</p>
        
        <h2>Économies réalisables</h2>
        <p>En moyenne, une pompe à chaleur permet de réaliser <strong>50 à 75% d'économies</strong> par rapport à un chauffage électrique classique, et jusqu'à 40% par rapport à une chaudière gaz.</p>
        
        <h2>Les aides disponibles</h2>
        <p>En 2026, l'installation d'une PAC est éligible à MaPrimeRénov' (jusqu'à 5 000 €), aux CEE et à l'éco-PTZ. Chez SupremEnergies, nous vous accompagnons dans toutes les démarches.</p>
      `
    },
    {
      id: "3",
      title: "MaPrimeRénov' 2026 : montants, conditions et démarches",
      excerpt: "Le guide complet des aides financières pour la rénovation énergétique en 2026 : MaPrimeRénov', CEE, éco-PTZ et aides locales.",
      date: "10 Janvier 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1172&q=80",
      content: `
        <p>De nombreuses aides financières sont disponibles en 2026 pour alléger le coût de vos travaux de rénovation énergétique. Voici le guide complet.</p>
        
        <h2>MaPrimeRénov' 2026</h2>
        <p>L'aide principale pour la rénovation énergétique, avec des montants renforcés :</p>
        <ul>
          <li><strong>Ménages très modestes</strong> : jusqu'à 90% du coût des travaux</li>
          <li><strong>Ménages modestes</strong> : jusqu'à 75% du coût des travaux</li>
          <li><strong>Ménages intermédiaires</strong> : jusqu'à 60% du coût des travaux</li>
          <li><strong>Ménages aisés</strong> : jusqu'à 40% pour certains travaux</li>
        </ul>
        
        <h3>Exemples de montants</h3>
        <ul>
          <li>Pompe à chaleur air/eau : jusqu'à 5 000 €</li>
          <li>Isolation des combles : jusqu'à 25 €/m²</li>
          <li>Isolation des murs par l'extérieur : jusqu'à 75 €/m²</li>
          <li>Chauffe-eau thermodynamique : jusqu'à 1 200 €</li>
        </ul>
        
        <h2>Certificats d'Économies d'Énergie (CEE)</h2>
        <p>Primes versées par les fournisseurs d'énergie, cumulables avec MaPrimeRénov'. Elles peuvent représenter plusieurs centaines d'euros.</p>
        
        <h2>Éco-Prêt à Taux Zéro</h2>
        <p>Empruntez jusqu'à 50 000 € sans intérêts pour financer vos travaux, remboursables sur 20 ans maximum.</p>
        
        <h2>TVA à taux réduit</h2>
        <p>Les travaux de rénovation énergétique bénéficient d'une TVA à 5,5% au lieu de 20%.</p>
        
        <h2>Comment en bénéficier ?</h2>
        <ol>
          <li>Faites réaliser des devis par un professionnel RGE</li>
          <li>Déposez votre demande sur France Rénov'</li>
          <li>Attendez l'accord avant de signer</li>
          <li>Réalisez les travaux et transmettez les factures</li>
        </ol>
        
        <p><strong>Chez SupremEnergies, nous vous accompagnons dans toutes ces démarches pour maximiser vos aides.</strong></p>
      `
    },
    {
      id: "4",
      title: "Panneaux solaires : autoconsommation ou revente totale ?",
      excerpt: "Analyse comparative des deux modèles économiques pour votre installation photovoltaïque et conseils pour faire le meilleur choix.",
      date: "20 Février 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1172&q=80",
      content: `
        <p>Installer des panneaux solaires est un excellent investissement. Mais faut-il consommer sa production ou la revendre ? Voici notre analyse.</p>
        
        <h2>L'autoconsommation</h2>
        <p>Vous utilisez directement l'électricité produite. Le surplus peut être vendu au réseau.</p>
        <h3>Avantages</h3>
        <ul>
          <li>Réduction immédiate de votre facture d'électricité</li>
          <li>Protection contre la hausse des prix</li>
          <li>Prime à l'autoconsommation versée par l'État</li>
          <li>Indépendance énergétique partielle</li>
        </ul>
        
        <h2>La revente totale</h2>
        <p>Vous vendez toute l'électricité produite à EDF OA à un tarif garanti pendant 20 ans.</p>
        <h3>Avantages</h3>
        <ul>
          <li>Revenus garantis et prévisibles sur 20 ans</li>
          <li>Pas besoin d'adapter sa consommation</li>
          <li>Rentabilité calculable précisément</li>
        </ul>
        
        <h2>Quel choix faire ?</h2>
        <ul>
          <li>Présent la journée (télétravail, famille) → <strong>autoconsommation</strong></li>
          <li>Absent la journée → <strong>autoconsommation avec batteries</strong> ou <strong>revente totale</strong></li>
          <li>Investissement sûr sans contrainte → <strong>revente totale</strong></li>
        </ul>
        
        <p><strong>Chez SupremEnergies, nous analysons votre consommation pour vous recommander la meilleure option. Contactez-nous pour une étude gratuite.</strong></p>
      `
    },
    {
      id: "5",
      title: "Rénovation globale : pourquoi opter pour une approche complète ?",
      excerpt: "Les avantages d'une rénovation énergétique globale par rapport à des travaux séparés, tant en termes de performance que de rentabilité.",
      date: "5 Février 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&w=1170&q=80",
      content: `
        <p>Plutôt que de réaliser des travaux un par un, la rénovation globale propose une approche intégrée. Voici pourquoi c'est souvent la meilleure option.</p>
        
        <h2>Une meilleure performance énergétique</h2>
        <p>En traitant tous les postes en même temps (isolation, chauffage, ventilation, fenêtres), les travaux se complètent et s'optimisent mutuellement. Résultat : des économies de 60 à 80%.</p>
        
        <h2>Des aides financières bonifiées</h2>
        <ul>
          <li>Bonus de 10% sur MaPrimeRénov' pour les rénovations globales</li>
          <li>Éco-PTZ jusqu'à 50 000 €</li>
          <li>CEE bonifiés pour les rénovations ambitieuses</li>
        </ul>
        
        <h2>Un seul chantier</h2>
        <p>Au lieu de plusieurs chantiers étalés sur des années, vous n'avez qu'un seul chantier coordonné. Moins de dérangement et des travaux optimisés.</p>
        
        <h2>Une valorisation de votre bien</h2>
        <p>Un logement rénové globalement gagne significativement en valeur immobilière, surtout avec les nouvelles réglementations sur la performance énergétique et l'interdiction progressive de louer les passoires thermiques.</p>
        
        <p><strong>SupremEnergies vous accompagne de A à Z dans votre projet de rénovation globale. Contactez-nous pour une étude personnalisée.</strong></p>
      `
    },
    {
      id: "6",
      title: "Chauffe-eau thermodynamique vs solaire : le comparatif",
      excerpt: "Quelle solution choisir pour produire votre eau chaude sanitaire de manière économique et écologique ? Notre analyse détaillée.",
      date: "22 Janvier 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1170&q=80",
      content: `
        <p>Le chauffe-eau thermodynamique et le chauffe-eau solaire sont deux solutions performantes pour l'eau chaude sanitaire. Comment choisir ?</p>
        
        <h2>Le chauffe-eau thermodynamique</h2>
        <p>Il fonctionne comme une petite pompe à chaleur : il capte les calories de l'air ambiant pour chauffer l'eau.</p>
        <ul>
          <li>Installation simple (2 000 à 3 500 €)</li>
          <li>Fonctionne toute l'année</li>
          <li>Consomme 3 fois moins qu'un cumulus classique</li>
          <li>Éligible à MaPrimeRénov' (jusqu'à 1 200 €)</li>
        </ul>
        
        <h2>Le chauffe-eau solaire</h2>
        <p>Des panneaux solaires thermiques captent la chaleur du soleil pour chauffer l'eau.</p>
        <ul>
          <li>Énergie 100% gratuite et renouvelable</li>
          <li>Couvre 50 à 80% des besoins annuels</li>
          <li>Durée de vie supérieure à 20 ans</li>
          <li>Coût plus élevé (4 000 à 7 000 €)</li>
        </ul>
        
        <h2>Notre recommandation</h2>
        <p>Le thermodynamique offre le meilleur rapport qualité-prix dans la majorité des cas. Le solaire est idéal dans les régions très ensoleillées ou en complément de panneaux photovoltaïques.</p>
        
        <p><strong>Contactez SupremEnergies pour un devis gratuit adapté à votre situation.</strong></p>
      `
    },
    {
      id: "7",
      title: "Préparer votre maison pour l'été : solutions contre la chaleur",
      excerpt: "Découvrez les solutions efficaces pour garder votre logement frais en été sans climatisation énergivore : isolation, protections solaires, ventilation.",
      date: "1 Mars 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1170&q=80",
      content: `
        <p>Avec des étés de plus en plus chauds, il est essentiel de préparer votre logement pour rester au frais sans recourir à une climatisation énergivore.</p>
        
        <h2>L'isolation : efficace été comme hiver</h2>
        <p>Une bonne isolation empêche la chaleur extérieure de pénétrer. L'isolation des combles est particulièrement importante car c'est par le toit que la chaleur entre le plus.</p>
        
        <h2>Les protections solaires</h2>
        <p>Bloquer le rayonnement solaire avant qu'il n'atteigne les fenêtres :</p>
        <ul>
          <li><strong>Volets extérieurs</strong> : les plus efficaces</li>
          <li><strong>Stores extérieurs</strong> : idéaux pour les grandes baies vitrées</li>
          <li><strong>Brise-soleil orientables</strong> : moduler la lumière selon les heures</li>
          <li><strong>Pergolas bioclimatiques</strong> : protéger terrasses et baies vitrées</li>
        </ul>
        
        <h2>La pompe à chaleur réversible</h2>
        <p>Si vous devez climatiser, la PAC air/air est la solution la plus économique : elle consomme 3 à 4 fois moins qu'un climatiseur classique, et chauffe aussi en hiver.</p>
        
        <h2>La ventilation</h2>
        <p>Créer des courants d'air la nuit permet de rafraîchir naturellement le logement. Une VMC double flux peut optimiser ce rafraîchissement nocturne.</p>
        
        <p><strong>Contactez SupremEnergies pour préparer votre logement avant l'été.</strong></p>
      `
    },
    {
      id: "8",
      title: "5 conseils pour réduire votre facture de chauffage",
      excerpt: "Des gestes simples et des astuces efficaces pour diminuer votre consommation énergétique pendant la saison froide sans sacrifier le confort.",
      date: "15 Janvier 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1174&q=80",
      content: `
        <p>Le chauffage représente environ 60% de la consommation d'énergie d'un logement. Voici 5 conseils efficaces pour réduire votre facture.</p>
        
        <h2>1. Réglez correctement votre chauffage</h2>
        <p>19°C dans les pièces à vivre, 17°C dans les chambres. Chaque degré supplémentaire = +7% sur la facture.</p>
        <ul>
          <li>Installez un thermostat programmable</li>
          <li>Réduisez la nuit et pendant vos absences</li>
          <li>Ne chauffez pas les pièces inoccupées</li>
        </ul>
        
        <h2>2. Entretenez votre système de chauffage</h2>
        <ul>
          <li>Purgez vos radiateurs chaque automne</li>
          <li>Faites réviser votre chaudière ou PAC chaque année</li>
          <li>Nettoyez les filtres régulièrement</li>
        </ul>
        
        <h2>3. Améliorez l'isolation à moindre coût</h2>
        <ul>
          <li>Joints sur fenêtres et portes</li>
          <li>Boudins de porte</li>
          <li>Rideaux épais devant les fenêtres</li>
        </ul>
        
        <h2>4. Optimisez la diffusion de chaleur</h2>
        <ul>
          <li>Pas de meubles devant les radiateurs</li>
          <li>Panneaux réflecteurs derrière les radiateurs</li>
          <li>Fermez volets et rideaux dès la tombée de la nuit</li>
        </ul>
        
        <h2>5. Profitez des apports solaires</h2>
        <p>Ouvrez les volets côté sud en journée pour profiter de la chaleur gratuite du soleil, puis fermez-les le soir pour conserver cette chaleur.</p>
        
        <p><strong>Pour aller plus loin, SupremEnergies vous accompagne dans vos projets de rénovation énergétique. Contactez-nous pour un diagnostic gratuit.</strong></p>
      `
    }
  ];

  const post = blogPosts.find(post => post.id === id);
  const relatedPosts = blogPosts.filter(p => p.id !== id).slice(0, 3);

  useEffect(() => {
    if (!post) {
      navigate("/blog");
    }
    window.scrollTo(0, 0);
  }, [post, navigate, id]);

  if (!post) return null;

  return (
    <div>
      <Helmet>
        <title>{post.title} | SupremEnergies</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://supremenergies.com/blog/${post.id}`} />
      </Helmet>

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
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-supreme-primary prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-li:text-gray-700
                prose-strong:text-gray-900
                prose-ul:my-4 prose-ol:my-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Articles <span className="text-supreme-primary">similaires</span>
          </h2>
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
