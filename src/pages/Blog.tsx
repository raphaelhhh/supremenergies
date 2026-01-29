
import { useState } from "react";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import BlogCard from "@/components/BlogCard";
import CTA from "@/components/CTA";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Blog posts data
  const blogPosts = [
    {
      id: "1",
      title: "Comment choisir la meilleure isolation pour votre maison",
      excerpt: "Découvrez les différents types d'isolation et leurs avantages pour faire le choix le plus adapté à votre habitation et votre budget.",
      date: "15 Novembre 2025",
      author: "Pierre Durand",
      imageSrc: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "2",
      title: "Les pompes à chaleur : guide complet pour comprendre leur fonctionnement",
      excerpt: "Tout ce que vous devez savoir sur les pompes à chaleur : principes de fonctionnement, différents types, avantages et points d'attention.",
      date: "28 Octobre 2025",
      author: "Marie Laurent",
      imageSrc: "https://images.unsplash.com/photo-1643756055617-608c1492f932?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "3",
      title: "Les aides financières pour la rénovation énergétique en 2026",
      excerpt: "Le point sur toutes les aides disponibles cette année pour financer vos travaux de rénovation énergétique et maximiser vos économies.",
      date: "10 Octobre 2025",
      author: "Sophie Bernard",
      imageSrc: "https://images.unsplash.com/photo-1621551711576-89c8861760b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80"
    },
    {
      id: "4",
      title: "Panneaux solaires : autoconsommation ou revente totale ?",
      excerpt: "Analyse comparative des deux modèles économiques pour votre installation photovoltaïque et conseils pour faire le meilleur choix.",
      date: "2 Septembre 2025",
      author: "Thomas Martin",
      imageSrc: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
    },
    {
      id: "5",
      title: "Rénovation globale : pourquoi opter pour une approche complète ?",
      excerpt: "Les avantages d'une rénovation énergétique globale par rapport à des travaux séparés, tant en termes de performance que de rentabilité.",
      date: "20 Août 2025",
      author: "Pierre Durand",
      imageSrc: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "6",
      title: "Comment réduire la consommation énergétique de votre entreprise",
      excerpt: "Stratégies et solutions pratiques pour les entreprises souhaitant diminuer leur facture énergétique et leur impact environnemental.",
      date: "5 Juillet 2025",
      author: "Marie Laurent",
      imageSrc: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "7",
      title: "MaPrimeRénov' 2026 : ce qui change cette année",
      excerpt: "Découvrez les nouvelles modalités de MaPrimeRénov' en 2026, les montants des aides et les conditions d'éligibilité mises à jour.",
      date: "2 Janvier 2026",
      author: "Sophie Bernard",
      imageSrc: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
    },
    {
      id: "8",
      title: "Chaleur record en 2025 : comment préparer votre maison pour l'été 2026",
      excerpt: "Après un été 2025 caniculaire, découvrez les solutions pour garder votre logement frais sans climatisation énergivore.",
      date: "18 Décembre 2025",
      author: "Thomas Martin",
      imageSrc: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
    },
    {
      id: "9",
      title: "L'adoucisseur d'eau : un investissement rentable pour votre foyer",
      excerpt: "Protégez vos équipements, réduisez vos dépenses et améliorez votre quotidien grâce à l'installation d'un adoucisseur d'eau.",
      date: "5 Décembre 2025",
      author: "Pierre Durand",
      imageSrc: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "10",
      title: "Chauffe-eau thermodynamique vs chauffe-eau solaire : le comparatif",
      excerpt: "Quelle solution choisir pour produire votre eau chaude sanitaire de manière économique et écologique ? Notre analyse détaillée.",
      date: "22 Novembre 2025",
      author: "Marie Laurent",
      imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "11",
      title: "Les nouvelles normes RE2020 et leur impact sur la rénovation",
      excerpt: "Comprendre les exigences de la réglementation environnementale et comment elles influencent vos projets de rénovation énergétique.",
      date: "8 Novembre 2025",
      author: "Sophie Bernard",
      imageSrc: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "12",
      title: "5 conseils pratiques pour réduire votre facture de chauffage cet hiver",
      excerpt: "Des gestes simples et des astuces efficaces pour diminuer votre consommation énergétique pendant la saison froide.",
      date: "1 Novembre 2025",
      author: "Thomas Martin",
      imageSrc: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80"
    }
  ];

  // Filter blog posts based on search term
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Hero 
        title="Blog et Actualités"
        subtitle="Restez informé des dernières tendances et innovations en matière de rénovation énergétique et d'énergies renouvelables."
        buttonText="Explorer nos services"
        buttonLink="/services"
        imageSrc="https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80"
      />

      {/* Search Section */}
      <section className="py-10 bg-supreme-light">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-supreme-primary">Rechercher un article</h2>
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

      {/* Blog Posts Section */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          {filteredPosts.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {searchTerm ? (
                    <>Résultats pour "<span className="text-supreme-primary">{searchTerm}</span>"</>
                  ) : (
                    <>Nos <span className="text-supreme-primary">Derniers</span> Articles</>
                  )}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {searchTerm 
                    ? `${filteredPosts.length} article(s) trouvé(s)` 
                    : "Découvrez nos articles, guides et conseils sur la rénovation énergétique et les énergies renouvelables."
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
              <h2 className="text-2xl font-bold mb-4">Aucun résultat trouvé pour "{searchTerm}"</h2>
              <p className="text-gray-600 mb-8">Essayez avec d'autres termes ou parcourez nos catégories.</p>
              <Button onClick={() => setSearchTerm("")} className="bg-supreme-primary hover:bg-supreme-primary/90">
                Voir tous les articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explorer par <span className="text-supreme-primary">Catégorie</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trouvez facilement les informations qui vous intéressent.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-6 md:py-8 h-auto flex flex-col rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
              onClick={() => setSearchTerm("isolation")}
            >
              <span className="text-base md:text-lg font-semibold">Isolation</span>
              <span className="text-xs md:text-sm text-gray-500 mt-1">12 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-6 md:py-8 h-auto flex flex-col rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
              onClick={() => setSearchTerm("chauffage")}
            >
              <span className="text-base md:text-lg font-semibold">Chauffage</span>
              <span className="text-xs md:text-sm text-gray-500 mt-1">9 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-6 md:py-8 h-auto flex flex-col rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
              onClick={() => setSearchTerm("solaire")}
            >
              <span className="text-base md:text-lg font-semibold">Énergie Solaire</span>
              <span className="text-xs md:text-sm text-gray-500 mt-1">7 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-6 md:py-8 h-auto flex flex-col rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
              onClick={() => setSearchTerm("aides")}
            >
              <span className="text-base md:text-lg font-semibold">Aides Financières</span>
              <span className="text-xs md:text-sm text-gray-500 mt-1">5 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-6 md:py-8 h-auto flex flex-col rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
              onClick={() => setSearchTerm("rénovation")}
            >
              <span className="text-base md:text-lg font-semibold">Rénovation Globale</span>
              <span className="text-xs md:text-sm text-gray-500 mt-1">4 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-6 md:py-8 h-auto flex flex-col rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
              onClick={() => setSearchTerm("entreprise")}
            >
              <span className="text-base md:text-lg font-semibold">Solutions Entreprises</span>
              <span className="text-xs md:text-sm text-gray-500 mt-1">6 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-6 md:py-8 h-auto flex flex-col rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
              onClick={() => setSearchTerm("conseils")}
            >
              <span className="text-base md:text-lg font-semibold">Conseils Pratiques</span>
              <span className="text-xs md:text-sm text-gray-500 mt-1">10 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-6 md:py-8 h-auto flex flex-col rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
              onClick={() => setSearchTerm("actualités")}
            >
              <span className="text-base md:text-lg font-semibold">Actualités</span>
              <span className="text-xs md:text-sm text-gray-500 mt-1">8 articles</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-supreme-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">S'abonner à notre newsletter</h2>
            <p className="text-lg mb-8 text-white/80">
              Recevez nos derniers articles, conseils et actualités directement dans votre boîte mail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button className="bg-white text-supreme-primary hover:bg-white/90">
                S'abonner
              </Button>
            </div>
            <p className="text-sm mt-4 text-white/60">
              En vous inscrivant, vous acceptez de recevoir nos communications. Vous pourrez vous désabonner à tout moment.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA 
        title="Des questions sur nos services ?"
        subtitle="N'hésitez pas à contacter notre équipe pour en savoir plus sur nos solutions de rénovation énergétique."
        backgroundClassName="bg-supreme-secondary"
      />
    </div>
  );
};

export default Blog;
