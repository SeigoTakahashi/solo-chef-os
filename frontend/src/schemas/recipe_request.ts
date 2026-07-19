import { z } from "zod";

export const RecipeRequestSchema = z.object({
  mode: z.enum(["ingredients", "random"]), // 'ingredients': あるもの, 'random': おまかせ
  ingredients: z.array(z.string()), // 例: ["豚肉", "キャベツ"] （おまかせの場合は空配列）
  tags: z.array(z.string()), // 例: ["包丁いらず", "レンジだけ", "10分以内"]
});

export type RecipeRequest = z.infer<typeof RecipeRequestSchema>;
