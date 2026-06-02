import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Cluster = {
  id: "pac" | "isolation" | "solaire" | "aides";
  label: string;
  keywords: string[];
  pillar?: { to: string; label: string };
};

const CLUSTERS: Cluster[] = [
  {
    id: "pac",
    label: "Pompe à chaleur",
    keywords: ["pompe à chaleur", "pac ", "cop", "air/eau", "air/air"],
    pillar: { to: "/pompe-a-chaleur-2026", label: "Guide complet PAC 2026" },
  },
  {
    id: "isolation",
    label: "Isolation",
    keywords: ["isolation", "ite", "iti", "combles", "thermique"],
    pillar: { to: "/services/isolation-thermique", label: "Service isolation" },
  },
  {
    id: "solaire",
    label: "Panneaux solaires",
    keywords: ["solaire", "photovoltaïque", "panneaux", "autoconsommation"],
    pillar: { to: "/services/panneaux-solaires", label: "Service panneaux solaires" },
  },
  {
    id: "aides",
    label: "Aides & financement",
    keywords: ["maprimerénov", "cee", "aides", "éco-ptz", "subvention", "dpe"],
    pillar: { to: "/aides-renovation-2026", label: "Guide aides 2026" },
  },
];

const detectCluster = (title: string): Cluster => {
  const t = title.toLowerCase();
  return CLUSTERS.find((c) => c.keywords.some((k) => t.includes(k))) ?? CLUSTERS[3];
};

type Props = {
  currentTitle: string;
  currentSlug: string;
};

const BlogClusterNav = ({ currentTitle, currentSlug }: Props) => {
  const cluster = detectCluster(currentTitle);

  const { data: posts = [] } = useQuery({
    queryKey: ["cluster-posts", cluster.id, currentSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("title, slug")
        .eq("published", true)
        .neq("slug", currentSlug)
        .order("published_at", { ascending: false })
        .limit(40);
      if (error) throw error;
      return (data ?? []).filter((p) =>
        cluster.keywords.some((k) => p.title.toLowerCase().includes(k)),
      ).slice(0, 4);
    },
  });

  if (posts.length === 0 && !cluster.pillar) return null;

  return (
    <aside className="my-8 border border-supreme-primary/20 bg-supreme-light/40 rounded-2xl p-5 not-prose">
      <div className="flex items-center gap-2 mb-3 text-supreme-primary">
        <Sparkles className="h-4 w-4" />
        <span className="text-sm font-semibold uppercase tracking-wide">
          Dossier {cluster.label}
        </span>
      </div>
      {cluster.pillar && (
        <Link
          to={cluster.pillar.to}
          className="block font-semibold text-supreme-dark hover:text-supreme-primary mb-3"
        >
          → {cluster.pillar.label}
        </Link>
      )}
      {posts.length > 0 && (
        <ul className="space-y-1.5 text-sm">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link to={`/blog/${p.slug}`} className="text-supreme-primary hover:underline">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default BlogClusterNav;
