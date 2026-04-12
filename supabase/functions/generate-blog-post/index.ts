import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.103.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TOPICS = [
  {
    theme: "MaPrimeRénov'",
    keywords: ["MaPrimeRénov'", "aides rénovation", "subventions", "prime énergie"],
    angle: "Actualité et évolutions de MaPrimeRénov' : nouveaux barèmes, conditions d'éligibilité, démarches à suivre."
  },
  {
    theme: "Certificats d'Économies d'Énergie (CEE)",
    keywords: ["CEE", "certificats économies énergie", "prime énergie", "fournisseurs énergie"],
    angle: "Comment fonctionnent les CEE, comment en bénéficier et les cumuler avec d'autres aides."
  },
  {
    theme: "Pompe à chaleur",
    keywords: ["pompe à chaleur", "PAC", "chauffage", "COP", "air/eau"],
    angle: "Conseils techniques sur les pompes à chaleur : choix, entretien, performance, innovations."
  },
  {
    theme: "Isolation thermique",
    keywords: ["isolation", "ITE", "ITI", "combles", "thermique"],
    angle: "Techniques d'isolation, matériaux innovants, retours d'expérience et bonnes pratiques."
  },
  {
    theme: "Panneaux solaires photovoltaïques",
    keywords: ["panneaux solaires", "photovoltaïque", "autoconsommation", "énergie solaire"],
    angle: "Rendement, nouvelles technologies, rentabilité et réglementations des installations solaires."
  },
  {
    theme: "DPE et réglementation",
    keywords: ["DPE", "diagnostic performance énergétique", "RE2020", "passoire thermique"],
    angle: "Évolution du DPE, interdictions de location, obligations légales et impact sur l'immobilier."
  },
  {
    theme: "Rénovation globale",
    keywords: ["rénovation globale", "bouquet travaux", "performance énergétique"],
    angle: "Avantages d'une approche globale, retours d'expérience, aides spécifiques."
  },
  {
    theme: "Chauffe-eau thermodynamique",
    keywords: ["chauffe-eau thermodynamique", "eau chaude sanitaire", "ballon thermodynamique"],
    angle: "Technologies, installation, économies et aides pour le chauffe-eau thermodynamique."
  },
  {
    theme: "VMC et ventilation",
    keywords: ["VMC", "ventilation", "qualité air", "double flux"],
    angle: "Importance de la ventilation, types de VMC, lien avec l'isolation et la qualité de l'air."
  },
  {
    theme: "Éco-PTZ et financement",
    keywords: ["éco-PTZ", "financement", "prêt travaux", "crédit rénovation"],
    angle: "Solutions de financement pour la rénovation : éco-PTZ, prêts aidés, tiers-financement."
  },
  {
    theme: "Fenêtres et menuiseries",
    keywords: ["fenêtres", "double vitrage", "triple vitrage", "menuiseries"],
    angle: "Remplacement de fenêtres : matériaux, performances, aides et retour sur investissement."
  },
  {
    theme: "Audit énergétique",
    keywords: ["audit énergétique", "bilan thermique", "diagnostic", "travaux prioritaires"],
    angle: "Pourquoi et comment réaliser un audit énergétique avant de rénover."
  }
];

const UNSPLASH_IMAGES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1172&q=80",
  "https://images.unsplash.com/photo-1643756055617-608c1492f932?auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1172&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1174&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1473742254-91939c5d5765?auto=format&fit=crop&w=1170&q=80",
];

