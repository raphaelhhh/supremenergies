import { useEffect, useState, type PointerEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Star, Quote, MapPin, ExternalLink } from "lucide-react";
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

interface GoogleReview {
  author: string;
  photo: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string | null;
}

interface GoogleReviewsPayload {
  placeId?: string;
  name: string;
  rating: number | null;
  totalReviews: number;
  googleMapsUri: string | null;
  reviews: GoogleReview[];
}

const GOOGLE_PLACE_ID = "ChIJ97OFox-lXgERdJA1ALkFU38";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=SupremEnergies%2055%20rue%20Cartier%20Bresson%2093500%20Pantin&query_place_id=${GOOGLE_PLACE_ID}`;
const GOOGLE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

const Temoignages = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [google, setGoogle] = useState<GoogleReviewsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [{ data: testimonials }, googleRes] = await Promise.all([
        supabase
          .from("testimonials")
          .select("id,name,city,service,content,rating,savings,photo_url")
          .eq("published", true)
          .order("display_order", { ascending: true }),
        supabase.functions.invoke<GoogleReviewsPayload>("google-reviews"),
      ]);
      setItems(testimonials || []);
      if (googleRes.data && !("error" in googleRes.data)) {
        setGoogle(googleRes.data);
      }
      setLoading(false);
    };
    load();
  }, []);

  const googleRating = google?.rating ?? 5;
  const googleCount = google?.totalReviews ?? 0;
  const internalAvg =
    items.length > 0
      ? items.reduce((s, t) => s + t.rating, 0) / items.length
      : 5;
  const totalCount = googleCount + items.length;
  const blendedRating =
    totalCount > 0
      ? (
          (googleRating * googleCount + internalAvg * items.length) /
          totalCount
        ).toFixed(1)
      : "5.0";

  const viewUrl = google?.googleMapsUri || GOOGLE_MAPS_URL;
  const writeReviewUrl = GOOGLE_REVIEW_URL;
  const displayCount = totalCount || items.length;

  const forceGoogleNavigation = (url: string) => (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    event.stopPropagation();

    try {
      window.top?.location.assign(url);
      return;
    } catch {
      window.location.assign(url);
    }
  };

  const aggregateSchema = displayCount
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
          ratingValue: blendedRating,
          reviewCount: displayCount,
          bestRating: "5",
          worstRating: "1",
        },
        review: [
          ...(google?.reviews || []).slice(0, 5).map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: "5",
            },
            reviewBody: r.text,
            datePublished: r.publishTime,
          })),
          ...items.slice(0, 5).map((t) => ({
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
        ],
      }
    : null;

  const title = "Témoignages clients SupremEnergies | Avis Google rénovation énergétique";
  const description = `Découvrez ${displayCount || "nos"} avis clients (Google + témoignages) en Île-de-France : pompes à chaleur, isolation, panneaux solaires. Note moyenne ${blendedRating}/5.`;

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

      <section className="bg-gradient-to-br from-supreme-primary to-supreme-primary/90 text-white pt-32 pb-12">
        <div className="container-custom">
          <div className="[&_nav]:py-0 [&_nav]:text-white/80 [&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/80">
            <Breadcrumb items={[{ label: "Témoignages" }]} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-3 text-white drop-shadow-sm">
            Ils ont fait confiance à SupremEnergies
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/95">
              <strong>{blendedRating}/5</strong> sur {displayCount} avis vérifiés
            </span>
            {google && (
              <a
                href={viewUrl}
                onPointerDownCapture={forceGoogleNavigation(viewUrl)}
                className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer"
              >
                Voir sur Google <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Google Reviews block */}
      {google && google.reviews.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
                  alt="Google"
                  className="w-7 h-7"
                  loading="lazy"
                />
                <h2 className="text-2xl font-bold text-gray-900">
                  Avis Google récents
                </h2>
                <span className="text-sm text-gray-600">
                  ({google.rating}/5 · {google.totalReviews} avis)
                </span>
              </div>
              {google && (
                <a
                  href={writeReviewUrl}
                  onPointerDownCapture={forceGoogleNavigation(writeReviewUrl)}
                  className="text-supreme-primary hover:underline text-sm font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  Laisser un avis <ExternalLink size={14} />
                </a>
              )}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {google.reviews.map((r, idx) => (
                <article
                  key={idx}
                  className="bg-gray-50 rounded-xl border border-gray-100 p-6 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {r.photo ? (
                      <img
                        src={r.photo}
                        alt={r.author}
                        className="w-10 h-10 rounded-full object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-supreme-primary/15 text-supreme-primary flex items-center justify-center font-semibold">
                        {r.author.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 truncate">{r.author}</div>
                      <div className="text-xs text-gray-500">{r.relativeTime}</div>
                    </div>
                    <img
                      src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
                      alt=""
                      className="w-4 h-4 opacity-70"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex mb-3">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm whitespace-pre-line">{r.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Internal testimonials */}
      {items.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Témoignages détaillés de nos chantiers
            </h2>
            {loading ? (
              <p className="text-center text-gray-500">Chargement…</p>
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
      )}

      <CTA
        title="Rejoignez nos clients satisfaits"
        subtitle="Devis gratuit, accompagnement aides, chantier clé en main partout en Île-de-France."
      />
    </div>
  );
};

export default Temoignages;
