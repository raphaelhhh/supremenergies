import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import InternalLinksHub from "@/components/InternalLinksHub";
import CTA from "@/components/CTA";
import { supabase } from "@/integrations/supabase/client";
import { BLOG_CATEGORIES, getCategory } from "@/lib/blog-categories";

const BlogCategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategory(slug);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["blog-category", slug],
    enabled: !!category,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, author, image_src, published_at")
        .eq("published", true)
        .eq("category", slug)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (!category) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  const canonical = `https://supremenergies.com/blog/categorie/${category.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://supremenergies.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://supremenergies.com/blog" },
      { "@type": "ListItem", position: 3, name: category.name, item: canonical },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.metaTitle,
    description: category.description,
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "SupremEnergies", url: "https://supremenergies.com" },
    hasPart: posts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://supremenergies.com/blog/${p.slug}`,
      image: p.image_src,
      datePublished: p.published_at,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  return (
    <div>
      <Helmet>
        <title>{category.metaTitle} | SupremEnergies</title>
        <meta name="description" content={category.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={category.metaTitle} />
        <meta property="og:description" content={category.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      {/* Header */}
      <section className="bg-gradient-to-b from-supreme-light to-white pt-28 pb-12">
        <div className="container-custom max-w-5xl">
          <nav aria-label="Fil d'Ariane" className="text-sm text-gray-700 mb-4">
            <Link to="/" className="hover:text-supreme-primary">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-supreme-primary">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">{category.name}</span>
          </nav>
          <Link
            to="/blog"
            className="inline-flex items-center text-sm text-supreme-primary hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Tous les articles
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-supreme-primary mb-4">{category.name}</h1>
          <p className="text-lg text-gray-700 max-w-3xl">{category.description}</p>
        </div>
      </section>

      {/* Other categories chips */}
      <section className="border-b bg-white py-4">
        <div className="container-custom max-w-5xl flex flex-wrap gap-2">
          <Link
            to="/blog"
            className="px-3 py-1.5 rounded-full text-sm border border-gray-200 text-gray-700 hover:border-supreme-primary hover:text-supreme-primary transition"
          >
            Toutes
          </Link>
          {BLOG_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/blog/categorie/${c.slug}`}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                c.slug === category.slug
                  ? "border-supreme-primary bg-supreme-primary text-white font-semibold"
                  : "border-gray-200 text-gray-700 hover:border-supreme-primary hover:text-supreme-primary"
              }`}
            >
              {c.shortName}
            </Link>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          {isLoading ? (
            <p className="text-center text-gray-500">Chargement des articles...</p>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Aucun article publié dans cette catégorie pour le moment.</p>
              <Link to="/blog" className="text-supreme-primary font-semibold hover:underline">
                Voir tous les articles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p) => (
                <BlogCard
                  key={p.id}
                  id={p.slug}
                  title={p.title}
                  excerpt={p.excerpt}
                  date={formatDate(p.published_at)}
                  author={p.author}
                  imageSrc={p.image_src}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <InternalLinksHub
        title="Approfondir avec nos services"
        subtitle="Passez de l'information à l'action avec nos pages dédiées."
        links={[
          { to: "/services/pompe-a-chaleur", label: "Service pompe à chaleur", desc: "Installation et entretien PAC" },
          { to: "/services/isolation-thermique", label: "Service isolation thermique", desc: "Combles, murs, planchers" },
          { to: "/services/panneaux-solaires", label: "Service panneaux solaires", desc: "Autoconsommation et revente" },
          { to: "/simulateur-aides", label: "Simulateur d'aides 2026", desc: "Estimez vos primes en 2 min" },
          { to: "/devis-gratuit", label: "Demander un devis gratuit", desc: "Réponse sous 48h" },
        ]}
      />

      <CTA
        title={`Un projet ${category.shortName.toLowerCase()} ?`}
        subtitle="Nos experts SupremEnergies vous accompagnent gratuitement de l'estimation des aides au devis détaillé."
        primaryButtonText="Demander un devis"
        primaryButtonLink="/devis-gratuit"
        backgroundClassName="bg-supreme-secondary"
      />
    </div>
  );
};

export default BlogCategoryPage;
