import React from "react";
import { CookingPot } from "lucide-react";

const Step_0_Start: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-8 max-w-2xl">
      {/* Title */}
      <h1 className="text-5xl font-bold tracking-tight text-slate-800">
        SoloChef <span className="text-orange-500">OS</span>
      </h1>

      {/* SubTitle */}
      <p className="text-lg leading-relaxed text-slate-600">
        考える手間ゼロ。
        <br />
        あなたのためのレシピをご提案いたします。
      </p>

      {/* Start Button */}
      <button
        type="button"
        onClick={() => console.log("Start")}
        className="flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-orange-600 hover:shadow-md active:bg-orange-700"
      >
        <CookingPot className="h-5 w-5" strokeWidth={2} />
        はじめる
      </button>
    </div>
  );
};

export default Step_0_Start;
