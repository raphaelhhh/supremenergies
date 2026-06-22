import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.103.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Briefs SEO : chaque entrée = un sujet d'article ciblant UN mot-clé long-tail précis.
// Le pipeline pioche dans la liste en évitant les sujets déjà traités récemment.
// category DOIT correspondre à un slug de src/lib/blog-categories.ts.
interface TopicBrief {
  theme: string;
  category: "pompe-a-chaleur" | "isolation" | "panneaux-solaires" | "aides-financieres" | "renovation-globale" | "conseils-pratiques";
  target_keyword: string;
  secondary_keywords: string[];
  search_intent: string;
  image: string;
}

const TOPICS: TopicBrief[] = [
  // --- Aides financières ---
  { theme: "MaPrimeRénov' 2026 : barèmes, plafonds et conditions", category: "aides-financieres",
    target_keyword: "MaPrimeRénov 2026 montant",
    secondary_keywords: ["barème MaPrimeRénov", "plafond revenus MaPrimeRénov", "profil bleu jaune violet rose"],
    search_intent: "L'internaute veut connaître précisément le montant qu'il peut toucher selon ses revenus et ses travaux.",
    image: "/images/blog/maprimenov-aides.jpg" },
  { theme: "Cumuler MaPrimeRénov' et CEE : guide complet 2026", category: "aides-financieres",
    target_keyword: "cumul MaPrimeRénov CEE 2026",
    secondary_keywords: ["prime CEE coup de pouce", "écrêtement aides rénovation", "calcul cumul primes"],
    search_intent: "Comprendre les règles de cumul et le plafond d'écrêtement (100% TTC profil bleu, 90% jaune…).",
    image: "/images/blog/maprimenov-aides.jpg" },
  { theme: "Éco-PTZ 2026 : montant, durée et conditions", category: "aides-financieres",
    target_keyword: "éco PTZ 2026 conditions",
    secondary_keywords: ["prêt à taux zéro travaux", "éco-PTZ banque éligible", "éco-PTZ copropriété"],
    search_intent: "Savoir combien on peut emprunter et auprès de quelles banques.",
    image: "/images/blog/maprimenov-aides.jpg" },

  // --- Pompe à chaleur ---
  { theme: "Prix d'une pompe à chaleur air/eau en 2026 (pose comprise)", category: "pompe-a-chaleur",
    target_keyword: "prix pompe à chaleur air eau 2026",
    secondary_keywords: ["coût installation PAC", "PAC air eau aides", "tarif pompe à chaleur 100m2"],
    search_intent: "Connaître le budget total pose comprise et après aides.",
    image: "/images/blog/pompe-a-chaleur.jpg" },
  { theme: "PAC air/eau vs air/air : laquelle choisir en 2026 ?", category: "pompe-a-chaleur",
    target_keyword: "PAC air eau ou air air",
    secondary_keywords: ["différence pompe à chaleur", "comparatif PAC", "PAC chauffage eau chaude"],
    search_intent: "Aider à choisir le bon type de PAC selon le logement et l'usage.",
    image: "/images/blog/pompe-a-chaleur.jpg" },
  { theme: "Pompe à chaleur géothermique : prix, fonctionnement, rentabilité", category: "pompe-a-chaleur",
    target_keyword: "pompe à chaleur géothermique prix",
    secondary_keywords: ["PAC géothermique installation", "captage horizontal vertical", "géothermie maison individuelle"],
    search_intent: "Comprendre si la géothermie est rentable pour son terrain.",
    image: "/images/blog/pompe-a-chaleur.jpg" },

  // --- Isolation ---
  { theme: "Isolation des combles perdus : prix et aides 2026", category: "isolation",
    target_keyword: "isolation combles perdus prix 2026",
    secondary_keywords: ["isolation combles 1 euro", "soufflage laine de verre", "isolation combles aides"],
    search_intent: "Connaître le coût au m² et les aides disponibles.",
    image: "/images/blog/isolation-thermique.jpg" },
  { theme: "ITE vs ITI : comparatif coût, performance et aides", category: "isolation",
    target_keyword: "ITE ou ITI comparatif",
    secondary_keywords: ["isolation thermique extérieure", "isolation par l'intérieur", "ITE prix m2"],
    search_intent: "Choisir entre isolation extérieure et intérieure.",
    image: "/images/blog/isolation-thermique.jpg" },
  { theme: "VMC double flux : prix, fonctionnement et aides 2026", category: "isolation",
    target_keyword: "VMC double flux prix 2026",
    secondary_keywords: ["installation VMC double flux", "VMC double flux MaPrimeRénov", "ventilation maison BBC"],
    search_intent: "Évaluer le coût et les bénéfices d'une VMC double flux.",
    image: "/images/blog/vmc-ventilation.jpg" },
  { theme: "Remplacer ses fenêtres : double ou triple vitrage en 2026 ?", category: "isolation",
    target_keyword: "double ou triple vitrage 2026",
    secondary_keywords: ["prix fenêtre double vitrage", "isolation acoustique fenêtre", "aide changement fenêtre"],
    search_intent: "Choisir le vitrage adapté et estimer le retour sur investissement.",
    image: "/images/blog/isolation-maison.jpg" },

  // --- Panneaux solaires ---
  { theme: "Rentabilité des panneaux solaires en 2026 : combien ça rapporte ?", category: "panneaux-solaires",
    target_keyword: "rentabilité panneaux solaires 2026",
    secondary_keywords: ["amortissement photovoltaïque", "prix kWc panneaux", "revente surplus EDF OA"],
    search_intent: "Estimer le retour sur investissement réel.",
    image: "/images/blog/panneaux-solaires.jpg" },
  { theme: "Autoconsommation solaire avec batterie : guide 2026", category: "panneaux-solaires",
    target_keyword: "autoconsommation solaire batterie 2026",
    secondary_keywords: ["panneaux solaires stockage", "batterie domestique solaire", "autoconsommation totale"],
    search_intent: "Comprendre si une batterie est rentable en autoconsommation.",
    image: "/images/blog/panneaux-solaires.jpg" },

  // --- Rénovation globale ---
  { theme: "Parcours Accompagné MaPrimeRénov' : conditions et démarches 2026", category: "renovation-globale",
    target_keyword: "MaPrimeRénov Parcours Accompagné 2026",
    secondary_keywords: ["accompagnateur Rénov", "audit énergétique obligatoire", "gain classe DPE"],
    search_intent: "Comprendre comment activer le parcours et trouver un Accompagnateur Rénov'.",
    image: "/images/blog/renovation-globale.jpg" },
  { theme: "Sortir une passoire thermique du DPE F ou G : plan de travaux 2026", category: "renovation-globale",
    target_keyword: "rénover passoire thermique 2026",
    secondary_keywords: ["interdiction location DPE G", "audit énergétique passoire", "gain DPE travaux"],
    search_intent: "Plan d'action pour un propriétaire bailleur ou occupant.",
    image: "/images/blog/dpe-reglementation.jpg" },

  // --- Conseils pratiques ---
  { theme: "Audit énergétique : prix, durée et utilité en 2026", category: "conseils-pratiques",
    target_keyword: "audit énergétique prix 2026",
    secondary_keywords: ["audit énergétique obligatoire", "auditeur agréé", "audit MaPrimeRénov"],
    search_intent: "Savoir combien coûte un audit et à quoi il sert.",
    image: "/images/blog/dpe-reglementation.jpg" },
  { theme: "Chauffe-eau thermodynamique : prix, économies et aides 2026", category: "conseils-pratiques",
    target_keyword: "chauffe-eau thermodynamique prix 2026",
    secondary_keywords: ["ballon thermodynamique aides", "économie chauffe-eau thermodynamique", "installation ballon eau chaude"],
    search_intent: "Évaluer l'intérêt par rapport à un cumulus classique.",
    image: "/images/blog/chauffe-eau.jpg" },
];

