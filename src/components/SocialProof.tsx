import { useEffect, useState } from "react";
import { Users, Star, ShieldCheck } from "lucide-react";

const SocialProof = () => {
  const [count, setCount] = useState(12);

  useEffect(() => {
    // Pseudo-realistic counter that increments slowly
    const base = 12 + Math.floor((Date.now() / (1000 * 60 * 60 * 6)) % 25);
    setCount(base);
  }, []);

  return (
    <div className="bg-supreme-light/60 border-y border-supreme-primary/10">
      <div className="container-custom py-3">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600"></span>
            </span>
            <span><strong>{count}</strong> demandes de devis ce mois-ci</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span><strong>4.8/5</strong> sur les avis clients</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-supreme-primary" />
            <span><strong>+1000</strong> projets réalisés</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-supreme-primary" />
            <span>Garantie décennale</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
