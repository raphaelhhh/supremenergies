import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const FooterPopularArticles = () => {
  const { data: posts = [] } = useQuery({
    queryKey: ["footer-popular-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  if (posts.length === 0) {
    return (
      <div>
        <h3 className="text-xl font-bold mb-6 text-white">Articles récents</h3>
        <p className="text-gray-400 text-sm">Bientôt disponible.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-6 text-white">Articles récents</h3>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              to={`/blog/${post.slug}`}
              className="text-gray-300 hover:text-white transition-colors flex items-start text-sm"
            >
              <ArrowRight
                size={14}
                className="mr-2 mt-1 text-supreme-accent flex-shrink-0"
              />
              <span className="line-clamp-2">{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterPopularArticles;
