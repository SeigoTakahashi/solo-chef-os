import React from "react";
import { Refrigerator, Dices, ArrowRight } from "lucide-react";

const Step_1: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-2xl flex flex-col items-center space-y-10">
        {/* Progress Bar */}
        <div className="flex items-center gap-2 self-start">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
            <div className="h-0.5 w-10 bg-orange-500" />
            <div className="h-2.5 w-2.5 rounded-full border-2 border-slate-200 bg-white" />
          </div>
          <span className="ml-2 text-sm font-medium text-slate-500">
            Step 1/2
          </span>
        </div>

        {/* Question */}
        <h2 className="text-lg font-semibold text-center text-slate-800">
          どちらのモードでレシピを作りますか？
        </h2>

        {/* Option Cards */}
        <div className="w-full flex flex-col md:flex-row gap-4">
          {/* Option A */}
          <button
            type="button"
            className="flex-1 flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all duration-200 hover:border-orange-500 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
              <Refrigerator
                className="h-6 w-6 text-orange-500"
                strokeWidth={2}
              />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              A. あるもの生成
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              冷蔵庫にある食材をカンタン入力
            </p>
          </button>

          {/* Option B */}
          <button
            type="button"
            className="flex-1 flex flex-col items-start gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all duration-200 hover:border-orange-500 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
              <Dices className="h-6 w-6 text-orange-500" strokeWidth={2} />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              B. おまかせ生成
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              食材を決めず、AIにお任せ
            </p>
          </button>
        </div>

        {/* Next Button */}
        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={() => console.log("Next")}
            className="flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-orange-600 hover:shadow-md active:bg-orange-700"
          >
            次へ
            <ArrowRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step_1;
