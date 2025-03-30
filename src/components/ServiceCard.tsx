
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  className?: string;
}

const ServiceCard = ({
  title,
  description,
  icon,
  link,
  className,
}: ServiceCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-100",
        className
      )}
    >
      <div className="h-14 w-14 rounded-full bg-supreme-light flex items-center justify-center mb-5 text-supreme-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-5">{description}</p>
      <Link 
        to={link}
        className="inline-flex items-center text-supreme-primary font-medium hover:underline group-hover:translate-x-1 transition-transform duration-300"
      >
        En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
};

export default ServiceCard;
