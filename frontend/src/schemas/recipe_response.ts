import { z } from "zod";

export const RecipeResponseSchema = z.object({
  title: z.string().min(1),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1),
        amount: z.string().min(1),
      }),
    )
    .min(1),
  steps: z.array(z.string()),
});

export type RecipeResponse = z.infer<typeof RecipeResponseSchema>;
