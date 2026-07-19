import { useQuery } from "@tanstack/react-query";
import type { RecipeRequest } from "../schemas/recipe_request";
import { fetchRecipeData } from "../utils/fetchRecipeData";

export function useRecipeData(requestRecipe: RecipeRequest) {
  return useQuery({
    queryKey: ["recipeData", requestRecipe],
    queryFn: () => fetchRecipeData(requestRecipe),
    retry: false,
  });
}
