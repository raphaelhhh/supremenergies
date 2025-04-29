
import { cn } from "@/lib/utils";

interface FeatureBoxProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
  variant?: "default" | "outlined" | "gradient";
}

const FeatureBox = ({
  title,
  description,
  icon,
  className,
  iconClassName,
  variant = "default",
}: FeatureBoxProps) => {
  return (
    <div className={cn(
      "p-8 flex flex-col items-start transition-all duration-300",
      variant === "default" && "bg-white rounded-lg shadow-sm hover:shadow-md",
      variant === "outlined" && "border border-gray-200 rounded-lg hover:border-supreme-primary/30 hover:bg-supreme-light/10",
      variant === "gradient" && "bg-gradient-to-br from-white to-supreme-light rounded-lg shadow-sm hover:shadow-md",
      className
    )}>
      <div className={cn(
        "mb-6 rounded-full w-16 h-16 flex items-center justify-center",
        variant === "default" && "bg-supreme-light text-supreme-primary",
        variant === "outlined" && "bg-supreme-primary/10 text-supreme-primary",
        variant === "gradient" && "bg-gradient-to-br from-supreme-primary to-supreme-secondary text-white",
        iconClassName
      )}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureBox;
