
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role?: string;
  testimonial: string;
  rating: number;
  imageSrc?: string;
  className?: string;
}

const TestimonialCard = ({
  name,
  role,
  testimonial,
  rating,
  imageSrc,
  className,
}: TestimonialCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white p-6 rounded-lg shadow-md border border-gray-100",
        className
      )}
    >
      <div className="flex items-center space-x-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="mb-6 text-gray-700 italic">"{testimonial}"</p>
      <div className="flex items-center">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        )}
        {!imageSrc && (
          <div className="w-12 h-12 rounded-full bg-supreme-light flex items-center justify-center text-supreme-primary font-semibold mr-4">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="font-semibold">{name}</h4>
          {role && <p className="text-sm text-gray-600">{role}</p>}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
