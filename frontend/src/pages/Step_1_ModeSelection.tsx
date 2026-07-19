import { Refrigerator, Dices, ArrowRight } from "lucide-react";
import type { RecipeRequest } from "../schemas/recipe_request";

type Step_1_ModeSelectionProps = {
  setPage: (page: number) => void;
  requestRecipe: RecipeRequest;
  setRequestRecipe: (requestRecipe: RecipeRequest) => void;
};

const selectedCardStyle = "border-orange-500 ring-4 ring-orange-100";
const unselectedCardStyle =
  "border-slate-200 hover:border-orange-500 hover:ring-4 hover:ring-orange-100";

export default function Step_1_ModeSelection({
  setPage,
  requestRecipe,
  setRequestRecipe,
}: Step_1_ModeSelectionProps) {
  const handleModeSelection = (mode: "ingredients" | "random") => {
    setRequestRecipe({
      mode,
      ingredients: [],
      tags: [],
    });
  };

  const handleNextClick = () => {
    setPage(2);
  };

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col px-6 py-10">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
          1
        </span>
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 rounded-full bg-orange-500" />
        </div>
        <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-xs font-bold text-slate-400">
          2
        </span>
        <span className="ml-1 whitespace-nowrap text-sm font-semibold text-slate-500">
          Step 1/2
        </span>
      </div>

      {/* Question */}
      <h2 className="mt-10 text-xl font-bold tracking-tight text-slate-800 text-balance sm:text-2xl">
        Q. どちらのモードでレシピを作りますか？
      </h2>

      {/* Choice cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {/* A: あるもの生成 */}
        <div
          className={`flex flex-col cursor-pointer rounded-2xl border-2 bg-white p-5 shadow-sm transition-all ${requestRecipe.mode === "ingredients" ? selectedCardStyle : unselectedCardStyle}`}
          onClick={() => handleModeSelection("ingredients")}
        >
          <div className="flex items-start gap-4">
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${requestRecipe.mode === "ingredients" ? "bg-orange-50" : "bg-slate-50"}`}
            >
              <Refrigerator
                className={`h-7 w-7 ${requestRecipe.mode === "ingredients" ? "text-orange-500" : "text-slate-400"}`}
                strokeWidth={2.2}
              />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                A. あるもの生成
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                冷蔵庫にある食材をカンタン入力
              </p>
            </div>
          </div>
        </div>

        {/* B: おまかせ生成 */}
        <div
          className={`flex flex-col cursor-pointer rounded-2xl border-2 bg-white p-5 shadow-sm transition-all ${requestRecipe.mode === "random" ? selectedCardStyle : unselectedCardStyle}`}
          onClick={() => handleModeSelection("random")}
        >
          <div className="flex items-start gap-4">
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${requestRecipe.mode === "random" ? "bg-orange-50" : "bg-slate-50"}`}
            >
              <Dices
                className={`h-7 w-7 ${requestRecipe.mode === "random" ? "text-orange-500" : "text-slate-400"}`}
                strokeWidth={2.2}
              />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                B. おまかせ生成
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                食材を決めず、AIに完全ランダムでお任せ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next button */}
      <div className="mt-auto flex justify-end pt-10">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-2xl border-b-4 border-orange-600 bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-sm transition-all hover:bg-orange-500/95 active:translate-y-1 active:border-b-2"
          onClick={() => handleNextClick()}
        >
          次へ
          <ArrowRight className="h-5 w-5" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
