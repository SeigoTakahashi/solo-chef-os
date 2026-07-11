import React, { useState } from "react";
import { Search, X, Plus, Sparkles, ArrowLeft, Wrench } from "lucide-react";

const Step_2_ConditionSelection: React.FC = () => {
  const selectedTags = ["包丁いらず", "時短10分"];
  const unselectedTags = ["ワンパン", "レンジだけ", "健康志向", "ガッツリ"];

  // 食材入力（Enter/カンマで区切ってタグ化）
  const [ingredients, setIngredients] = useState<string[]>([
    "豚肉",
    "キャベツ",
  ]);
  const [ingredientInput, setIngredientInput] = useState("");

  const addIngredient = () => {
    const value = ingredientInput.trim();
    if (value && !ingredients.includes(value)) {
      setIngredients([...ingredients, value]);
    }
    setIngredientInput("");
  };

  const handleIngredientKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addIngredient();
    } else if (
      e.key === "Backspace" &&
      ingredientInput === "" &&
      ingredients.length > 0
    ) {
      setIngredients(ingredients.slice(0, -1));
    }
  };

  const removeIngredient = (target: string) => {
    setIngredients(ingredients.filter((item) => item !== target));
  };

  return (
    <div className="w-full max-w-2xl flex flex-col space-y-6 sm:space-y-8">
      {/* Progress Bar */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-10 bg-orange-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
        </div>
        <span className="ml-2 text-sm font-medium text-slate-500">
          Step 2/2
        </span>
      </div>

      {/* Ingredient Input Area (Mode: あるもの生成) */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
          <Wrench className="h-4 w-4" strokeWidth={2} />
          <span>選択されたモード：あるもの生成</span>
        </div>

        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            strokeWidth={2}
          />
          <input
            type="text"
            inputMode="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={handleIngredientKeyDown}
            onBlur={addIngredient}
            placeholder="食材を入力してEnter（例: 豚肉）"
            className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-base sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
          />
        </div>

        {/* Ingredients */}
        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {ingredients.map((item) => (
              <span
                key={item}
                className="flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200/60 pl-3.5 pr-1.5 py-1.5 text-sm font-medium text-slate-700"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeIngredient(item)}
                  aria-label={`${item}を削除`}
                  className="flex items-center justify-center h-5 w-5 rounded-full text-slate-400 hover:text-orange-500 hover:bg-orange-50 active:bg-orange-100 transition-colors"
                >
                  <X className="h-3 w-3" strokeWidth={2.5} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Question */}
      <h2 className="text-lg font-semibold text-slate-800">
        Q. 調理の条件を選んでください（複数可）
      </h2>

      {/* Tag Badges */}
      <div className="flex flex-wrap gap-3">
        {selectedTags.map((tag) => (
          <button
            type="button"
            key={tag}
            className="rounded-full border border-orange-500 bg-orange-50 px-5 py-2.5 text-sm font-semibold text-orange-600"
          >
            {tag}
          </button>
        ))}
        {unselectedTags.map((tag) => (
          <button
            type="button"
            key={tag}
            className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-600"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Free Input Tag */}
      <div className="relative">
        <Plus
          className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
          strokeWidth={2}
        />
        <input
          type="text"
          placeholder="自由入力タグを追加"
          className="w-full rounded-full border border-dashed border-slate-300 bg-white py-3.5 pl-11 pr-4 text-base sm:text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={() => console.log("Back")}
          className="flex items-center justify-center sm:justify-start gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-slate-700 active:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          戻る
        </button>

        <button
          type="button"
          onClick={() => console.log("Generate")}
          className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-orange-600 hover:shadow-md active:bg-orange-700"
        >
          <Sparkles className="h-5 w-5" strokeWidth={2} />
          レシピを生成！
        </button>
      </div>
    </div>
  );
};

export default Step_2_ConditionSelection;
