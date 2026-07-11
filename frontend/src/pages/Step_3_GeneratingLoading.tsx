import React from "react";
import { ChefHat } from "lucide-react";

const Step_3_GeneratingLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 max-w-2xl animate-pulse">
      {/* Indicator Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
        <ChefHat className="h-8 w-8 text-orange-500" strokeWidth={1} />
      </div>

      {/* Text */}
      <p className="text-2xl text-slate-600">
        SoloChef OS が
        <br />
        レシピを考えています...
      </p>
    </div>
  );
};

export default Step_3_GeneratingLoading;
