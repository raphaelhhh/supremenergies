// Edge function: fetches Google reviews for SupremEnergies via Places API (New)
// Public endpoint, in-memory cache 1h to save quota
import { corsHeaders } from "@supabase/supabase-js/cors";

// CID extracted from Google Maps URL: 0x7f5305b900359074 = decimal 9174422162624577652
// Place ID is resolved on first call using Places API Text Search, then cached.
const BUSINESS_NAME = "SupremEnergies";
const BUSINESS_LOCATION = "48.9020924,2.4012571"; // lat,lng from the Maps URL

interface CacheEntry {
  expiresAt: number;
  payload: unknown;
}

let placeIdCache: { id: string; expiresAt: number } | null = null;
let reviewsCache: CacheEntry | null = null;

const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * 60 * 60 * 1000;

async function resolvePlaceId(apiKey: string): Promise<string> {
  if (placeIdCache && placeIdCache.expiresAt > Date.now()) {
    return placeIdCache.id;
  }
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
    },
    body: JSON.stringify({
      textQuery: BUSINESS_NAME,
      locationBias: {
        circle: {
          center: { latitude: 48.9020924, longitude: 2.4012571 },
          radius: 500.0,
        },
      },
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Place search failed [${res.status}]: ${t}`);
  }
  const data = await res.json();
  const id = data?.places?.[0]?.id;
  if (!id) throw new Error("No Place ID found for SupremEnergies");
  placeIdCache = { id, expiresAt: Date.now() + ONE_DAY };
  return id;
}

async function fetchPlaceDetails(apiKey: string, placeId: string) {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}?languageCode=fr`,
    {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
      },
    },
  );
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Place details failed [${res.status}]: ${t}`);
  }
  return await res.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) throw new Error("GOOGLE_PLACES_API_KEY is not configured");

    if (reviewsCache && reviewsCache.expiresAt > Date.now()) {
      return new Response(
        JSON.stringify({ ...(reviewsCache.payload as object), cached: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const placeId = await resolvePlaceId(apiKey);
    const details = await fetchPlaceDetails(apiKey, placeId);

    const reviews = (details.reviews || []).map((r: any) => ({
      author: r.authorAttribution?.displayName || "Client Google",
      photo: r.authorAttribution?.photoUri || null,
      rating: r.rating || 5,
      text: r.text?.text || r.originalText?.text || "",
      relativeTime: r.relativePublishTimeDescription || "",
      publishTime: r.publishTime || null,
    }));

    const payload = {
      placeId,
      name: details.displayName?.text || BUSINESS_NAME,
      rating: details.rating || null,
      totalReviews: details.userRatingCount || reviews.length,
      googleMapsUri: details.googleMapsUri || null,
      reviews,
    };

    reviewsCache = { expiresAt: Date.now() + ONE_HOUR, payload };

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("google-reviews error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
