import { Helmet } from "react-helmet-async";

interface SeoMetaProps {
  title: string;
  description: string;
  /** chemin relatif (ex: "/services") OU url absolue */
  canonical: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  /** ex: "noindex, follow" */
  robots?: string;
  /** url image (override og:image) — par défaut celle d'OG */
  twitterImage?: string;
  /** Date ISO pour articles */
  publishedTime?: string;
  modifiedTime?: string;
}

const SITE_URL = "https://supremenergies.com";
const DEFAULT_OG = `${SITE_URL}/og-image.jpg`;

/**
 * Composant SEO unifié : title, description, canonical, OG, Twitter, robots, hreflang.
 * À utiliser sur chaque page. Les JSON-LD restent injectés séparément via <Helmet>.
 */
const SeoMeta = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG,
  ogType = "website",
  robots = "index, follow",
  twitterImage,
  publishedTime,
  modifiedTime,
}: SeoMetaProps) => {
  const url = canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical}`;
  const tImg = twitterImage || ogImage;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="fr-FR" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="SupremEnergies" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={tImg} />
      <meta name="twitter:site" content="@supremenergies" />
    </Helmet>
  );
};

export default SeoMeta;
