
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import CTA from "@/components/CTA";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts = [
    {
      id: "1",
      title: "Comment choisir la meilleure isolation pour votre maison",
      excerpt: "Découvrez les différents types d'isolation et leurs avantages pour faire le choix le plus adapté à votre habitation et votre budget.",
      date: "15 Mars 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "2",
      title: "Pompes à chaleur : guide complet pour bien choisir",
      excerpt: "Tout ce que vous devez savoir sur les pompes à chaleur : fonctionnement, types, avantages et conseils pour bien choisir votre installation.",
      date: "28 Février 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1643756055617-608c1492f932?auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "3",
      title: "MaPrimeRénov' 2026 : montants, conditions et démarches",
      excerpt: "Le guide complet des aides financières pour la rénovation énergétique en 2026 : MaPrimeRénov', CEE, éco-PTZ et aides locales.",
      date: "10 Janvier 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1172&q=80"
    },
    {
      id: "4",
      title: "Panneaux solaires : autoconsommation ou revente totale ?",
      excerpt: "Analyse comparative des deux modèles économiques pour votre installation photovoltaïque et conseils pour faire le meilleur choix.",
      date: "20 Février 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1172&q=80"
    },
    {
      id: "5",
      title: "Rénovation globale : pourquoi opter pour une approche complète ?",
      excerpt: "Les avantages d'une rénovation énergétique globale par rapport à des travaux séparés, tant en termes de performance que de rentabilité.",
      date: "5 Février 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "6",
      title: "Chauffe-eau thermodynamique vs solaire : le comparatif",
      excerpt: "Quelle solution choisir pour produire votre eau chaude sanitaire de manière économique et écologique ? Notre analyse détaillée.",
      date: "22 Janvier 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "7",
      title: "Préparer votre maison pour l'été : solutions contre la chaleur",
      excerpt: "Découvrez les solutions efficaces pour garder votre logement frais en été sans climatisation énergivore : isolation, protections solaires, ventilation.",
      date: "1 Mars 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "8",
      title: "5 conseils pour réduire votre facture de chauffage",
      excerpt: "Des gestes simples et des astuces efficaces pour diminuer votre consommation énergétique pendant la saison froide sans sacrifier le confort.",
      date: "15 Janvier 2026",
      author: "SupremEnergies",
      imageSrc: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1174&q=80"
    }
  ];

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Helmet>
        <title>Blog Rénovation Énergétique | Conseils et Guides | SupremEnergies</title>
        <meta name="description" content="Guides, conseils et actualités sur la rénovation énergétique : isolation, pompes à chaleur, panneaux solaires, aides financières. Par SupremEnergies." />
        <link rel="canonical" href="https://supremenergies.com/blog" />
      </Helmet>

      <Hero 
        title="Blog et Conseils"
        subtitle="Guides pratiques et conseils d'experts pour réussir votre rénovation énergétique et réduire vos factures."
        buttonText="Explorer nos services"
        buttonLink="/services"
        imageSrc="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&w=1473&q=80"
      />

      {/* Search */}
      <section className="py-10 bg-supreme-light">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 bg-white text-lg rounded-xl shadow-sm border-gray-200 focus:border-supreme-primary"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              {searchTerm && (
                <Button
                  variant="ghost"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm("")}
                >
                  Effacer
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          {filteredPosts.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {searchTerm ? (
                    <>Résultats pour "<span className="text-supreme-primary">{searchTerm}</span>"</>
                  ) : (
                    <>Nos <span className="text-supreme-primary">Guides</span> et Conseils</>
                  )}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {searchTerm 
                    ? `${filteredPosts.length} article(s) trouvé(s)` 
                    : "Tout ce qu'il faut savoir pour réussir votre projet de rénovation énergétique."
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {filteredPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    author={post.author}
                    imageSrc={post.imageSrc}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">Aucun résultat pour "{searchTerm}"</h2>
              <p className="text-gray-600 mb-8">Essayez avec d'autres termes de recherche.</p>
              <Button onClick={() => setSearchTerm("")} className="bg-supreme-primary hover:bg-supreme-primary/90">
                Voir tous les articles
              </Button>
            </div>
          )}
        </div>
      </section>

      <CTA 
        title="Un projet de rénovation énergétique ?"
        subtitle="Contactez notre équipe pour un devis gratuit et des conseils personnalisés."
        backgroundClassName="bg-supreme-secondary"
      />
    </div>
  );
};

export default Blog;
