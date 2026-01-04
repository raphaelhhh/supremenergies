
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

  // Mock blog posts data
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
      <section className="py-8 bg-supreme-light">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 bg-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchTerm && (
                <Button
                  variant="ghost"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
      <section className="section-padding">
        <div className="container-custom">
          {filteredPosts.length > 0 ? (
            <>
              <SectionHeader 
                title={searchTerm ? `Résultats de recherche pour "${searchTerm}"` : "Nos Derniers Articles"}
                subtitle={searchTerm ? `${filteredPosts.length} article(s) trouvé(s)` : "Découvrez nos articles, guides et conseils sur la rénovation énergétique et les énergies renouvelables."}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Aucun résultat trouvé pour "{searchTerm}"</h2>
              <p className="text-gray-600 mb-6">Essayez avec d'autres termes ou parcourez nos catégories.</p>
              <Button onClick={() => setSearchTerm("")} className="bg-supreme-primary hover:bg-supreme-primary/90">
                Voir tous les articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader 
            title="Catégories" 
            subtitle="Explorez nos articles par thème pour trouver facilement les informations qui vous intéressent."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-8 h-auto flex flex-col"
              onClick={() => setSearchTerm("isolation")}
            >
              <span className="text-lg font-semibold">Isolation</span>
              <span className="text-sm text-gray-500 mt-1">12 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-8 h-auto flex flex-col"
              onClick={() => setSearchTerm("chauffage")}
            >
              <span className="text-lg font-semibold">Chauffage</span>
              <span className="text-sm text-gray-500 mt-1">9 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-8 h-auto flex flex-col"
              onClick={() => setSearchTerm("solaire")}
            >
              <span className="text-lg font-semibold">Énergie Solaire</span>
              <span className="text-sm text-gray-500 mt-1">7 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-8 h-auto flex flex-col"
              onClick={() => setSearchTerm("aides")}
            >
              <span className="text-lg font-semibold">Aides Financières</span>
              <span className="text-sm text-gray-500 mt-1">5 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-8 h-auto flex flex-col"
              onClick={() => setSearchTerm("rénovation")}
            >
              <span className="text-lg font-semibold">Rénovation Globale</span>
              <span className="text-sm text-gray-500 mt-1">4 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-8 h-auto flex flex-col"
              onClick={() => setSearchTerm("entreprise")}
            >
              <span className="text-lg font-semibold">Solutions Entreprises</span>
              <span className="text-sm text-gray-500 mt-1">6 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-8 h-auto flex flex-col"
              onClick={() => setSearchTerm("conseils")}
            >
              <span className="text-lg font-semibold">Conseils Pratiques</span>
              <span className="text-sm text-gray-500 mt-1">10 articles</span>
            </Button>
            
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:bg-supreme-light hover:text-supreme-primary hover:border-supreme-primary py-8 h-auto flex flex-col"
              onClick={() => setSearchTerm("actualités")}
            >
              <span className="text-lg font-semibold">Actualités</span>
              <span className="text-sm text-gray-500 mt-1">8 articles</span>
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
