import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { zones, zoneSlugs } from "@/data/zones";
import { serviceCatalog, serviceSlugs } from "@/data/services";
import Breadcrumb from "@/components/Breadcrumb";

interface PostLite { slug: string; title: string }

const PlanDuSite = () => {
  const [posts, setPosts] = useState<PostLite[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("slug,title")
        .eq("published", true)
        .order("published_at", { ascending: false });
      setPosts((data as PostLite[]) || []);
    })();
  }, []);

  const idfZones = zoneSlugs.filter((s) => zones[s]?.region === "idf");
  const hdfZones = zoneSlugs.filter((s) => zones[s]?.region === "hauts-de-france");

  return (
    <div className="bg-white">
      <Helmet>
        <title>Plan du site — SupremEnergies</title>
        <meta name="description" content="Plan complet du site SupremEnergies : services, zones d'intervention, guides et articles sur la rénovation énergétique." />
        <link rel="canonical" href="https://supremenergies.com/plan-du-site" />
      </Helmet>

      <div className="container-custom pt-8">
        <Breadcrumb items={[{ label: "Plan du site" }]} />
      </div>

      <section className="container-custom py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-supreme-dark mb-2">Plan du site</h1>
        <p className="text-gray-600 mb-10">Toutes les pages de SupremEnergies, classées par thème.</p>

        <div className="grid md:grid-cols-2 gap-10">
          <section>
            <h2 className="text-xl font-bold text-supreme-dark mb-3">Pages principales</h2>
            <ul className="space-y-2 text-supreme-primary">
              <li><Link to="/" className="hover:underline">Accueil</Link></li>
              <li><Link to="/about" className="hover:underline">À propos</Link></li>
              <li><Link to="/services" className="hover:underline">Nos services</Link></li>
              <li><Link to="/simulateur-aides" className="hover:underline">Simulateur d'aides MaPrimeRénov'</Link></li>
              <li><Link to="/aides-renovation-2026" className="hover:underline">Aides à la rénovation 2026</Link></li>
              <li><Link to="/pompe-a-chaleur-2026" className="hover:underline">Pompe à chaleur 2026</Link></li>
              <li><Link to="/temoignages" className="hover:underline">Témoignages</Link></li>
              <li><Link to="/blog" className="hover:underline">Blog</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/devis-gratuit" className="hover:underline">Devis gratuit</Link></li>
              <li><Link to="/region/hauts-de-france" className="hover:underline">Région Hauts-de-France</Link></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-supreme-dark mb-3">Services</h2>
            <ul className="space-y-2 text-supreme-primary">
              {serviceSlugs.map((s) => (
                <li key={s}>
                  <Link to={`/services/${s}`} className="hover:underline">
                    {serviceCatalog[s].name}
                  </Link>
                </li>
              ))}

            </ul>
          </section>

          <section className="md:col-span-2">
            <h2 className="text-xl font-bold text-supreme-dark mb-3">Zones d'intervention — Île-de-France</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-supreme-primary">
              {idfZones.map((slug) => (
                <li key={slug}>
                  <Link to={`/zones/${slug}`} className="hover:underline">{zones[slug].name}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="md:col-span-2">
            <h2 className="text-xl font-bold text-supreme-dark mb-3">Zones d'intervention — Hauts-de-France</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-supreme-primary">
              {hdfZones.map((slug) => (
                <li key={slug}>
                  <Link to={`/zones/${slug}`} className="hover:underline">{zones[slug].name}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="md:col-span-2">
            <h2 className="text-xl font-bold text-supreme-dark mb-3">Pages locales — Service × Ville</h2>
            <p className="text-sm text-gray-600 mb-3">Pages dédiées à chaque service dans nos principales zones d'intervention.</p>
            <div className="space-y-6">
              {serviceSlugs.map((svc) => (
                <div key={svc}>
                  <h3 className="font-semibold text-supreme-dark mb-2">{serviceCatalog[svc].name}</h3>
                  <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 text-sm text-supreme-primary">
                    {zoneSlugs.map((z) => (
                      <li key={z}>
                        <Link to={`/services/${svc}/${z}`} className="hover:underline">
                          {serviceCatalog[svc].shortName} à {zones[z].name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            </div>
          </section>

          <section className="md:col-span-2">
            <h2 className="text-xl font-bold text-supreme-dark mb-3">Articles de blog ({posts.length})</h2>
            <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-supreme-primary">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="hover:underline">{p.title}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="md:col-span-2">
            <h2 className="text-xl font-bold text-supreme-dark mb-3">Informations légales</h2>
            <ul className="space-y-2 text-supreme-primary">
              <li><Link to="/mentions-legales" className="hover:underline">Mentions légales</Link></li>
              <li><Link to="/privacy" className="hover:underline">Politique de confidentialité</Link></li>
              <li><Link to="/terms" className="hover:underline">Conditions générales d'utilisation</Link></li>
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
};

export default PlanDuSite;
