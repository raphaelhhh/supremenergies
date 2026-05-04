
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import CTA from "@/components/CTA";
import InternalLinksHub from "@/components/InternalLinksHub";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, author, image_src, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Blog SupremEnergies — Conseils et guides rénovation énergétique",
    "description": "Guides, conseils et actualités sur la rénovation énergétique : isolation, pompes à chaleur, panneaux solaires, MaPrimeRénov'.",
    "url": "https://supremenergies.com/blog",
    "isPartOf": {
      "@type": "WebSite",
      "name": "SupremEnergies",
      "url": "https://supremenergies.com"
    },
    "hasPart": blogPosts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      "headline": p.title,
      "url": `https://supremenergies.com/blog/${p.slug}`,
      "image": p.image_src,
      "datePublished": p.published_at,
      "author": { "@type": "Organization", "name": p.author }
    }))
  };

  return (
    <div>
      <Helmet>
        <title>Blog Rénovation Énergétique 2026 ★ Aides, Prix et Conseils Experts</title>
        <meta name="description" content="✓ Guides pratiques 2026 : MaPrimeRénov', prix pompe à chaleur, isolation, panneaux solaires. Conseils d'experts pour réduire vos factures. Mis à jour chaque semaine." />
        <link rel="canonical" href="https://supremenergies.com/blog" />
        <meta property="og:title" content="Blog Rénovation Énergétique 2026 ★ Aides, Prix et Conseils Experts" />
        <meta property="og:description" content="Guides et conseils 2026 pour réussir votre rénovation énergétique." />
        <meta property="og:url" content="https://supremenergies.com/blog" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
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
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Chargement des articles...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
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
                    id={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={formatDate(post.published_at)}
                    author={post.author}
                    imageSrc={post.image_src}
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
