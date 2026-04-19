import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const SITE_URL = "https://supremenergies.com";

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const allItems: BreadcrumbItem[] = [{ label: "Accueil", href: "/" }, ...items];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <nav
        aria-label="Fil d'Ariane"
        className="container-custom py-4 text-sm text-gray-600"
      >
        <ol className="flex items-center flex-wrap gap-1">
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            return (
              <li key={idx} className="flex items-center">
                {idx === 0 && <Home className="h-3 w-3 mr-1" />}
                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    className="hover:text-supreme-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-supreme-dark font-medium" : ""}>
                    {item.label}
                  </span>
                )}
                {!isLast && <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
