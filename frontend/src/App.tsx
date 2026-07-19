import { useState, useEffect } from "react";
import "./App.css";
import Step_0_Start from "./pages/Step_0_Start";
import Step_1_ModeSelection from "./pages/Step_1_ModeSelection";
import Step_2_ConditionSelection from "./pages/Step_2_ConditionSelection";
import Step_3_GeneratingLoading from "./pages/Step_3_GeneratingLoading";
import Step_4_RecipeResult from "./pages/Step_4_RecipeResult";
import Header from "./components/Header";
import type { RecipeRequest } from "./schemas/recipe_request";
import type { RecipeResponse } from "./schemas/recipe_response";

function App() {
  // APIエラーの状態
  const [apiError, setApiError] = useState<string | null>(null);

  // プロセス状態の定義（localStorageに値があったら、その値を使用）
  // ページの状態
  const [page, setPage] = useState<number>(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 0;
  });

  // リクエストレシピの状態
  const [requestRecipe, setRequestRecipe] = useState<RecipeRequest>(() => {
    const savedRequestRecipe = localStorage.getItem("requestRecipe");
    return savedRequestRecipe
      ? JSON.parse(savedRequestRecipe)
      : { mode: "ingredients", ingredients: [], tags: [] };
  });

  // レシピデータの状態
  const [recipeData, setRecipeData] = useState<RecipeResponse>(() => {
    const savedRecipeData = localStorage.getItem("recipeData");
    return savedRecipeData
      ? JSON.parse(savedRecipeData)
      : { title: "", ingredients: [], steps: [] };
  });

  // ページ、リクエストレシピ、レシピデータの状態が変わるたびにlocalStorageに保存
  useEffect(() => {
    localStorage.setItem("currentPage", page.toString());
  }, [page]);

  useEffect(() => {
    localStorage.setItem("requestRecipe", JSON.stringify(requestRecipe));
  }, [requestRecipe]);

  useEffect(() => {
    localStorage.setItem("recipeData", JSON.stringify(recipeData));
  }, [recipeData]);

  return (
    <>
      <Header setPage={setPage} />
      {page === 0 && <Step_0_Start setPage={setPage} />}
      {page === 1 && (
        <Step_1_ModeSelection
          setPage={setPage}
          requestRecipe={requestRecipe}
          setRequestRecipe={setRequestRecipe}
        />
      )}
      {page === 2 && (
        <Step_2_ConditionSelection
          setPage={setPage}
          requestRecipe={requestRecipe}
          setRequestRecipe={setRequestRecipe}
        />
      )}
      {page === 3 && (
        <Step_3_GeneratingLoading
          requestRecipe={requestRecipe}
          setRecipeData={setRecipeData}
          setPage={setPage}
          setApiError={setApiError}
        />
      )}
      {page === 4 && (
        <Step_4_RecipeResult recipeData={recipeData} apiError={apiError} />
      )}
    </>
  );
}

export default App;
