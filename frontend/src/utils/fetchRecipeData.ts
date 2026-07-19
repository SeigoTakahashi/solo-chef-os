import type { RecipeRequest } from "../schemas/recipe_request";
import type { RecipeResponse } from "../schemas/recipe_response";
import { RecipeResponseSchema } from "../schemas/recipe_response";

export async function fetchRecipeData(
  requestRecipe: RecipeRequest,
): Promise<RecipeResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_ECHO_API_SERVER_URL}/recipe`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestRecipe),
    },
  );

  if (!response.ok) {
    throw new Error(`Error fetching recipe data: ${response.status}`);
  }

  const data = await response.json();
  return RecipeResponseSchema.parse(data);
}
