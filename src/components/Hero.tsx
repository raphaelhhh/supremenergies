
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
  imageAlt?: string;
  overlay?: boolean;
}

const Hero = ({
  title,
  subtitle,
  buttonText = "En savoir plus",
  buttonLink = "/services",
  imageSrc = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  imageAlt = "Rénovation énergétique",
  overlay = true,
}: HeroProps) => {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        )}
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              asChild 
              className="bg-supreme-primary hover:bg-supreme-primary/90 text-white px-6 py-6 rounded-md text-lg"
            >
              <Link to={buttonLink} className="flex items-center gap-2">
                {buttonText}
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="bg-white hover:bg-gray-100 text-supreme-primary border-supreme-primary px-6 py-6 rounded-md text-lg"
            >
              <Link to="/contact">Demander un devis</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
