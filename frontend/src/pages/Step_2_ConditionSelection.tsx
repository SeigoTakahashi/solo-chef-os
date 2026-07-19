import { useState } from "react";
import { ArrowLeft, Sparkles, Plus, Refrigerator } from "lucide-react";
import { RecipeRequestSchema } from "../schemas/recipe_request";
import type { RecipeRequest } from "../schemas/recipe_request";
import ErrorMessage from "../components/ErrorMessage";

const DEFAULT_TAG_LIST = [
  "包丁いらず",
  "ワンパン",
  "レンジだけ",
  "時短10分",
  "健康志向",
  "ガッツリ",
];

type Step_2_ConditionSelectionProps = {
  setPage: (page: number) => void;
  requestRecipe: RecipeRequest;
  setRequestRecipe: (requestRecipe: RecipeRequest) => void;
};

export default function Step_2_ConditionSelection({
  setPage,
  requestRecipe,
  setRequestRecipe,
}: Step_2_ConditionSelectionProps) {
  const isIngredientsEmpty = requestRecipe.ingredients.length === 0;
  const isSubmitDisabled =
    requestRecipe.mode === "ingredients" && isIngredientsEmpty;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [ingredientsText, setIngredientsText] = useState<string>(() =>
    requestRecipe.ingredients.length > 0
      ? requestRecipe.ingredients.join("、")
      : "",
  );

  const handleChangeIngredients = (text: string) => {
    setIngredientsText(text);

    // 入力された文字列を、カンマ・読点・スペースで分解して配列にする
    const parsedArray = text
      .split(/[,，、\s]+/)
      .map((item) => item.trim())
      .filter((item) => item !== "");

    setRequestRecipe({
      ...requestRecipe,
      ingredients: parsedArray,
    });
  };

  const [customTagInputValue, setCustomTagInputValue] = useState<string>("");

  const handleToggleTag = (tagLabel: string) => {
    // 現在の tags から新しい配列を作る
    const isExist = requestRecipe.tags.includes(tagLabel);
    const nextTags = isExist
      ? requestRecipe.tags.filter((t) => t !== tagLabel)
      : [...requestRecipe.tags, tagLabel];

    // 完成した新しいオブジェクトを直接渡す
    setRequestRecipe({
      ...requestRecipe,
      tags: nextTags,
    });
  };

  const handleAddCustomTag = () => {
    const trimmed = customTagInputValue.trim();
    if (!trimmed) return;

    if (!requestRecipe.tags.includes(trimmed)) {
      // 完成したオブジェクトを直接渡す
      setRequestRecipe({
        ...requestRecipe,
        tags: [...requestRecipe.tags, trimmed],
      });
    }
    setCustomTagInputValue("");
  };

  const handleGenerateRecipe = () => {
    const trimmed = customTagInputValue.trim();

    // 現在の最新のタグ配列をローカル変数として作る
    const finalTags = [...requestRecipe.tags];

    // 入力欄に残っている文字があり、かつ重複していなければ配列に追加
    if (trimmed !== "" && !finalTags.includes(trimmed)) {
      finalTags.push(trimmed);
    }

    // 最新のタグを含んだ完成形レシピリクエストオブジェクトを作る
    const finalRecipeRequest = {
      ...requestRecipe,
      tags: finalTags,
    };

    // Zodのスキーマを使ってバリデーションを行う
    const result = RecipeRequestSchema.safeParse(finalRecipeRequest);
    if (!result.success) {
      console.error("Validation failed:", result.error);
      setErrorMessage("入力内容に不備があります。もう一度確認してください。");
      return;
    }

    // Stateの更新と入力欄のクリア
    setRequestRecipe(finalRecipeRequest);
    setCustomTagInputValue("");
    setErrorMessage(null);
    console.log("Generating recipe with:", finalRecipeRequest);
    setPage(3);
  };

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-2xl flex-col px-6 py-10">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
          2
        </span>
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-full rounded-full bg-orange-500" />
        </div>
        <span className="ml-1 whitespace-nowrap text-sm font-semibold text-slate-500">
          Step 2/2
        </span>
      </div>

      {/* あるもの生成モードの場合、食材を入力 */}
      {requestRecipe.mode === "ingredients" && (
        <div className="mt-10 rounded-2xl border-2 border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <Refrigerator className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <h3 className="text-base font-bold tracking-tight text-slate-800 sm:text-lg">
              冷蔵庫にある食材を入力
            </h3>
          </div>
          <p className="mt-2 text-sm font-medium text-slate-500">
            カンマ区切りで入力すると、あるものだけでレシピを提案します。
          </p>
          <div className="mt-4 flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 transition-all focus-within:border-orange-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-100">
            <Plus
              className="h-5 w-5 shrink-0 text-slate-400"
              strokeWidth={2.4}
            />
            <input
              type="text"
              value={ingredientsText}
              onChange={(e) => handleChangeIngredients(e.target.value)}
              placeholder="例：卵、キャベツ、豚バラ肉"
              className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Question */}
      <h2 className="mt-8 text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
        Q. 調理の条件を選んでください（複数可）
      </h2>

      {/* Tag badges */}
      <div className="mt-8 flex flex-wrap gap-3">
        {/* デフォルトタグ */}
        {DEFAULT_TAG_LIST.map((label) => {
          const isSelected = requestRecipe.tags.includes(label);
          return (
            <button
              key={label}
              type="button"
              className={
                isSelected
                  ? "rounded-full border-2 border-orange-500 bg-orange-50 px-5 py-2.5 text-sm font-bold text-orange-600 transition-all active:translate-y-0.5"
                  : "rounded-full border-2 border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition-all hover:border-orange-300 active:translate-y-0.5"
              }
              onClick={() => {
                handleToggleTag(label);
              }}
            >
              {label}
            </button>
          );
        })}

        {/* 選択済みの自由入力タグ */}
        {requestRecipe.tags
          .filter((label) => !DEFAULT_TAG_LIST.includes(label))
          .map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-full border-2 border-orange-500 bg-orange-50 px-5 py-2.5 text-sm font-bold text-orange-600"
              onClick={() => handleToggleTag(label)}
            >
              {label}
            </button>
          ))}
      </div>

      {/* Free input tag */}
      <div className="mt-6">
        <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 transition-all focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100">
          <Plus className="h-5 w-5 shrink-0 text-slate-400" strokeWidth={2.4} />
          <input
            type="text"
            value={customTagInputValue}
            placeholder="自由に入力（例: キャンプ飯）"
            onChange={(e) => setCustomTagInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddCustomTag();
              }
            }}
            className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="mt-5">
          <ErrorMessage title="エラーが発生しました" message={errorMessage} />
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-auto flex items-center justify-between pt-10">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-2xl px-5 py-4 text-base font-bold text-slate-500 transition-all hover:text-slate-800 active:translate-y-0.5"
          onClick={() => setPage(1)}
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.4} />
          戻る
        </button>
        <button
          type="button"
          className={`inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-lg font-bold shadow-sm transition-all
            ${
              isSubmitDisabled
                ? "bg-slate-200 border-b-4 border-slate-300 text-slate-400 cursor-not-allowed pointer-events-none"
                : "bg-orange-500 border-b-4 border-orange-600 text-white hover:bg-orange-500/95 active:translate-y-1 active:border-b-2"
            }
          `}
          onClick={handleGenerateRecipe}
          disabled={isSubmitDisabled}
        >
          <Sparkles className="h-5 w-5" strokeWidth={2.4} />
          レシピを生成！
        </button>
      </div>
    </div>
  );
}
