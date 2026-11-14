import { Link } from "react-router-dom";
import SeoMeta from "./SeoMeta";
import type { ReactNode } from "react";

export default function LegalPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return <section className="bg-supreme-light pt-28 pb-16">
    <SeoMeta title={`${title} | SupremEnergies`} description={`${title} du site SupremEnergies et des prestations de rénovation énergétique.`} canonical={path} robots="noindex, follow" />
    <div className="container-custom max-w-4xl">
      <Link to="/" className="text-supreme-primary underline">Retour à l’accueil</Link>
      <h1 className="text-3xl md:text-4xl mt-7 mb-5">{title}</h1>
      <p className="text-sm text-muted-foreground mb-8">Version du 12 novembre 2026</p>
      <div className="prose max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-supreme-primary">{children}</div>
    </div>
  </section>;
}