import React from "react";
import { ChefHat } from "lucide-react";

const GeneratingLoading: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-6">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Indicator Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
          <ChefHat
            className="h-8 w-8 text-orange-500 animate-pulse"
            strokeWidth={2}
          />
        </div>

        {/* Text */}
        <p className="text-lg text-slate-600">
          SoloChef OS が
          <br />
          レシピを考えています...
        </p>

        {/* Countdown */}
        <span className="text-xs font-medium text-slate-400">( 5s )</span>
      </div>
    </div>
  );
};

export default GeneratingLoading;
