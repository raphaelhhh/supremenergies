
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/BlogCard";
import Breadcrumb from "@/components/Breadcrumb";
import RelatedServices from "@/components/RelatedServices";
import { supabase } from "@/integrations/supabase/client";

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

  const { data: relatedPosts = [] } = useQuery({
    queryKey: ["related-posts", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, author, image_src, published_at")
        .eq("published", true)
        .neq("slug", id)
        .order("published_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!isLoading && !post) {
      navigate("/blog");
    }
    window.scrollTo(0, 0);
  }, [post, isLoading, navigate]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Chargement...</p>
      </div>
    );
  }

  if (!post) return null;

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.meta_description || post.excerpt,
    "image": post.image_src,
    "datePublished": post.published_at,
    "dateModified": post.updated_at || post.published_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://supremenergies.com/blog/${post.slug}`
    },
    "author": {
      "@type": "Organization",
      "name": "SupremEnergies",
      "url": "https://supremenergies.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SupremEnergies",
      "url": "https://supremenergies.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://supremenergies.com/favicon.png"
      }
    }
  };

  const canonicalUrl = `https://supremenergies.com/blog/${post.slug}`;
  const desc = post.meta_description || post.excerpt;

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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={post.image_src} />
        <meta name="twitter:site" content="@supremenergies" />
        <script type="application/ld+json">
          {JSON.stringify(blogPostSchema)}
        </script>
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
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au blog
            </Link>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl">
              {post.title}
            </h1>
            <div className="flex items-center text-white/80 mt-4 space-x-6">
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
          { label: post.title },
        ]}
      />

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-supreme-dark prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-supreme-dark prose-a:text-supreme-primary hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-12 p-8 bg-supreme-light rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-3">🏡 Besoin d'un conseil personnalisé ?</h3>
              <p className="text-gray-600 mb-6">
                Nos experts SupremEnergies vous accompagnent de A à Z dans vos travaux de rénovation énergétique. Bénéficiez d'un diagnostic gratuit !
              </p>
              <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90 text-white px-8 py-3 rounded-lg mb-3">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScnhgMR8AwvJG2UkAibutS6EHPI-a-lLnFNqjtOdlpsrBXBcQ/viewform" target="_blank" rel="noopener noreferrer">📋 Demander un devis gratuit</a>
              </Button>
              <p className="text-gray-500 text-sm mt-2">
                Ou appelez-nous au <a href="tel:+33186046889" className="text-supreme-primary font-semibold hover:underline">01 86 04 68 89</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services associés (maillage interne SEO) */}
      <RelatedServices title="Nos services associés" />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Articles <span className="text-supreme-primary">similaires</span>
            </h2>
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
