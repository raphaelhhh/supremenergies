import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Star, Quote, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Breadcrumb from "@/components/Breadcrumb";
import CTA from "@/components/CTA";

interface Testimonial {
  id: string;
  name: string;
  city: string;
  service: string;
  content: string;
  rating: number;
  savings: string | null;
  photo_url: string | null;
}

const Temoignages = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("id,name,city,service,content,rating,savings,photo_url")
        .eq("published", true)
        .order("display_order", { ascending: true });
      setItems(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const avgRating =
    items.length > 0
      ? (items.reduce((s, t) => s + t.rating, 0) / items.length).toFixed(1)
      : "5.0";

  const aggregateSchema = items.length
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "SupremEnergies",
        telephone: "01 86 04 68 89",
        url: "https://supremenergies.com",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Île-de-France",
          addressCountry: "FR",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: avgRating,
          reviewCount: items.length,
          bestRating: "5",
          worstRating: "1",
        },
        review: items.slice(0, 10).map((t) => ({
          "@type": "Review",
          author: { "@type": "Person", name: t.name },
          reviewRating: {
            "@type": "Rating",
            ratingValue: t.rating,
            bestRating: "5",
          },
          reviewBody: t.content,
          itemReviewed: { "@type": "Service", name: t.service },
        })),
      }
    : null;

  const title = "Témoignages clients SupremEnergies | Avis rénovation énergétique";
  const description = `Découvrez ${items.length || "nos"} témoignages de clients satisfaits en Île-de-France : pompes à chaleur, isolation, panneaux solaires. Note moyenne ${avgRating}/5.`;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://supremenergies.com/temoignages" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {aggregateSchema && (
          <script type="application/ld+json">{JSON.stringify(aggregateSchema)}</script>
        )}
      </Helmet>

      <section className="bg-gradient-to-br from-supreme-primary to-supreme-primary/80 text-white py-12">
        <div className="container-custom">
          <Breadcrumb items={[{ label: "Témoignages" }]} />
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3">
            Ils ont fait confiance à SupremEnergies
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/90">
              <strong>{avgRating}/5</strong> sur {items.length} avis clients
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          {loading ? (
            <p className="text-center text-gray-500">Chargement des témoignages…</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((t) => (
                <article
                  key={t.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col"
                >
                  <Quote className="text-supreme-primary mb-3" size={24} />
                  <div className="flex mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic flex-1">« {t.content} »</p>
                  {t.savings && (
                    <div className="bg-supreme-primary/5 text-supreme-primary text-sm font-semibold px-3 py-2 rounded-lg mb-3">
                      💡 Économies : {t.savings}
                    </div>
                  )}
                  <div className="border-t border-gray-100 pt-3 mt-auto">
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin size={14} /> {t.city} · {t.service}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA
        title="Rejoignez nos clients satisfaits"
        subtitle="Devis gratuit, accompagnement aides, chantier clé en main partout en Île-de-France."
      />
    </div>
  );
};

export default Temoignages;
