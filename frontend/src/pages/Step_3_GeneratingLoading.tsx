import { useEffect } from "react";
import { Bot } from "lucide-react";
import type { RecipeRequest } from "../schemas/recipe_request";
import type { RecipeResponse } from "../schemas/recipe_response";
import { useRecipeData } from "../hooks/useRecipeData";

type Step_3_GeneratingLoadingProps = {
  requestRecipe: RecipeRequest;
  setRecipeData: (data: RecipeResponse) => void;
  setPage: (page: number) => void;
  setApiError: (error: string | null) => void;
};

export default function Step_3_GeneratingLoading({
  requestRecipe,
  setRecipeData,
  setPage,
  setApiError,
}: Step_3_GeneratingLoadingProps) {
  const { data, error } = useRecipeData(requestRecipe);

  useEffect(() => {
    if (data) {
      console.log("Fetched recipe data:", data);
      setRecipeData(data);
      localStorage.setItem("recipeData", JSON.stringify(data));
      setPage(4);
      return;
    }
    if (error) {
      console.error("Error fetching recipe data:", error);
      setApiError("レシピの取得に失敗しました。");
      setPage(4);
      return;
    }
  }, [data, error, setPage, setRecipeData, setApiError]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-white px-4 text-center">
      {/* Pulsing AI icon */}
      <div className="relative flex items-center justify-center">
        <span className="absolute inline-flex h-24 w-24 animate-ping rounded-3xl bg-orange-100 opacity-75" />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-orange-100 bg-orange-50 text-orange-500">
          <Bot className="h-10 w-10 animate-pulse" strokeWidth={2.2} />
        </span>
      </div>

      {/* Status text */}
      <h1 className="mt-10 text-xl font-bold tracking-tight text-slate-800 text-balance sm:text-2xl">
        SoloChef OS が
        <br className="sm:hidden" />
        レシピを考えています...
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500 text-pretty sm:text-base">
        あなたの条件にぴったりの一皿を組み立てています。
        <br />
        少しだけお待ちください。
      </p>
    </div>
  );
}
