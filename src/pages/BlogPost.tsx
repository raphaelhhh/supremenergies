
import { useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedServices from "@/components/RelatedServices";
import RelatedZones from "@/components/RelatedZones";
import BlogClusterNav from "@/components/BlogClusterNav";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { supabase } from "@/integrations/supabase/client";
import { getCategory } from "@/lib/blog-categories";

interface Heading {
  id: string;
  text: string;
}

function slugifyId(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Enrichit le HTML brut de l'article :
 *  - ajoute des IDs sur les <h2> pour ancrer la TOC
 *  - injecte un CTA inline à ~50% du contenu
 *  - retourne la liste des headings + une FAQ détectée (Q/R en H3 sous un H2 "FAQ"/"Questions")
 */
function enrichContent(html: string): {
  html: string;
  headings: Heading[];
  faq: { question: string; answer: string }[];
} {
  if (typeof window === "undefined" || !html) {
    return { html, headings: [], faq: [] };
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const root = doc.body.firstElementChild as HTMLElement | null;
  if (!root) return { html, headings: [], faq: [] };

  // 1. IDs sur les H2
  const headings: Heading[] = [];
  root.querySelectorAll("h2").forEach((h) => {
    const text = h.textContent?.trim() ?? "";
    if (!text) return;
    const id = h.id || slugifyId(text);
    h.id = id;
    headings.push({ id, text });
  });

  // 2. FAQ détectée : un H2 contenant "FAQ" ou "Questions", suivi de paires H3 + P
  const faq: { question: string; answer: string }[] = [];
  const allH2 = Array.from(root.querySelectorAll("h2"));
  const faqHeading = allH2.find((h) =>
    /faq|questions? (fréquentes?|courantes?)/i.test(h.textContent ?? ""),
  );
  if (faqHeading) {
    let sib = faqHeading.nextElementSibling;
    while (sib && sib.tagName !== "H2") {
      if (sib.tagName === "H3") {
        const q = sib.textContent?.trim() ?? "";
        let answerEl = sib.nextElementSibling;
        const answerParts: string[] = [];
        while (answerEl && !["H2", "H3"].includes(answerEl.tagName)) {
          if (answerEl.textContent) answerParts.push(answerEl.textContent.trim());
          answerEl = answerEl.nextElementSibling;
        }
        const a = answerParts.join(" ").trim();
        if (q && a) faq.push({ question: q, answer: a });
      }
      sib = sib.nextElementSibling;
    }
  }

  // 3. CTA inline à mi-article (après le H2 le plus proche de la moitié)
  if (allH2.length >= 3) {
    const midIdx = Math.floor(allH2.length / 2);
    const midH2 = allH2[midIdx];
    const cta = doc.createElement("div");
    cta.innerHTML = `
      <div style="background:#f0f9ff;border-left:4px solid #2e7d32;border-radius:8px;padding:18px 20px;margin:24px 0;display:flex;gap:14px;align-items:center;flex-wrap:wrap;">
        <div style="flex:1;min-width:200px;">
          <strong style="color:#2e7d32;display:block;margin-bottom:4px;">Vous lisez ceci parce que vous y pensez sérieusement.</strong>
          <span style="color:#374151;font-size:14px;">Faites-vous accompagner gratuitement par un expert SupremEnergies pour chiffrer votre projet.</span>
        </div>
        <a href="/devis-gratuit?from=blog_inline" style="background:#2e7d32;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;white-space:nowrap;">Devis gratuit 48h →</a>
      </div>
    `;
    midH2.parentNode?.insertBefore(cta.firstElementChild!, midH2);
  }

  return { html: root.innerHTML, headings, faq };
}

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", id)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const category = getCategory((post as { category?: string } | null)?.category);

  // Articles liés : même catégorie, à défaut les 3 plus récents
  const { data: relatedPosts = [] } = useQuery({
    queryKey: ["related-posts", id, category?.slug ?? "all"],
    enabled: !!post,
    queryFn: async () => {
      const baseQuery = supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, author, image_src, published_at")
        .eq("published", true)
        .neq("slug", id as string)
        .order("published_at", { ascending: false })
        .limit(3);
      const query = category ? baseQuery.eq("category", category.slug) : baseQuery;
      const { data, error } = await query;
      if (error) throw error;
      // Fallback si moins de 3 articles dans la catégorie
      if (category && (!data || data.length < 3)) {
        const { data: fallback } = await supabase
          .from("blog_posts")
          .select("id, title, slug, excerpt, author, image_src, published_at")
          .eq("published", true)
          .neq("slug", id as string)
          .order("published_at", { ascending: false })
          .limit(3);
        return fallback ?? [];
      }
      return data ?? [];
    },
  });

  useEffect(() => {
    if (!isLoading && !post) {
      navigate("/blog");
    }
    window.scrollTo(0, 0);
  }, [post, isLoading, navigate]);

  const enriched = useMemo(
    () => (post ? enrichContent(post.content) : { html: "", headings: [], faq: [] }),
    [post],
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Chargement...</p>
      </div>
    );
  }

  if (!post) return null;

  const canonicalUrl = `https://supremenergies.com/blog/${post.slug}`;
  const desc = post.meta_description || post.excerpt;

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: desc,
    image: post.image_src,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    author: { "@type": "Organization", name: "SupremEnergies", url: "https://supremenergies.com" },
    publisher: {
      "@type": "Organization",
      name: "SupremEnergies",
      url: "https://supremenergies.com",
      logo: { "@type": "ImageObject", url: "https://supremenergies.com/favicon.png" },
    },
    ...(category ? { articleSection: category.name } : {}),
    ...(post.target_keyword ? { keywords: post.target_keyword } : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://supremenergies.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://supremenergies.com/blog" },
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: category.name,
              item: `https://supremenergies.com/blog/categorie/${category.slug}`,
            },
            { "@type": "ListItem", position: 4, name: post.title, item: canonicalUrl },
          ]
        : [{ "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl }]),
    ],
  };

  const faqSchema =
    enriched.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: enriched.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <div>
      <Helmet>
        <title>{post.title} | SupremEnergies</title>
        <meta name="description" content={desc} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="fr-FR" href={canonicalUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={post.image_src} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="SupremEnergies" />
        <meta property="article:published_time" content={post.published_at} />
        <meta property="article:modified_time" content={post.updated_at || post.published_at} />
        {category && <meta property="article:section" content={category.name} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={post.image_src} />
        <meta name="twitter:site" content="@supremenergies" />
        <script type="application/ld+json">{JSON.stringify(blogPostSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={post.image_src}
          alt={post.title}
          width={1600}
          height={800}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container-custom">
            <Link
              to="/blog"
              className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au blog
            </Link>
            {category && (
              <Link
                to={`/blog/categorie/${category.slug}`}
                className="inline-flex items-center gap-1.5 bg-supreme-accent/95 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 hover:bg-supreme-accent transition"
              >
                <Tag className="h-3 w-3" /> {category.name}
              </Link>
            )}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-white/90 mt-4 gap-x-6 gap-y-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          ...(category ? [{ label: category.name, href: `/blog/categorie/${category.slug}` }] : []),
          { label: post.title },
        ]}
      />

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <BlogClusterNav currentTitle={post.title} currentSlug={post.slug} />

            {/* Table des matières */}
            {enriched.headings.length >= 3 && (
              <nav
                aria-label="Sommaire de l'article"
                className="bg-supreme-light/50 border border-supreme-primary/20 rounded-xl p-5 mb-8"
              >
                <p className="font-semibold text-supreme-primary mb-3 text-sm uppercase tracking-wider">
                  Sommaire
                </p>
                <ol className="space-y-1.5 text-sm list-decimal list-inside">
                  {enriched.headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="text-gray-800 hover:text-supreme-primary hover:underline"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div
              className="prose prose-lg max-w-none prose-headings:text-supreme-dark prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:scroll-mt-24 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-supreme-dark prose-a:text-supreme-primary hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: enriched.html }}
            />

            {/* Lead magnet PDF */}
            <div className="mt-10">
              <LeadMagnetForm
                source={`blog_${post.slug}`}
                title="Vous aimez ce contenu ? Recevez le Guide Aides 2026"
                subtitle="Le PDF complet avec barèmes, plafonds et exemples chiffrés."
                compact
              />
            </div>

            {/* CTA final */}
            <div className="mt-8 p-8 bg-supreme-light rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-3">🏡 Besoin d'un conseil personnalisé ?</h3>
              <p className="text-gray-700 mb-6">
                Nos experts SupremEnergies vous accompagnent de A à Z dans vos travaux de rénovation
                énergétique. Bénéficiez d'un diagnostic gratuit !
              </p>
              <Button
                asChild
                className="bg-supreme-primary hover:bg-supreme-primary/90 text-white px-8 py-3 rounded-lg mb-3"
              >
                <Link to={`/devis-gratuit?from=blog_${post.slug}`}>📋 Demander un devis gratuit</Link>
              </Button>
              <p className="text-gray-600 text-sm mt-2">
                Ou appelez-nous au{" "}
                <a
                  href="tel:+33186046889"
                  className="text-supreme-primary font-semibold hover:underline"
                >
                  01 86 04 68 89
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices title="Nos services associés" />

      <RelatedZones
        title="Nos zones d'intervention"
        subtitle="Nous accompagnons les particuliers dans toute l'Île-de-France pour leur rénovation énergétique."
      />

      {/* Related Posts (même catégorie en priorité) */}
      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
              {category ? (
                <>
                  Autres articles <span className="text-supreme-primary">{category.name}</span>
                </>
              ) : (
                <>
                  Articles <span className="text-supreme-primary">similaires</span>
                </>
              )}
            </h2>
            {category && (
              <p className="text-center mb-8">
                <Link
                  to={`/blog/categorie/${category.slug}`}
                  className="text-sm text-supreme-primary hover:underline"
                >
                  Voir tous les articles de la catégorie →
                </Link>
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relPost) => (
                <BlogCard
                  key={relPost.id}
                  id={relPost.slug}
                  title={relPost.title}
                  excerpt={relPost.excerpt}
                  date={formatDate(relPost.published_at)}
                  author={relPost.author}
                  imageSrc={relPost.image_src}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
