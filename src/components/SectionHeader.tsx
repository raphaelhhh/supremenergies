
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  highlightedWord?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  centered = true,
  className,
  titleClassName,
  subtitleClassName,
  highlightedWord,
}: SectionHeaderProps) => {
  // Function to highlight a word in the title
  const renderTitle = () => {
    if (!highlightedWord || !title.includes(highlightedWord)) {
      return title;
    }
    
    const parts = title.split(highlightedWord);
    return (
      <>
        {parts[0]}
        <span className="text-supreme-primary">{highlightedWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={cn(
      "mb-12",
      centered && "text-center",
      className
    )}>
      <h2 className={cn(
        "text-3xl md:text-4xl font-bold mb-4",
        titleClassName
      )}>
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg text-gray-600 max-w-3xl",
          centered && "mx-auto",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
