import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RelatedArticlesProps {
  /** Mots-clés à matcher dans le titre / extrait pour filtrer les articles pertinents */
  keywords?: string[];
  /** Slug à exclure (article courant) */
  excludeSlug?: string;
  /** Nombre d'articles à afficher (défaut 3) */
  limit?: number;
  /** Titre du bloc */
  title?: string;
}

const RelatedArticles = ({
  keywords = [],
  excludeSlug,
  limit = 3,
  title = "Articles liés",
}: RelatedArticlesProps) => {
  const { data: posts = [] } = useQuery({
    queryKey: ["related-articles", keywords.join(","), excludeSlug, limit],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, image_src, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(20);

      if (excludeSlug) query = query.neq("slug", excludeSlug);

      const { data, error } = await query;
      if (error) throw error;

      // Filtrage par mots-clés côté client (matching titre/extrait insensible à la casse)
      const filtered = keywords.length
        ? (data || []).filter((p) => {
            const haystack = `${p.title} ${p.excerpt}`.toLowerCase();
            return keywords.some((kw) => haystack.includes(kw.toLowerCase()));
          })
        : data || [];

      // Si pas assez d'articles matchent, on complète avec les plus récents
      const result = [...filtered];
      if (result.length < limit) {
        for (const p of data || []) {
          if (result.length >= limit) break;
          if (!result.find((r) => r.id === p.id)) result.push(p);
        }
      }
      return result.slice(0, limit);
    },
  });

  if (posts.length === 0) return null;

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image_src}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(post.published_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <h3 className="font-semibold text-supreme-dark mb-2 group-hover:text-supreme-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center text-supreme-primary text-sm font-medium">
                  Lire l'article <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