const DEVIS_URL = "/devis-gratuit?from=blog_cta";
const PHONE = "01 86 04 68 89";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function searchWeb(query: string, apiKey: string): Promise<string> {
  try {
    // Use Lovable AI to summarize current web info about the topic
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "Tu es un assistant de recherche. Résume les informations les plus récentes et pertinentes sur le sujet donné en rapport avec la rénovation énergétique en France. Inclus les dernières actualités, chiffres, réglementations et tendances de 2025-2026. Sois factuel et concis (300 mots max)."
          },
          {
            role: "user",
            content: `Recherche les dernières actualités et informations sur : "${query}" en France en 2026. Inclus les montants d'aides actuels, les nouvelles réglementations, les évolutions récentes du marché.`
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "web_search",
              description: "Search the web for current information",
              parameters: {
                type: "object",
                properties: {
                  query: { type: "string" }
                },
                required: ["query"]
              }
            }
          }
        ],
      }),
    });

    if (!response.ok) {
      console.error("Web search AI call failed:", response.status);
      return "";
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;
    return content || "";
  } catch (e) {
    console.error("Web search error:", e);
    return "";
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get existing posts to avoid duplicate target_keywords
    const { data: existingPosts } = await supabase
      .from("blog_posts")
      .select("title, slug, target_keyword")
      .order("published_at", { ascending: false });

    const existingTitles = (existingPosts || []).map((p) => p.title.toLowerCase());
    const existingSlugs = (existingPosts || []).map((p) => p.slug);
    const usedKeywords = new Set(
      (existingPosts || []).map((p) => (p.target_keyword || "").toLowerCase()).filter(Boolean),
    );

    // Pick a topic whose target_keyword has not been used yet
    const availableTopics = TOPICS.filter((t) => !usedKeywords.has(t.target_keyword.toLowerCase()));
    const topic =
      availableTopics.length > 0
        ? availableTopics[Math.floor(Math.random() * availableTopics.length)]
        : TOPICS[Math.floor(Math.random() * TOPICS.length)];

    // Step 1: Web research grounded on the target keyword (not just the theme)
    console.log(`Researching topic: ${topic.theme} (kw=${topic.target_keyword})`);
    const webResearch = await searchWeb(
      `${topic.target_keyword} France 2026 actualité réglementation`,
      LOVABLE_API_KEY,
    );
    console.log(`Research completed, got ${webResearch.length} chars of context`);

    const systemPrompt = `Tu es un rédacteur SEO expert en rénovation énergétique pour SupremEnergies (Île-de-France).

Rédige un article SEO long-form de 1200-1500 mots OPTIMISÉ pour le mot-clé principal indiqué.

RÈGLES SEO IMPÉRATIVES :
- Le mot-clé principal DOIT apparaître : dans le titre, dans le premier paragraphe (intro), dans au moins 2 H2, dans la meta description, et 4 à 6 fois dans le corps (densité naturelle ~1%).
- Les mots-clés secondaires doivent être intégrés naturellement dans les H2/H3 et le corps.
- Structure OBLIGATOIRE :
  1. Intro de 80-120 mots qui répond à l'intention de recherche immédiatement (réponse condensée façon featured snippet).
  2. 4 H2 minimum, chacun avec 200-300 mots de contenu et au moins 1 H3 ou liste.
  3. Une section H2 "Questions fréquentes" avec 3-5 paires H3 (question) + paragraphe de réponse de 40-80 mots — utile pour le schema FAQ.
  4. CTA final (encadré ci-dessous).
- Ton professionnel, factuel, chiffré (€ TTC, m², kWh, %).
- Format : HTML valide (p, h2, h3, ul, li, ol, strong, table). PAS de h1.
- Pas de balises html, head, body.
- OBLIGATOIRE : Termine par cet encadré CTA exact :
  <div style="background: linear-gradient(135deg, #e8f5e9 0%, #fff8e1 100%); border-radius: 16px; padding: 32px; text-align: center; margin-top: 40px; border: 1px solid #c8e6c9;">
    <h3 style="color: #2e7d32; margin-bottom: 12px;">🏡 Vous avez un projet de rénovation énergétique ?</h3>
    <p style="color: #555; margin-bottom: 20px;">Les experts SupremEnergies vous accompagnent de A à Z dans vos travaux. Bénéficiez d'un diagnostic gratuit et d'un devis personnalisé.</p>
    <a href="${DEVIS_URL}" style="display: inline-block; background: #2e7d32; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-bottom: 12px;">📋 Demander un devis gratuit</a>
    <p style="color: #777; margin-top: 12px;">Ou appelez-nous au <a href="tel:+33186046889" style="color: #2e7d32; font-weight: bold;">${PHONE}</a></p>
  </div>

Renvoie un JSON avec EXACTEMENT ces champs :
- title : 50-65 caractères, contient le mot-clé principal, accrocheur
- excerpt : 140-160 caractères, contient le mot-clé principal
- meta_description : 145-155 caractères, contient le mot-clé principal + un bénéfice + CTA implicite
- content : le HTML complet (intro + 4 H2 + FAQ + CTA)`;

    const researchContext = webResearch
      ? `\n\nContexte d'actualité (utilise ces faits, dates, chiffres dans l'article) :\n${webResearch}`
      : "";

    const userPrompt = `Sujet : "${topic.theme}"
Catégorie : ${topic.category}
MOT-CLÉ PRINCIPAL (à placer dans titre + intro + H2) : ${topic.target_keyword}
Mots-clés secondaires : ${topic.secondary_keywords.join(", ")}
Intention de recherche : ${topic.search_intent}

Articles déjà publiés (à NE PAS dupliquer) : ${existingTitles.slice(0, 8).join(" | ")}${researchContext}`;

    // Step 2: Generate the article with AI
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_blog_post",
              description: "Create a blog post with structured data",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "SEO-friendly title, max 70 chars" },
                  excerpt: { type: "string", description: "Short summary, max 160 chars" },
                  meta_description: { type: "string", description: "SEO meta description, max 155 chars" },
                  content: { type: "string", description: "Full HTML content of the article including CTA" },
                },
                required: ["title", "excerpt", "meta_description", "content"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "create_blog_post" } },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No tool call in AI response");
    }

    const article = JSON.parse(toolCall.function.arguments);
    
    // Generate slug and ensure uniqueness
    let slug = slugify(article.title);
    let slugSuffix = 0;
    while (existingSlugs.includes(slug)) {
      slugSuffix++;
      slug = `${slugify(article.title)}-${slugSuffix}`;
    }

    // Use the topic's associated image
    const imageSrc = topic.image;

    // Insert into database
    const { data: newPost, error: insertError } = await supabase
      .from("blog_posts")
      .insert({
        title: article.title,
        slug,
        excerpt: article.excerpt,
        content: article.content,
        meta_description: article.meta_description,
        author: "SupremEnergies",
        image_src: imageSrc,
        published: true,
        published_at: new Date().toISOString(),
        category: topic.category,
        target_keyword: topic.target_keyword,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error(`Failed to insert blog post: ${insertError.message}`);
    }

    console.log(`Blog post generated: "${article.title}" (slug: ${slug})`);

    // Notifie les moteurs de recherche (IndexNow + Google/Bing) pour indexation rapide
    const newUrl = `https://supremenergies.com/blog/${slug}`;
    try {
      const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
      if (SUPABASE_URL) {
        await fetch(`${SUPABASE_URL}/functions/v1/notify-search-engines`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            urls: [newUrl, "https://supremenergies.com/blog", "https://supremenergies.com/"],
            pingSitemap: true,
          }),
        });
      }
    } catch (e) {
      console.warn("notify-search-engines failed:", e);
    }

    return new Response(
      JSON.stringify({ success: true, post: { title: newPost.title, slug: newPost.slug } }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("generate-blog-post error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