const DEVIS_URL = "https://docs.google.com/forms/d/e/1FAIpQLScnhgMR8AwvJG2UkAibutS6EHPI-a-lLnFNqjtOdlpsrBXBcQ/viewform";
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

    // Get existing post titles to avoid duplicates
    const { data: existingPosts } = await supabase
      .from("blog_posts")
      .select("title, slug")
      .order("published_at", { ascending: false });

    const existingTitles = (existingPosts || []).map(p => p.title.toLowerCase());
    const existingSlugs = (existingPosts || []).map(p => p.slug);

    // Pick a topic that hasn't been covered recently
    const recentThemes = existingTitles.join(" ");
    const availableTopics = TOPICS.filter(t => 
      !recentThemes.includes(t.theme.toLowerCase().slice(0, 15))
    );
    const topic = availableTopics.length > 0 
      ? availableTopics[Math.floor(Math.random() * availableTopics.length)]
      : TOPICS[Math.floor(Math.random() * TOPICS.length)];

    // Step 1: Web research on the chosen topic
    console.log(`Researching topic: ${topic.theme}`);
    const webResearch = await searchWeb(
      `rénovation énergétique ${topic.theme} actualité 2026`,
      LOVABLE_API_KEY
    );
    console.log(`Research completed, got ${webResearch.length} chars of context`);

    const systemPrompt = `Tu es un rédacteur web expert en rénovation énergétique pour SupremEnergies, une entreprise française spécialisée en isolation thermique, pompes à chaleur, panneaux solaires et rénovation globale en Île-de-France.

Rédige un article de blog complet et professionnel (800-1200 mots) sur le sujet donné.

Règles :
- Ton professionnel mais accessible, pas de jargon excessif
- Structure avec des H2 et H3 bien hiérarchisés
- Inclure des listes à puces pour les points clés
- Intégrer naturellement les mots-clés SEO fournis
- Contenu factuel et à jour pour 2026, en t'appuyant sur les informations d'actualité fournies
- Format : HTML valide (p, h2, h3, ul, li, ol, strong)
- NE PAS inclure de balise h1 (le titre est géré séparément)
- NE PAS inclure de balises html, head, body
- OBLIGATOIRE : Termine l'article par un encadré d'appel à l'action HTML avec ce format exact :
  <div style="background: linear-gradient(135deg, #e8f5e9 0%, #fff8e1 100%); border-radius: 16px; padding: 32px; text-align: center; margin-top: 40px; border: 1px solid #c8e6c9;">
    <h3 style="color: #2e7d32; margin-bottom: 12px;">🏡 Vous avez un projet de rénovation énergétique ?</h3>
    <p style="color: #555; margin-bottom: 20px;">Les experts SupremEnergies vous accompagnent de A à Z dans vos travaux. Bénéficiez d'un diagnostic gratuit et d'un devis personnalisé.</p>
    <a href="${DEVIS_URL}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #2e7d32; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-bottom: 12px;">📋 Demander un devis gratuit</a>
    <p style="color: #777; margin-top: 12px;">Ou appelez-nous au <a href="tel:+33186046889" style="color: #2e7d32; font-weight: bold;">${PHONE}</a></p>
  </div>

Réponds avec un JSON contenant exactement ces champs :
- title: titre accrocheur et SEO-friendly (max 70 caractères)
- excerpt: résumé engageant (max 160 caractères)  
- meta_description: description SEO optimisée (max 155 caractères)
- content: contenu HTML de l'article (incluant le CTA final)`;

    const researchContext = webResearch 
      ? `\n\nContexte d'actualité récente (utilise ces informations pour rendre l'article pertinent et à jour) :\n${webResearch}`
      : "";

    const userPrompt = `Rédige un article sur : "${topic.theme}"
Angle : ${topic.angle}
Mots-clés à intégrer : ${topic.keywords.join(", ")}
Articles existants (à ne pas dupliquer) : ${existingTitles.slice(0, 5).join(", ")}${researchContext}`;

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

    // Pick an image
    const imageIndex = Math.floor(Math.random() * UNSPLASH_IMAGES.length);

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
        image_src: UNSPLASH_IMAGES[imageIndex],
        published: true,
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error(`Failed to insert blog post: ${insertError.message}`);
    }

    console.log(`Blog post generated: "${article.title}" (slug: ${slug})`);

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
