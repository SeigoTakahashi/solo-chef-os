import { Sparkles, ReceiptText, ChefHat, RotateCcw } from "lucide-react";
import type { RecipeResponse } from "../schemas/recipe_response";
import ErrorMessage from "../components/ErrorMessage";

type Step_4_RecipeResultProps = {
  recipeData: RecipeResponse;
  apiError: string | null;
  setPage: (page: number) => void;
};

export default function Step_4_RecipeResult({
  recipeData,
  apiError,
  setPage,
}: Step_4_RecipeResultProps) {
  const handleResetAll = () => {
    localStorage.clear();
    setPage(1);
  };

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-10">
      {/* Recipe card */}
      {apiError ? (
        <div className="mt-5">
          <ErrorMessage message={apiError} />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center gap-2 text-orange-500">
            <Sparkles className="h-5 w-5" strokeWidth={2.4} />
            <span className="text-sm font-bold tracking-tight sm:text-base">
              本日の一皿
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            {recipeData.title}
          </h1>

          <div className="mt-6 rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            {/* Ingredients */}
            <section>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <ReceiptText className="h-5 w-5" strokeWidth={2.4} />
                </span>
                <h2 className="text-lg font-bold tracking-tight text-slate-800">
                  材料（1人前）
                </h2>
              </div>
              <ul className="mt-4 flex flex-col gap-1">
                {recipeData.ingredients.map((item) => (
                  <li key={item.name} className="flex items-baseline gap-2">
                    <span className="shrink-0 text-sm font-medium text-slate-700 sm:text-base">
                      {item.name}
                    </span>
                    <span className="min-w-0 flex-1 translate-y-[-0.2rem] border-b-2 border-dashed border-slate-200" />
                    <span className="shrink-0 text-sm font-bold text-slate-800 sm:text-base">
                      {item.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Steps */}
            <section className="mt-7 border-t-2 border-slate-100 pt-6">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <ChefHat className="h-5 w-5" strokeWidth={2.4} />
                </span>
                <h2 className="text-lg font-bold tracking-tight text-slate-800">
                  作り方
                </h2>
              </div>
              <ol className="mt-4 flex flex-col gap-4">
                {recipeData.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="pt-0.5 text-sm leading-relaxed text-slate-700 text-pretty sm:text-base">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </>
      )}

      {/* Restart button */}
      <button
        type="button"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-b-4 border-orange-600 bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-sm transition-all hover:bg-orange-500/95 active:translate-y-1 active:border-b-2 sm:text-lg"
        onClick={handleResetAll}
      >
        <RotateCcw className="h-5 w-5" strokeWidth={2.4} />
        もう一度レシピを作る
      </button>
    </div>
  );
}
