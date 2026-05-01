import { Helmet } from "react-helmet-async";

interface Crumb {
  name: string;
  url: string;
}

interface Props {
  items: Crumb[];
}

/**
 * Injecte un JSON-LD BreadcrumbList pour le SEO (rich snippets Google).
 * Usage : <SeoBreadcrumb items={[{name:"Accueil", url:"/"}, {name:"Services", url:"/services"}]} />
 */
const SeoBreadcrumb = ({ items }: Props) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `https://supremenergies.com${item.url}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default SeoBreadcrumb;
