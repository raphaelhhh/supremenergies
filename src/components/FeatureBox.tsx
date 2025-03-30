
import { cn } from "@/lib/utils";

interface FeatureBoxProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

const FeatureBox = ({
  title,
  description,
  icon,
  className,
  iconClassName,
}: FeatureBoxProps) => {
  return (
    <div className={cn(
      "p-8 flex flex-col items-center text-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300",
      className
    )}>
      <div className={cn(
        "mb-6 rounded-full bg-supreme-light w-16 h-16 flex items-center justify-center text-supreme-primary",
        iconClassName
      )}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureBox;
