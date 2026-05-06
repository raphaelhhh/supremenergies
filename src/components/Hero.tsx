
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface HeroProps {
  title: string;
  subtitle: string;
  features?: string[];
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  imageSrc?: string;
  imageAlt?: string;
  overlay?: boolean;
  className?: string;
}
const Hero = ({
  title,
  subtitle,
  features = ["Économies d'énergie", "Confort thermique", "Solution écologique", "Aides financières"],
  buttonText = "En savoir plus",
  buttonLink = "/services",
  secondaryButtonText = "Demander un devis",
  secondaryButtonLink = "https://docs.google.com/forms/d/e/1FAIpQLScnhgMR8AwvJG2UkAibutS6EHPI-a-lLnFNqjtOdlpsrBXBcQ/viewform?usp=header",
  imageSrc = "/images/energy-label.png",
  imageAlt = "Rénovation énergétique et isolation thermique",
  overlay = true,
  className
}: HeroProps) => {
  return <div className={cn("relative overflow-hidden bg-gradient-to-b from-supreme-light to-white", className)}>
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              {subtitle}
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => <div key={index} className="flex items-center">
                  <div className="rounded-full bg-supreme-primary p-1 mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>)}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-supreme-primary hover:bg-supreme-primary/90 text-white px-6 py-6 rounded-md text-lg">
                <Link to={buttonLink} className="flex items-center gap-2">
                  {buttonText}
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-white hover:bg-gray-100 text-supreme-primary border-supreme-primary px-6 py-6 rounded-md text-lg">
                {secondaryButtonLink.startsWith('http') ? (
                  <a href={secondaryButtonLink} target="_blank" rel="noopener noreferrer">{secondaryButtonText}</a>
                ) : (
                  <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
                )}
              </Button>
            </div>
          </div>

          {/* Image with overlay design */}
          <div className="relative hidden lg:block">
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-supreme-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-8 bottom-0 w-64 h-64 bg-supreme-secondary/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              {(() => {
                // Match optimized hero variants in /images/hero/{name}-{w}.{ext}
                const HERO_BASES = [
                  "energy-label",
                  "hero-isolation-facade",
                  "hero-maison-renovation",
                  "hero-maison-sans-personnes",
                  "hero-renovation-energetique",
                  "hero-renovation-realiste",
                  "renovation-globale-maison",
                ];
                const fileName = imageSrc.split("/").pop()?.split("?")[0] ?? "";
                const baseName = fileName.replace(/\.[a-zA-Z0-9]+$/, "").replace(/-[A-Za-z0-9]{6,}$/, "");
                const matched = HERO_BASES.find((b) => baseName === b || baseName.startsWith(b));
                if (matched) {
                  const widths = matched === "energy-label" || matched === "hero-maison-renovation" || matched === "hero-maison-sans-personnes" || matched === "hero-renovation-realiste" || matched === "renovation-globale-maison"
                    ? [480, 800, 1200].filter((w) => w <= 1200)
                    : [480, 800, 1200, 1600];
                  const buildSet = (ext: string) =>
                    widths.map((w) => `/images/hero/${matched}-${w}.${ext} ${w}w`).join(", ");
                  const sizes = "(min-width: 1024px) 50vw, 100vw";
                  const fallback = `/images/hero/${matched}-${widths.includes(1200) ? 1200 : widths[widths.length - 1]}.jpg`;
                  return (
                    <picture>
                      <source type="image/avif" srcSet={buildSet("avif")} sizes={sizes} />
                      <source type="image/webp" srcSet={buildSet("webp")} sizes={sizes} />
                      <img
                        src={fallback}
                        srcSet={buildSet("jpg")}
                        sizes={sizes}
                        alt={imageAlt}
                        width={1200}
                        height={750}
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                        className="w-full h-[500px] object-cover"
                      />
                    </picture>
                  );
                }
                return (
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    width={800}
                    height={500}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="w-full h-[500px] object-cover"
                  />
                );
              })()}
              {overlay && <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>}
            </div>
            
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-supreme-accent/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-supreme-light rounded-full -translate-x-1/2 blur-3xl opacity-60"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-supreme-light rounded-full translate-x-1/2 blur-3xl opacity-60"></div>
    </div>;
};
export default Hero;
