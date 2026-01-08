import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  className?: string;
  imageUrl?: string;
}

const ServiceCard = ({
  title,
  description,
  icon,
  link,
  className,
  imageUrl,
}: ServiceCardProps) => {
  const handleServiceClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'ServiceClick', {
        service_name: title,
        service_link: link
      });
    }
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-lg overflow-hidden transition-all duration-300 group hover:shadow-xl border border-gray-100",
        className
      )}
    >
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <div className="h-14 w-14 rounded-full bg-supreme-light flex items-center justify-center mb-5 text-supreme-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-5">{description}</p>
        <Link 
          to={link}
          onClick={handleServiceClick}
          className="inline-flex items-center text-supreme-primary font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300"
        >
          En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
