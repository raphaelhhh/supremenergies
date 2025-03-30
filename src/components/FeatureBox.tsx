
import { cn } from "@/lib/utils";

interface FeatureBoxProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureBox = ({
  title,
  description,
  icon,
  className,
}: FeatureBoxProps) => {
  return (
    <div className={cn("p-6 flex flex-col items-center text-center", className)}>
      <div className="mb-4 text-supreme-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureBox;
