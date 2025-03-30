
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageSrc: string;
  className?: string;
}

const BlogCard = ({
  id,
  title,
  excerpt,
  date,
  author,
  imageSrc,
  className,
}: BlogCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col",
        className
      )}
    >
      <Link to={`/blog/${id}`} className="block overflow-hidden h-48">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{author}</span>
          </div>
        </div>
        <Link to={`/blog/${id}`} className="block">
          <h3 className="text-xl font-semibold mb-3 hover:text-supreme-primary transition-colors">{title}</h3>
        </Link>
        <p className="text-gray-600 mb-5 flex-grow">{excerpt}</p>
        <Link
          to={`/blog/${id}`}
          className="text-supreme-primary font-medium hover:underline inline-flex items-center"
        >
          Lire la suite
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
