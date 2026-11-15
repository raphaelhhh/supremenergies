import { useEffect, useState } from "react";
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
  verification_source?: string;
  publication_authorized?: boolean;
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
  const [googleAction, setGoogleAction] = useState<{ title: string; url: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [{ data: testimonials }, googleRes] = await Promise.all([
        supabase
          .from("testimonials")
          .select("id,name,city,service,content,rating,savings,photo_url,verification_source,publication_authorized")
          .eq("published", true)
          .order("display_order", { ascending: true }),
        supabase.functions.invoke<GoogleReviewsPayload>("google-reviews"),
      ]);
      setItems((testimonials || []).filter(t => t.publication_authorized === true && !!t.verification_source));
      if (googleRes.data && !("error" in googleRes.data)) {
        setGoogle(googleRes.data);
      }
      setLoading(false);
    };
    load();
  }, []);

  const displayCount = google?.totalReviews ?? 0;
  const blendedRating = google?.rating?.toFixed(1) ?? null;
  const viewUrl = google?.googleMapsUri || GOOGLE_MAPS_URL;
  const writeReviewUrl = GOOGLE_REVIEW_URL;


  const showGoogleAction = (title: string, url: string) => {
    setCopied(false);
    setGoogleAction({ title, url });
  };

  const copyGoogleUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const openGoogleOutsidePreview = async (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (!newWindow) {
      await copyGoogleUrl(url);
    }
  };

  const title = "Avis clients et témoignages | SupremEnergies";
  const description = "Consultez les avis Google de SupremEnergies et les retours de chantiers dont la source et l’autorisation de publication sont documentées.";
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://supremenergies.com/temoignages" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

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
            {blendedRating && <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>}
            <span className="text-white/95">
              {blendedRating && displayCount > 0 ? <><strong>{blendedRating}/5</strong> sur {displayCount} avis Google</> : "Consultez les avis sur notre fiche Google"}
            </span>
            {(
              <button
                type="button"
                onClick={() => showGoogleAction("Voir SupremEnergies sur Google", viewUrl)}
                className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer"
              >
                Voir sur Google <ExternalLink size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="container-custom py-8 text-muted-foreground"><h2 className="text-xl mb-3">Origine des avis</h2><p>Les avis Google proviennent de la fiche publique Google ; ils ne sont pas mélangés aux témoignages recueillis directement. Google contrôle leur publication selon ses propres règles. SupremEnergies ne prétend pas vérifier chaque achat à partir d’un avis Google. Les témoignages de chantier ne sont affichés que lorsque leur source et l’autorisation de publication sont documentées ; les économies nécessitent des justificatifs distincts.</p></section>
      {/* Google Reviews block */}
      {google && google.reviews.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
                  alt="Logo Google"
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
                <button
                  type="button"
                  data-audience-event="review_click"
                  onClick={() => showGoogleAction("Laisser un avis Google", writeReviewUrl)}
                  className="text-supreme-primary hover:underline text-sm font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  Laisser un avis <ExternalLink size={14} />
                </button>
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

      {googleAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h2 className="mb-2 text-xl font-bold text-gray-900">{googleAction.title}</h2>
            <p className="mb-5 text-sm text-gray-600">
              Le lien Google est prêt. Si votre navigateur bloque l’ouverture automatique, le lien sera copié pour le coller dans un nouvel onglet.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => void openGoogleOutsidePreview(googleAction.url)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-supreme-primary px-4 py-3 text-sm font-semibold text-white hover:bg-supreme-primary/90">
                Ouvrir Google <ExternalLink size={16} />
              </button>
              <button
                type="button"
                onClick={() => void copyGoogleUrl(googleAction.url)}
                className="rounded-md border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              >
                {copied ? "Lien copié" : "Copier le lien"}
              </button>
            </div>
            <button type="button" onClick={() => setGoogleAction(null)} className="mt-4 text-sm font-semibold text-gray-500 hover:text-gray-800">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Temoignages;
