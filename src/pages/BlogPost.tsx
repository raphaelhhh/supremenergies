
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import BlogCard from "@/components/BlogCard";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock blog posts data (same as in Blog.tsx)
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
        <p>Les pompes à chaleur représentent une solution de chauffage de plus en plus populaire, permettant de réduire considérablement les factures d'énergie tout en diminuant l'impact environnemental. Mais comment fonctionnent-elles exactement ? Quels sont les différents types disponibles ? Et comment choisir celle qui convient le mieux à votre situation ?</p>
        
        <h2>Principe de fonctionnement d'une pompe à chaleur</h2>
        
        <p>Une pompe à chaleur fonctionne sur un principe simple : elle capte l'énergie présente dans l'environnement (air, eau ou sol) et la transfère à votre système de chauffage. Contrairement aux systèmes de chauffage traditionnels qui produisent de la chaleur, une pompe à chaleur la déplace.</p>
        
        <p>Le processus se déroule en quatre étapes :</p>
        
        <ol>
          <li><strong>Évaporation</strong> : Un fluide frigorigène capte la chaleur de la source extérieure (air, eau ou sol) et s'évapore.</li>
          <li><strong>Compression</strong> : Le compresseur comprime le gaz, ce qui augmente sa température.</li>
          <li><strong>Condensation</strong> : Le gaz chaud transfère sa chaleur au système de chauffage de la maison et se condense.</li>
          <li><strong>Détente</strong> : Le fluide refroidi passe par un détendeur et le cycle recommence.</li>
        </ol>
        
        <h2>Les différents types de pompes à chaleur</h2>
        
        <h3>Pompes à chaleur air/air</h3>
        
        <p>Ces pompes captent l'énergie présente dans l'air extérieur et la restituent sous forme d'air chaud à l'intérieur.</p>
        
        <p><strong>Avantages :</strong></p>
        <ul>
          <li>Installation simple et peu coûteuse</li>
          <li>Réversibles (peuvent aussi climatiser en été)</li>
          <li>Conviennent aux logements sans système de chauffage central</li>
        </ul>
        
        <p><strong>Inconvénients :</strong></p>
        <ul>
          <li>Performance réduite par temps très froid</li>
          <li>Ne produisent pas d'eau chaude sanitaire</li>
          <li>Nécessitent des unités intérieures dans chaque pièce à chauffer</li>
        </ul>
        
        <h3>Pompes à chaleur air/eau</h3>
        
        <p>Elles captent la chaleur de l'air extérieur pour la transférer à un circuit d'eau qui alimente radiateurs, planchers chauffants ou production d'eau chaude sanitaire.</p>
        
        <p><strong>Avantages :</strong></p>
        <ul>
          <li>Compatible avec les systèmes de chauffage central existants</li>
          <li>Production d'eau chaude sanitaire possible</li>
          <li>Installation relativement simple</li>
        </ul>
        
        <p><strong>Inconvénients :</strong></p>
        <ul>
          <li>Performance diminuée par grand froid</li>
          <li>Unité extérieure parfois bruyante</li>
        </ul>
        
        <h3>Pompes à chaleur géothermiques</h3>
        
        <p>Ces systèmes extraient la chaleur du sol via des capteurs enterrés horizontalement ou verticalement.</p>
        
        <p><strong>Avantages :</strong></p>
        <ul>
          <li>Très bonne performance toute l'année (température du sol stable)</li>
          <li>Durée de vie importante</li>
          <li>Fonctionnement silencieux</li>
        </ul>
        
        <p><strong>Inconvénients :</strong></p>
        <ul>
          <li>Installation coûteuse et complexe</li>
          <li>Nécessite un terrain suffisamment grand (pour capteurs horizontaux)</li>
          <li>Travaux de terrassement importants</li>
        </ul>
        
        <h2>Comment choisir sa pompe à chaleur ?</h2>
        
        <p>Plusieurs critères sont à prendre en compte :</p>
        
        <h3>La configuration de votre logement</h3>
        
        <ul>
          <li>Surface à chauffer</li>
          <li>Niveau d'isolation</li>
          <li>Système de chauffage existant</li>
          <li>Espace disponible (intérieur et extérieur)</li>
        </ul>
        
        <h3>Le climat de votre région</h3>
        
        <p>Dans les régions aux hivers rigoureux, une PAC géothermique sera plus efficace qu'une PAC air/eau.</p>
        
        <h3>Vos besoins spécifiques</h3>
        
        <ul>
          <li>Chauffage seul ou chauffage + production d'eau chaude sanitaire</li>
          <li>Besoin de climatisation en été</li>
          <li>Niveau sonore acceptable</li>
        </ul>
        
        <h3>Votre budget</h3>
        
        <p>Il faut considérer non seulement le coût initial mais aussi les coûts de fonctionnement à long terme et les aides financières disponibles.</p>
        
        <h2>Performances et économies</h2>
        
        <p>La performance d'une pompe à chaleur est mesurée par son COP (Coefficient de Performance). Un COP de 4 signifie que pour 1 kWh d'électricité consommé, la PAC produit 4 kWh de chaleur.</p>
        
        <p>En moyenne, une pompe à chaleur permet de réaliser 50 à 75% d'économies par rapport à un chauffage électrique classique et 25 à 50% par rapport à une chaudière au gaz.</p>
        
        <h2>Les aides financières</h2>
        
        <p>L'installation d'une pompe à chaleur peut bénéficier de plusieurs aides :</p>
        
        <ul>
          <li>MaPrimeRénov'</li>
          <li>Certificats d'Économies d'Énergie (CEE)</li>
          <li>TVA à taux réduit (5,5%)</li>
          <li>Éco-prêt à taux zéro</li>
          <li>Aides locales (selon votre région)</li>
        </ul>
        
        <p>Chez SupremEnergies, nos experts vous accompagnent dans le choix de la pompe à chaleur la plus adaptée à vos besoins et vous aident à obtenir toutes les aides financières auxquelles vous avez droit. Contactez-nous pour une étude personnalisée de votre projet.</p>
      `
    },
    {
      id: "3",
      title: "Les aides financières pour la rénovation énergétique en 2026",
      excerpt: "Le point sur toutes les aides disponibles cette année pour financer vos travaux de rénovation énergétique et maximiser vos économies.",
      date: "10 Octobre 2025",
      author: "Sophie Bernard",
      imageSrc: "https://images.unsplash.com/photo-1621551711576-89c8861760b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80",
      content: ""
    },
    {
      id: "4",
      title: "Panneaux solaires : autoconsommation ou revente totale ?",
      excerpt: "Analyse comparative des deux modèles économiques pour votre installation photovoltaïque et conseils pour faire le meilleur choix.",
      date: "2 Septembre 2025",
      author: "Thomas Martin",
      imageSrc: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
      content: ""
    },
    {
      id: "5",
      title: "Rénovation globale : pourquoi opter pour une approche complète ?",
      excerpt: "Les avantages d'une rénovation énergétique globale par rapport à des travaux séparés, tant en termes de performance que de rentabilité.",
      date: "20 Août 2025",
      author: "Pierre Durand",
      imageSrc: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content: ""
    },
    {
      id: "6",
      title: "Comment réduire la consommation énergétique de votre entreprise",
      excerpt: "Stratégies et solutions pratiques pour les entreprises souhaitant diminuer leur facture énergétique et leur impact environnemental.",
      date: "5 Juillet 2025",
      author: "Marie Laurent",
      imageSrc: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content: ""
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
                <p className="mt-4">
                  Expert chez SupremEnergies, {post.author} conseille nos clients dans leurs projets de rénovation énergétique et partage régulièrement son expertise sur notre blog.
                </p>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Articles récents</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 4).map((p) => (
                    <Link key={p.id} to={`/blog/${p.id}`} className="block group">
                      <div className="flex gap-3">
                        <img 
                          src={p.imageSrc} 
                          alt={p.title} 
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-medium text-sm group-hover:text-supreme-primary transition-colors">
                            {p.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{p.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-lg mb-4">Catégories</h3>
                  <div className="space-y-2">
                    <Link to="/blog" className="block text-gray-600 hover:text-supreme-primary transition-colors">Isolation</Link>
                    <Link to="/blog" className="block text-gray-600 hover:text-supreme-primary transition-colors">Chauffage</Link>
                    <Link to="/blog" className="block text-gray-600 hover:text-supreme-primary transition-colors">Énergie Solaire</Link>
                    <Link to="/blog" className="block text-gray-600 hover:text-supreme-primary transition-colors">Aides Financières</Link>
                    <Link to="/blog" className="block text-gray-600 hover:text-supreme-primary transition-colors">Rénovation Globale</Link>
                    <Link to="/blog" className="block text-gray-600 hover:text-supreme-primary transition-colors">Solutions Entreprises</Link>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="bg-supreme-primary text-white rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3">Vous avez un projet ?</h3>
                    <p className="text-white/80 mb-4">Contactez-nous pour obtenir un devis gratuit et personnalisé.</p>
                    <Button asChild className="w-full bg-white text-supreme-primary hover:bg-white/90">
                      <Link to="/contact">Demander un devis</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Posts */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader 
            title="Articles similaires" 
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
          
          <div className="text-center mt-12">
            <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90">
              <Link to="/blog">Voir tous les articles</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
