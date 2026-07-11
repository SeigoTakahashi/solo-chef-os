import React from "react";
import { ReceiptText, CookingPot, RotateCcw } from "lucide-react";

const Step_4_RecipeResult: React.FC = () => {
  const ingredients = [
    { name: "豚コマ肉", amount: "100g" },
    { name: "ネギ", amount: "適量" },
    { name: "塩ダレ", amount: "大さじ1" },
    { name: "ごま油", amount: "小さじ1" },
  ];

  const steps = [
    "耐熱容器に材料をすべて入れる",
    "塩ダレを回しかける",
    "レンジで5分チンして完成！",
  ];

  return (
    <div className="w-full max-w-md flex flex-col space-y-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <p className="text-sm font-semibold text-orange-500">
          ✨ 本日のサクッと飯
        </p>
        <h1 className="text-2xl font-bold text-slate-800">
          極旨！ネギ塩レンジ豚小町
        </h1>
      </div>

      {/* Recipe Card */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 space-y-6">
        {/* Ingredients */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ReceiptText className="h-4 w-4 text-orange-500" strokeWidth={2} />
            <h2 className="text-sm font-bold text-slate-800">材料</h2>
          </div>
          <ul className="space-y-2">
            {ingredients.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-2 border-b border-dashed border-slate-200 pb-2 text-sm"
              >
                <span className="text-slate-700">{item.name}</span>
                <span className="text-slate-400">{item.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CookingPot className="h-4 w-4 text-orange-500" strokeWidth={2} />
            <h2 className="text-sm font-bold text-slate-800">作り方</h2>
          </div>
          <ol className="space-y-3">
            {steps.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-3 text-sm text-slate-700"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Retry Button */}
      <button
        type="button"
        onClick={() => console.log("Restart")}
        className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-orange-600 hover:shadow-md active:bg-orange-700"
      >
        <RotateCcw className="h-5 w-5" strokeWidth={2} />
        もう一度レシピを作る
      </button>
    </div>
  );
};

export default Step_4_RecipeResult;
